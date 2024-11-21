import { Component, OnInit, AfterViewInit } from '@angular/core';
import { embedDashboard } from '@superset-ui/embedded-sdk';
import { SupersetService } from './superset.service';

@Component({
  selector: 'app-dalgo',                 // Component selector to use in templates
  templateUrl: './dalgo.component.html',  // HTML template file for the component
  styleUrls: ['./dalgo.component.scss']   // Stylesheet for the component
})

export class DalgoComponent implements OnInit, AfterViewInit {

  private readonly htmlElementId = 'mohua-superset-container';  // Element ID as a constant
  private readonly supersetDomainUrl = 'https://janaagraha.dalgo.in/';

  private readonly supersetEmbedDashboardId = '6476518a-7dfd-4614-87c2-8a315c9ece25'; // MoHUA dashboard UUID
  //private readonly supersetEmbedDashboardId = '463904ae-53e5-4e86-8f41-314ad84fe11b'; // State dashboard UUID

  constructor(private supersetService: SupersetService) { }

  ngOnInit(): void {
    this.initializeEmbeddedDashboard();
  }

  ngAfterViewInit(): void {
    this.adjustIframeDimensions();
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
 * Ensure that `supersetEmbedDashboardId` and other required IDs are correctly set.
 *
 * @returns A promise resolving to the guest token received from the API.
 */
    const fetchGuestToken = () => {
      // Prepare the request body with the required 'resources' array
      const requestBody = {
        resources: [
          { type: "dashboard", id: this.supersetEmbedDashboardId },
        ],
      };
      // Send the request to the Superset service to fetch the guest token
      return this.supersetService.getGuestToken(requestBody).toPromise();
    };


    // Dynamically pass the state name from the logged in user profile
    let filters = [
      { id: 'NATIVE_FILTER-210Q_hGGax', column: 'state', value: 'Andhra Pradesh' },
      { id: 'NATIVE_FILTER-MgsHyuye2m', column: 'year', value: '2022-23' }
    ];

    // If doesnt need any filter uncomment below to empty the filter array. 
    //filters = [];

    // Generate the native filters string by calling the function and applying it to the filters array
    const nativeFilters = `(${this.generateNativeFilters(filters)})`

    // Call embedDashboard to embed the Superset dashboard with specified configurations
    embedDashboard({
      id: this.supersetEmbedDashboardId,       // UUID of the dashboard to embed
      supersetDomain: this.supersetDomainUrl,  // Superset domain URL
      mountPoint: document.getElementById(this.htmlElementId) as HTMLElement, // DOM element to mount dashboard
      fetchGuestToken: fetchGuestToken,        // Method to retrieve guest token

      dashboardUiConfig: {
        hideTitle: true,     // Hide the dashboard title
        filters: {
          expanded: true     // Expand filters by default
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