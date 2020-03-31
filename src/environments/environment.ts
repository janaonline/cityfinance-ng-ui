// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let url;
if (window.location.hostname.includes("demo")) {
  url = "https://democityfinanceapi.dhwaniris.in/api/admin/v1";
} else if (window.location.hostname.includes("localhost")) {
  url = "https://democityfinanceapi.dhwaniris.in/api/admin/v1";
} else if (window.location.hostname.includes("staging")) {
  url = "http://stgcityfinance.in/admin/api/v1/";
} else {
  url = "http://cityfinance.in/api/v1/";
}
// url = "http://cityfinance.in/api/v1/";
export const environment = {
  production: false,
  api: {
    url2: "http://cityfinance.in/",
    url: url
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
