/**
 * "Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client"
 */
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { SUDOKU_BOARD_TOKEN } from './routes/sudoku/modules';
import { TANK_CALL_LOADER_TOKEN } from './routes/tank-call/tank-call-loader-token';

@NgModule({
  imports: [
    AppModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  bootstrap: [AppComponent],
  providers: [{
    provide: TANK_CALL_LOADER_TOKEN,
    useFactory: () => import('@spielhalle/tank-call'),
  }, {
    provide: SUDOKU_BOARD_TOKEN,
    useFactory: () => import('@spielhalle/sudoku-board'),
  }
  ]
})
export class AppBrowserModule { }
