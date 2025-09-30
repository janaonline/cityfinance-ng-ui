// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let url = window.location.origin + "/api/v1/";
let urlV2 = window.location.origin + "/api/v2/";
let GoogleTagID: string = "G-803HPPLFMM";
let isProduction: boolean = false;
let versionCheckURL = window.location.origin + "/v1/version.json";
let STORAGE_BASEURL: string = 'https://jana-cityfinance-stg.s3.ap-south-1.amazonaws.com';
let storageType: string = 'S3Url'; // "S3Url" for S3 storage type, for azure change this to 'BlobUrl'

if (window.location.origin === "https://cityfinance.in" || window.location.origin === "https://www.cityfinance.in") {
  isProduction = true;
  url = "https://www.cityfinance.in/api/v1/";
  GoogleTagID = "G-MDPDTZFW0N";
  STORAGE_BASEURL = 'https://jana-cityfinance-live.s3.ap-south-1.amazonaws.com';
}
export const environment = {
  performanceURL: "https://pas.org.in/web/ceptpas/iuppkpi?parameterAutoLoginLogin=guestulb9&parameterAutoLoginPassword=guestulb9@abc",
  production: true,
  api: {
    url2: "https://www.cityfinance.in/",
    url1: "https://democityfinanceapi.dhwaniris.in/",
    url,
    urlV2,
  },
  reCaptcha: {
    siteKey: "6LcT9_gUAAAAANrZM5TNnE4OEEC46iFDfcAHZ8lD",
  },
  isProduction: isProduction,
  GoogleTagID,
  versionCheckURL,
  STORAGE_BASEURL,
  storageType
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
