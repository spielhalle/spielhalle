/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppBrowserModule } from './app/app.browser.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', (): void => {
  platformBrowserDynamic().bootstrapModule(AppBrowserModule)
    .catch((err: any): void => console.error(err));
});
