import { AbstractControl, ValidatorFn } from "@angular/forms";

export function awardPeriodValidator(minYear: string): ValidatorFn {
  return (control: AbstractControl) => {
    const parent = control.parent;
    const maxControl = parent?.get("max")?.value || "2026";
    const minControl = +minYear || "2015";
    const value = control.value;

    if (!value) return null;

    // Check format YYYY-YY
    const match = /^(\d{4})-(\d{2})$/.exec(value);
    if (!match) return { awardPeriodInvalid: "Format must be YYYY-YY" };

    // Check if year range is 5 years.
    const startYear = parseInt(match[1], 10);
    const endYear = parseInt(`20${match[2]}`, 10);

    // Start year cannot be greater than constitution date.
    if (startYear < +minControl)
      return {
        awardPeriodInvalid: `Start period of award period must be after ${minControl}.`,
      };

    // Start year cannot be greater than XVFC period.
    if (startYear > maxControl)
      return {
        awardPeriodInvalid: `Start period of award period must be before ${maxControl}.`,
      };

    const diffBwtYears = endYear - startYear;
    console.log("diff - -", diffBwtYears);
    if (diffBwtYears > 5 || diffBwtYears < 1)
      // Range must be 5 years.
      return {
        awardPeriodInvalid:
          "Difference between start year and end year must be less than or equal to 5 years and greater than 1 year.",
      };

    return null;
  };
}
