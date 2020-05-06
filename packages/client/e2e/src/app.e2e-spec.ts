/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', (): void => {
  let page: AppPage;

  beforeEach((): void => {
    page = new AppPage();
  });

  it('should display welcome message', (): void => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to spielhalle!');
  });

  afterEach(async (): void => {
    // Assert that there are no errors emitted from the browser
    const logs: Promise<logging.Entry[]> = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
