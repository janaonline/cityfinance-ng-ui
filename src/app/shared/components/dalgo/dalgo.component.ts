import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { embedDashboard } from '@superset-ui/embedded-sdk';
import { CommonServicesService } from 'src/app/fc-grant-2324-onwards/fc-shared/service/common-services.service';
import { USER_TYPE } from 'src/app/models/user/userType';
import { SupersetService } from './superset.service';

@Component({
  selector: 'app-dalgo',
  templateUrl: './dalgo.component.html',
  styleUrls: ['./dalgo.component.scss'],
  standalone: true
})

export class DalgoComponent implements OnInit, AfterViewInit {

  private readonly htmlElementId = 'mohua-superset-container';  // Element ID as a constant
  private readonly supersetDomainUrl = 'https://janaagraha.dalgo.org/';

  @Input() dashboardType = USER_TYPE.MoHUA;
  @Input() dashboardId = '6476518a-7dfd-4614-87c2-8a315c9ece25';

  @Input() isToExpandFilters = true

  // Dynamically pass the state name from the logged in user profile
  @Input() filters: { id: string; column: string; value: string; }[] = [
    // { id: 'NATIVE_FILTER-210Q_hGGax', column: 'state', value: 'Andhra Pradesh' },
    // { id: 'NATIVE_FILTER-MgsHyuye2m', column: 'year', value: '2022-23' }
  ];

  stateFilterId: string;
  yearFilterId: string;

  constructor(private supersetService: SupersetService,
    private commonServices: CommonServicesService,) { }

  ngOnInit(): void {
    if (this.dashboardType == USER_TYPE.STATE) {
      this.yearFilterId = 'NATIVE_FILTER-lNqf-pfM93';
      this.stateFilterId = 'NATIVE_FILTER-oiRM7rNPPU';
      this.dashboardId = '463904ae-53e5-4e86-8f41-314ad84fe11b';
      this.getStateName();
    } else if (this.dashboardType == USER_TYPE.MoHUA) {
      // this.yearFilterId = 'NATIVE_FILTER-MgsHyuye2m';
      // this.dashboardId = '6476518a-7dfd-4614-87c2-8a315c9ece25';
      this.yearFilterId = 'NATIVE_FILTER-D9A7GYA-VYN-Rb_tj66U9';
      this.dashboardId = '926b740c-6d68-4f1d-8380-c4aa83e7def1';
    }

    this.getSelectedYear();
    this.initializeEmbeddedDashboard();
  }

  ngAfterViewInit(): void {
    this.adjustIframeDimensions();
  }

  getSelectedYear() {
    const selectedYearId = sessionStorage.getItem("selectedYearId");
    const selectedYear = this.commonServices.getYearName(selectedYearId);
    this.filters.push({ id: this.yearFilterId, column: 'Year', value: selectedYear });
  }

  getStateName() {
    let stateName = localStorage.getItem("state_name");
    if (!stateName || stateName === 'undefined') {
      stateName = sessionStorage.getItem("stateName");
    }
    this.filters.push({ id: this.stateFilterId, column: 'state', value: stateName });
  }

  /**
   * Initializes and embeds the Superset dashboard into the DOM.
   * Fetches a guest token, configures the dashboard settings, and embeds it using the Superset Embedded SDK.
   */
  private initializeEmbeddedDashboard(): void {

    /**
 * Fetches a guest token from the Superset service for the specified dashboards.
 *
 * This function constructs a request body that includes a `resources` array
 * with dashboard identifiers and sends it to the Superset API to retrieve a
 * guest token. The `resources` key is critical for the API to process the request.
 *
 * Example Request Body Sent:
 * ```json
 * {
 *   "resources": [
 *     { "type": "dashboard", "id": "461b" },
 *     { "type": "dashboard", "id": "f11b" }
 *   ]
 * }
 * ```
 *
 * **Usage:**
 * The function is designed to retrieve a guest token for embedding Superset dashboards.
 * Ensure that `dashboardId` and other required IDs are correctly set.
 *
 * @returns A promise resolving to the guest token received from the API.
 */
    const fetchGuestToken = () => {
      // Prepare the request body with the required 'resources' array
      const requestBody = {
        resources: [
          { type: "dashboard", id: this.dashboardId },
        ],
      };
      // Send the request to the Superset service to fetch the guest token
      return this.supersetService.getGuestToken(requestBody).toPromise();
    };




    // If doesnt need any filter uncomment below to empty the filter array. 
    //filters = [];

    // Generate the native filters string by calling the function and applying it to the filters array
    const nativeFilters = `(${this.generateNativeFilters(this.filters)})`

    // Call embedDashboard to embed the Superset dashboard with specified configurations
    embedDashboard({
      id: this.dashboardId,       // UUID of the dashboard to embed
      supersetDomain: this.supersetDomainUrl,  // Superset domain URL
      mountPoint: document.getElementById(this.htmlElementId) as HTMLElement, // DOM element to mount dashboard
      fetchGuestToken: fetchGuestToken,        // Method to retrieve guest token

      dashboardUiConfig: {
        hideTitle: true,     // Hide the dashboard title
        filters: {
          expanded: this.isToExpandFilters     // Expand filters by default
        },
        urlParams: { native_filters: nativeFilters } // Dynamic filters passed to Superset dashboard
      },
      iframeSandboxExtras: ['allow-top-navigation', 'allow-popups-to-escape-sandbox'] // Extra sandbox options for iframe
      
    });

  }

  /**
   * Adjusts the iframe dimensions to ensure it fills the entire container.
   * This is done after the view has been initialized, and the iframe is the first child element of the container.
   */
  private adjustIframeDimensions(): void {
    const iframe = document.getElementById(this.htmlElementId)?.children[0] as HTMLIFrameElement;
    if (iframe) {
      iframe.width = "100%";
      iframe.height = "100%";
    }
  }

  /**
  * Generates native filters dynamically for Superset's URL parameters.
  * 
  * This function takes an array of filter objects and returns a single-line string
  * formatted as Superset's `native_filters` parameter, which can be directly used
  * in the URL for embedding dashboards.
  * 
  * **Warning**: The returned value **must** be a single-line string. **Do not format or edit it** 
  * into multiple lines, as this will cause errors in Superset and break the functionality.
  * 
  * Each filter object should contain an `id`, `column`, and `value`. The function
  * generates the required format for each filter, which is used in Superset's dashboard
  * embedding.
  * 
  * Example filter structure:
  * 
  *   NATIVE_FILTER_ID: (
  *     __cache: (
  *       label: 'FILTER_VALUE',
  *       validateStatus: !f,
  *       value: !('FILTER_VALUE')
  *     ),
  *     extraFormData: (
  *       filters: !((col: COLUMN_NAME, op: IN, val: !('FILTER_VALUE')))
  *     ),
  *     filterState: (
  *       label: 'FILTER_VALUE',
  *       validateStatus: !f,
  *       value: !('FILTER_VALUE')
  *     ),
  *     id: NATIVE_FILTER_ID,
  *     ownState: ()
  *   )
  * 
  * Example Usage:
  * ```typescript
  * const filters = [
  *   { id: 'NATIVE_FILTER-210Q_hGGax', column: 'state', value: 'Andhra Pradesh' },
  *   { id: 'NATIVE_FILTER-MgsHyuye2m', column: 'year', value: '2022-23' }
  * ];
  * 
  * const nativeFilters = generateNativeFilters(filters);
  * 
  * // Use nativeFilters in the URL parameters:
  * urlParams: { native_filters: nativeFilters };
  * ```
  * 
  * @param filters - An array of filter objects. Each object should have:
  *   - `id`: The unique filter identifier.
  *   - `column`: The column name to filter by.
  *   - `value`: The value to filter by.
  * 
  * @returns A single-line string representing the native filter query to be used in the URL.
  */
  generateNativeFilters(filters: { id: string; column: string; value: string }[]): string {
    return filters.map(({ id, column, value }) => `${id}:(__cache:(label:'${value}',validateStatus:!f,value:!('${value}')),extraFormData:(filters:!((col:${column},op:IN,val:!('${value}')))),filterState:(label:'${value}',validateStatus:!f,value:!('${value}')),id:${id},ownState:())`).join(',');
  }



}