import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as ExcelJs from "exceljs";
import { forkJoin, from, Observable, of, throwError } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { ICreditRatingData } from "src/app/models/creditRating/creditRatingResponse";
import {
  CAGR_ROW_KEY,
  IAfsFinancialMetricsRow,
  IFinancialDiagnosisReportData,
  IPropertyTaxTrendPoint,
} from "src/app/models/financial-diagnosis/afsFinancialMetrics";
import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { ProfileService } from "src/app/users/profile/service/profile.service";
import { calculateCagr } from "src/app/util/financialDiagnosisFormat.util";
import { environment } from "src/environments/environment";

/** Just the bits of `GET user/profile`'s `data.ulb` this report needs. */
interface IProfileUlb {
  _id: string;
  name: string;
  area?: number;
  population?: number;
  code?: string;
  state?: { name?: string; code?: string };
  // Not declared on the app-wide `Ulb` model, but the ULB profile form
  // (`ulb-profile.component.html`, formGroupName="ulbType") does render a ULB
  // Type field, so the profile response carries it - it's just untyped there.
  ulbType?: { name?: string } | string;
}

/**
 * Financial years covered by the AFS Analysis "Dataset 2" ledger-derived
 * metrics (see AFS_Analysis_Calculation_and_Filter_Documentation.pdf,
 * section 3.1: "Ledger data | Start year BETWEEN 2019 AND 2023").
 */
const REPORT_YEARS = ["2019-20", "2020-21", "2021-22", "2022-23"];

/**
 * TEMPORARY: `property-tax/:ulbId/collection-trend` (the new endpoint the
 * backend team added for "Property Tax as Per Form"/the collection-trend
 * chart) isn't deployed to the shared dev API yet, so this points directly
 * at a locally-run `cf-nest-api-v2` instead of `environment.api.urlV2`.
 * Switch this back to `environment.api.urlV2` once the endpoint ships to
 * dev/prod - and adjust the port here if your local server isn't on :3000
 * (its own default, per cf-nest-api-v2's .env `PORT=3000`).
 */
const PROPERTY_TAX_API_BASE_URL = "http://localhost:3000/api/v2/";

/** Matches the "(<code>)" suffix on a ledger dump column header, e.g. "Tax Revenue (110)" -> "110". */
const CODE_COLUMN_PATTERN = /\((\d+)\)\s*$/;

/** The named (non-coded) columns in the "Ledger Dump" sheet that this report needs. */
const NAMED_COLUMNS = [
  "ULB Code",
  "ULB Name",
  "State",
  "Financial Year",
  "Population (Census 2011)",
  "Total Own Revenue",
  "Total Revenue",
  "Total Expenditure",
] as const;

@Injectable({
  providedIn: "root",
})
export class FinancialDiagnosisReportService {
  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private assetsService: AssetsService
  ) {}

  /**
   * Fetches, parses and computes the AFS financial-diagnosis figures for the
   * logged-in ULB, ready for `FinancialDiagnosisReportComponent`.
   *
   * There is no per-ULB JSON endpoint for the financial figures today. What
   * exists is `ledger/getLedgerDump`, which - when called with `stateCode`
   * (and without `ulbId`, which it does not recognize) - returns an Excel
   * workbook ("Ledger Dump" sheet) covering every ULB and every reported
   * financial year for that state. So the approach here is: download that
   * state's dump as a blob, parse it with exceljs, keep only the rows for
   * this ULB and the tracked years, and compute the AFS Analysis formulas
   * (see the doc, section 5 "Key Formula Summary") ourselves.
   *
   * The ULB's own name/state code/area/population/type come from
   * `GET user/profile` instead (`isULBProfileCompleted()` in
   * `profile.service.ts` is the existing precedent for calling it with `{}`
   * to mean "my own profile") - the ledger dump doesn't carry Area or ULB
   * Type at all, and its own name/state/population fields are noisier to
   * key off of than the profile's.
   *
   * NOTE: there is still no "Property Tax OPM Collection" (the "Per Form"
   * figure) or bond metrics source wired in - those fields come back
   * undefined ("-" in the report) until a source for them is found.
   */
  getReportData(): Observable<IFinancialDiagnosisReportData> {
    return this.profileService.getUserProfile({}).pipe(
      switchMap((res: any) => {
        const ulb: IProfileUlb | undefined = res?.data?.ulb;
        if (!ulb?.name || !ulb?.state?.code) {
          return throwError(
            () => new Error("Could not read your ULB's name/state from your profile.")
          );
        }
        return this.fetchAndBuildReport(ulb);
      })
    );
  }

  private fetchAndBuildReport(ulb: IProfileUlb): Observable<IFinancialDiagnosisReportData> {
    const params = new HttpParams()
      .set("financialData", true)
      .set("isStandardizable", true)
      .set("stateCode", ulb.state.code)
      .set("module", "bulkDownload");

    return forkJoin({
      blob: this.http.get(`${environment.api.url}ledger/getLedgerDump`, {
        params,
        responseType: "blob",
      }),
      creditRatings: this.assetsService
        .fetchCreditRatingReport()
        .pipe(catchError(() => of([] as ICreditRatingData[]))),
      propertyTaxTrend: this.fetchPropertyTaxTrend(ulb._id),
    }).pipe(
      switchMap(({ blob, creditRatings, propertyTaxTrend }) =>
        from(this.parseLedgerDump(blob, ulb.name)).pipe(
          map((rows) => this.buildReportData(rows, ulb, creditRatings, propertyTaxTrend))
        )
      )
    );
  }

  /** `GET property-tax/:ulbId/collection-trend` - see `PROPERTY_TAX_API_BASE_URL` above. */
  private fetchPropertyTaxTrend(ulbId: string): Observable<IPropertyTaxTrendPoint[]> {
    if (!ulbId) return of([]);
    return this.http
      .get<{ success: boolean; data: IPropertyTaxTrendPoint[] }>(
        `${PROPERTY_TAX_API_BASE_URL}property-tax/${ulbId}/collection-trend`
      )
      .pipe(
        map((res) => res?.data || []),
        catchError((error) => {
          console.error("Failed to fetch Property Tax collection trend", error);
          return of([] as IPropertyTaxTrendPoint[]);
        })
      );
  }

  /** Parses the "Ledger Dump" worksheet and returns only this ULB's rows, normalized. */
  private async parseLedgerDump(
    blob: Blob,
    ulbName: string
  ): Promise<IAfsFinancialMetricsRow[]> {
    const arrayBuffer = await blob.arrayBuffer();
    const workbook = new ExcelJs.Workbook();
    // `Xlsx.load()` exists at runtime in the browser-targeted build this project
    // aliases exceljs to (see the "exceljs" path override in tsconfig.json), but
    // the package's own (Node-oriented) .d.ts - which is what TS type-checks
    // against - only declares readFile/read/write. Hence the `any` cast.
    await (workbook.xlsx as any).load(arrayBuffer);
    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
      throw new Error("The ledger dump did not contain any worksheet.");
    }

    const headerRow = (worksheet.getRow(1).values as any[]) || [];
    const { codeIndex, namedIndex } = this.buildColumnIndex(headerRow);

    const targetName = this.normalizeUlbName(ulbName);
    const matchedRows: IAfsFinancialMetricsRow[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // header
      const values = row.values as any[];
      const rowUlbName = this.strAt(values, namedIndex.get("ULB Name"));
      if (this.normalizeUlbName(rowUlbName) !== targetName) return;

      const financialYear = this.strAt(values, namedIndex.get("Financial Year"));
      if (!REPORT_YEARS.includes(financialYear || "")) return;

      matchedRows.push(this.rowToMetrics(values, codeIndex, namedIndex));
    });

    return matchedRows;
  }

  private buildColumnIndex(
    headerRow: any[]
  ): { codeIndex: Map<string, number>; namedIndex: Map<string, number> } {
    const codeIndex = new Map<string, number>();
    const namedIndex = new Map<string, number>();

    headerRow.forEach((header, index) => {
      if (typeof header !== "string") return;
      const trimmed = header.trim();

      const codeMatch = trimmed.match(CODE_COLUMN_PATTERN);
      if (codeMatch) {
        codeIndex.set(codeMatch[1], index);
      }

      if ((NAMED_COLUMNS as readonly string[]).includes(trimmed)) {
        namedIndex.set(trimmed, index);
      }
    });

    return { codeIndex, namedIndex };
  }

  private rowToMetrics(
    values: any[],
    codeIndex: Map<string, number>,
    namedIndex: Map<string, number>
  ): IAfsFinancialMetricsRow {
    const code = (c: string) => this.numAt(values, codeIndex.get(c));
    const named = (n: (typeof NAMED_COLUMNS)[number]) => this.numAt(values, namedIndex.get(n));

    const taxRevenue = code("110");
    const rentalIncome = code("130");
    const feeUserCharges = code("140");
    const saleHireCharges = code("150");
    const otherNonTaxRevenue = code("180"); // "Other Non-Tax Revenue" - part of OSR, NOT the "Other Income" metric.
    const incomeFromInvestment = code("170");
    const interestEarned = code("171");
    const propertyTax = code("11001");

    // Initial Total Own Source Revenue = 110 + 130 + 140 + 150 + 180 (doc section 3.4/5).
    // Prefer the sheet's own pre-computed "Total Own Revenue" column when present;
    // fall back to summing the components ourselves otherwise.
    const ownSourceComponents = [taxRevenue, rentalIncome, feeUserCharges, saleHireCharges, otherNonTaxRevenue];
    const computedInitialOsr = this.sumIfAnyPresent(ownSourceComponents);
    const initialOsr = named("Total Own Revenue") ?? computedInitialOsr;

    // No Property Tax OPM Collection source is available from this dump, so the
    // "preferred" Property Tax always falls back to the AFS value (per the doc's
    // own NULL rule), which means the Adjusted OSR/Total Revenue equal the
    // Initial ones here - there's nothing to substitute.
    const totalOwnSourceRevenue = initialOsr;
    const initialTotalRevenue = named("Total Revenue");
    const totalRevenue = initialTotalRevenue;
    const totalExpenditure = named("Total Expenditure");

    const otherIncome = this.sumIfAnyPresent([incomeFromInvestment, interestEarned]);
    const nonTaxRevenue =
      initialOsr != null && taxRevenue != null ? initialOsr - taxRevenue : undefined;

    const taxRevenueAsPercentOfOsr = this.percent(taxRevenue, totalOwnSourceRevenue);
    const nonTaxRevenueAsPercentOfOsr = this.percent(nonTaxRevenue, initialOsr);
    const propertyTaxAsPercentOfOsr = this.percent(propertyTax, totalOwnSourceRevenue);

    return {
      ulb_code: this.strAt(values, namedIndex.get("ULB Code")) || "",
      ulb_name: this.strAt(values, namedIndex.get("ULB Name")) || "",
      state_name: this.strAt(values, namedIndex.get("State")) || "",
      financial_year: this.strAt(values, namedIndex.get("Financial Year")) || "",
      ulb_type: "", // Not present in the ledger dump.
      population: named("Population (Census 2011)"),

      initialTotalOwnSourceRevenue: initialOsr,
      totalOwnSourceRevenue,
      revenueGrants: code("160"),
      assignedRevenue: code("120"),
      otherIncome,
      initialTotalRevenue,
      totalRevenue,
      taxRevenue,
      nonTaxRevenue,
      propertyTax,
      // "Property Tax as Per Form" (OPM collection) - not in this dump.
      totalPropertyTaxCollection: undefined,

      taxRevenueAsPercentOfOsr,
      nonTaxRevenueAsPercentOfOsr,
      propertyTaxAsPercentOfOsr,

      securedLoans: code("330"),
      unsecuredLoans: code("331"),

      establishmentExpenditure: code("210"),
      administrativeExpenses: code("220"),
      operationAndMaintenance: code("230"),
      interestAndFinanceCharges: code("240"),
      programmeExpenses: code("250"),
      revenueGrantsContributionsAndSubsidies: code("260"),
      provisionsAndWriteOff: code("270"),
      miscellaneousExpenses: code("271"),
      depreciation: code("272"),
      priorPeriodItems: code("280"),
      transferToReserveFunds: code("290"),
      other: code("300"),
      totalExpenditure,
    };
  }

  private buildReportData(
    rows: IAfsFinancialMetricsRow[],
    ulb: IProfileUlb,
    creditRatings: ICreditRatingData[],
    propertyTaxTrend: IPropertyTaxTrendPoint[]
  ): IFinancialDiagnosisReportData {
    if (!rows.length) {
      throw new Error(`No financial data was found for "${ulb.name}" in the ledger dump.`);
    }

    const propertyTaxByYear = new Map(
      propertyTaxTrend.map((point) => [point.financialYear, point.valueInRupees])
    );

    const yearlyData: { [year: string]: IAfsFinancialMetricsRow } = {};
    for (const year of REPORT_YEARS) {
      const match = rows.find((row) => row.financial_year === year);
      if (!match) continue;
      // The ledger dump has no Property Tax Collection column at all (see the
      // service doc comment); backfill it from the trend endpoint's matching year.
      const collection = propertyTaxByYear.get(year);
      yearlyData[year] = collection != null ? { ...match, totalPropertyTaxCollection: collection } : match;
    }

    const anyRow = rows[0];
    const cagr = this.buildCagrRow(anyRow, yearlyData);
    const ulbTypeName =
      typeof ulb.ulbType === "string" ? ulb.ulbType : ulb.ulbType?.name;

    return {
      ulbCode: ulb.code || anyRow.ulb_code,
      ulbName: ulb.name,
      stateName: ulb.state?.name || anyRow.state_name,
      ulbType: ulbTypeName || "",
      population: ulb.population ?? anyRow.population,
      area: ulb.area,
      creditRating: this.lookupCreditRating(ulb.name, creditRatings),
      years: REPORT_YEARS,
      yearlyData,
      cagr,
      propertyTaxTrend,
    };
  }

  /**
   * The ledger dump has no ready-made CAGR row (that only exists in the
   * dbt-modelled Dataset 2, not this raw dump), so it's computed here using
   * the doc's own CAGR formula (section 3.9) between the first and last
   * tracked years, for every numeric metric the report displays.
   */
  private buildCagrRow(
    template: IAfsFinancialMetricsRow,
    yearlyData: { [year: string]: IAfsFinancialMetricsRow }
  ): IAfsFinancialMetricsRow {
    const baseRow = yearlyData[REPORT_YEARS[0]];
    const latestRow = yearlyData[REPORT_YEARS[REPORT_YEARS.length - 1]];

    const cagrFields: (keyof IAfsFinancialMetricsRow)[] = [
      "totalOwnSourceRevenue",
      "revenueGrants",
      "assignedRevenue",
      "otherIncome",
      "totalRevenue",
      "taxRevenueAsPercentOfOsr",
      "nonTaxRevenueAsPercentOfOsr",
      "propertyTax",
      "totalPropertyTaxCollection",
      "securedLoans",
      "unsecuredLoans",
      "establishmentExpenditure",
      "administrativeExpenses",
      "operationAndMaintenance",
      "interestAndFinanceCharges",
      "programmeExpenses",
      "revenueGrantsContributionsAndSubsidies",
      "provisionsAndWriteOff",
      "miscellaneousExpenses",
      "depreciation",
      "other",
      "totalExpenditure",
    ];

    const cagrRow: IAfsFinancialMetricsRow = {
      ulb_code: template.ulb_code,
      ulb_name: template.ulb_name,
      state_name: template.state_name,
      financial_year: CAGR_ROW_KEY,
      ulb_type: template.ulb_type,
    };

    for (const field of cagrFields) {
      const base = baseRow?.[field] as number | undefined;
      const latest = latestRow?.[field] as number | undefined;
      (cagrRow[field] as number | undefined) = calculateCagr(base, latest) ?? undefined;
    }

    return cagrRow;
  }

  private lookupCreditRating(ulbName: string, creditRatings: ICreditRatingData[]): string {
    if (!ulbName || !creditRatings?.length) return "NA";
    const normalized = this.normalizeUlbName(ulbName);
    const match = creditRatings.find((entry) => this.normalizeUlbName(entry.ulb) === normalized);
    return match?.creditrating?.trim() || "NA";
  }

  private normalizeUlbName(name: string | undefined): string {
    return (name || "").trim().toLowerCase().replace(/\s+/g, " ");
  }

  private sumIfAnyPresent(values: (number | undefined)[]): number | undefined {
    const present = values.filter((value) => value != null);
    if (!present.length) return undefined;
    return present.reduce((sum, value) => sum + (value as number), 0);
  }

  private percent(numerator: number | undefined, denominator: number | undefined): number | undefined {
    if (numerator == null || !denominator) return undefined;
    return +((numerator / denominator) * 100).toFixed(2);
  }

  private numAt(values: any[], index: number | undefined): number | undefined {
    if (index === undefined) return undefined;
    const raw = values[index];
    if (raw === undefined || raw === null || raw === "") return undefined;
    // A formula cell comes back as { formula, result } from exceljs.
    const resolved = typeof raw === "object" && raw !== null && "result" in raw ? raw.result : raw;
    const parsed = typeof resolved === "string" ? parseFloat(resolved) : resolved;
    return typeof parsed === "number" && !Number.isNaN(parsed) ? parsed : undefined;
  }

  private strAt(values: any[] | undefined, index: number | undefined): string | undefined {
    if (!values || index === undefined) return undefined;
    const raw = values[index];
    return raw === undefined || raw === null ? undefined : String(raw).trim();
  }
}
