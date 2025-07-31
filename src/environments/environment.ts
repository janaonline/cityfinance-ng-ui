let url = "https://dev.cityfinance.in/api/v1/";
// url = "http://localhost:8080/api/v1/";
// url = "https://staging.cityfinance.in/api/v1/";
// url = "https://cityfinance.in/api/v1/";
let GoogleTagID: string= "G-803HPPLFMM";
let isProduction: boolean = false;
let versionCheckURL = window.location.origin + "/v1/version.json";
let STORAGE_BASEURL = 'https://jana-cityfinance-stg.s3.ap-south-1.amazonaws.com';
//https://jana-cityfinance-live.s3.ap-south-1.amazonaws.com - s3 storage url prod
let storageType: string = 'S3Url'; // // "S3Url" for S3 storage type, for azure change this to 'BlobUrl'

// if (window.location.hostname.includes("staging")) {
//   url = "https://staging.cityfinance.in/api/v1/";  
//   GoogleTagID = "G-803HPPLFMM";
// } else if (
//   window.location.hostname.includes("demo") ||
//   window.location.hostname.includes("localhost")
// ) {
//   //  url = "https://staging.cityfinance.in/api/v1/";
//   //url = "https://democityfinanceapi.dhwaniris.in/api/v1/";
//   url = "https://dev.cityfinance.in/api/v1/"
//   STORAGE_BASEURL = 'https://democityfinance.s3.ap-south-1.amazonaws.com';
//   GoogleTagID = "G-MDPDTZFW0N";
// } else {
//   isProduction = true;
//   url = "https://cityfinance.in/api/v1/";
//   GoogleTagID = "G-MDPDTZFW0N";
// }


export const environment = {
  performanceURL: "https://pas.org.in/web/ceptpas/iuppkpi?parameterAutoLoginLogin=guestulb9&parameterAutoLoginPassword=guestulb9@abc",
  production: false,
  api: {
    url2: "https://cityfinance.in/",
    url: url,
  },
  reCaptcha: {
    siteKey: "6LcT9_gUAAAAANrZM5TNnE4OEEC46iFDfcAHZ8lD",
  },
  isProduction: isProduction,
  GoogleTagID,
  versionCheckURL,
  STORAGE_BASEURL,
  storageType,

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
