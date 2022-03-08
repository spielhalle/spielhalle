/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

// This file is required by karma.conf.js and loads recursively all the .spec and framework files
// tslint:disable:ordered-imports
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  platformBrowserDynamicTesting,
  BrowserDynamicTestingModule,
} from '@angular/platform-browser-dynamic/testing';
import 'zone.js/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
},
);
// Then we find all the tests.
const context: any = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
