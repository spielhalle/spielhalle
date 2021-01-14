/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // tslint:disable:component-selector
import { AppComponent } from './app.component';
// tslint:disable:directive-selector
@Component({
  selector: 'mat-toolbar',
  template: '<div></div>',
})
class TestMatToolbarComponent {
}

// tslint:enable:component-selector
// tslint:enable:directive-selector
describe('AppComponent', (): void => {
  beforeEach(waitForAsync((): void => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TestMatToolbarComponent,
      ],
      imports: [
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  it('should create the app', (): void => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'spielhalle'`, (): void => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('spielhalle');
  });
});
