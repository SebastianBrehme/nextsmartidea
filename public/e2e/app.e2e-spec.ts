import { SmartEventPage } from './app.po';

describe('smart-event App', () => {
  let page: SmartEventPage;

  beforeEach(() => {
    page = new SmartEventPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
