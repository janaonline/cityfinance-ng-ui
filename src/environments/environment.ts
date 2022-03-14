// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let url;
let GoogleTagID: string;
if (
  window.location.hostname.includes("demo") ||
  window.location.hostname.includes("localhost")
  // window.location.hostname.includes("new-cityfinance.dhwaniris.in")
) {
  url = "https://democityfinanceapi.dhwaniris.in/api/v1/";
  // url = "http://localhost:8000/api/v1/";
  GoogleTagID = "UA-171288029-2";
} else if (window.location.hostname.includes("staging")) {
  url = "https://staging.cityfinance.in/api/v1/";
} else {
  url = "https://cityfinance.in/api/v1/";
  GoogleTagID = "UA-171288029-1";
}
// url = "https://cityfinance.in/api/v1/";
export const environment = {
  production: false,
  api: {
    url2: "https://cityfinance.in/",
    url: url,
  },
  reCaptcha: {
    siteKey: "6LcT9_gUAAAAANrZM5TNnE4OEEC46iFDfcAHZ8lD",
  },
  GoogleTagID,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
