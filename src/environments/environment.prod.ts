// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let url = window.location.origin + "/api/v1/";  
let GoogleTagID: string;
let isProduction:boolean =false;
let versionCheckURL = window.location.origin + "/version.json";
let STORAGE_BASEURL = 'https://janaagrahstorage.blob.core.windows.net/jana-cityfinance-stg';

if (window.location.hostname.includes("new-cityfinance")) {

  url = "https://newcityfinanceapi.dhwaniris.in/api/v1/";
  ///url = "http://localhost:8080/api/v1/";
  GoogleTagID = "G-MDPDTZFW0N";
} else if (window.location.hostname.includes("staging")) {
  url = "https://staging.cityfinance.in/api/v1/";
  GoogleTagID = "G-MDPDTZFW0N";
} else if (
  window.location.hostname.includes("demo") ||
  window.location.hostname.includes("localhost")
) {
  url = "https://staging.cityfinance.in/api/v1/";
  GoogleTagID = "G-MDPDTZFW0N";
} else if (window.location.origin === "https://prod.cityfinance.in") {
  GoogleTagID = "G-MDPDTZFW0N";
  STORAGE_BASEURL = 'https://janaagrahstorage.blob.core.windows.net/jana-cityfinance-live';
} else if (window.location.origin === "https://cityfinance.in") {
  isProduction = true;
  url = "https://cityfinance.in/api/v1/";
  GoogleTagID = "G-MDPDTZFW0N";
  STORAGE_BASEURL = 'https://janaagrahstorage.blob.core.windows.net/jana-cityfinance-live';
}


// url = "http://localhost:8080/api/v1/"
// url = "http://192.168.200.148:8080/api/v1/"

// url = "https://staging.cityfinance.in/api/v1/";
// url = "https://cityfinance.in/api/v1/";
export const environment = {
  production: true,
  api: {
    url2: "https://cityfinance.in/",
    url1: "https://democityfinanceapi.dhwaniris.in/",
    url,
  },

  reCaptcha: {
    siteKey: "6LcT9_gUAAAAANrZM5TNnE4OEEC46iFDfcAHZ8lD",
  },
  isProduction: isProduction,
  GoogleTagID,
  versionCheckURL,
  STORAGE_BASEURL
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.