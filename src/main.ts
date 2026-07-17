import "@angular/compiler";
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
  window.console.log = () => { };
}

if (window && !window.location.hostname.includes("localhost")) {
  // window.console.log = () => {};
  // window.console.error = () => {};
  // window.console.warn = () => {};
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
