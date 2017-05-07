import { DovrimAppPage } from './app.po';

describe('dovrim-app App', () => {
  let page: DovrimAppPage;

  beforeEach(() => {
    page = new DovrimAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
