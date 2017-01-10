import { MktbeamPlatformTesterngPage } from './app.po';

describe('mktbeam-platform-testerng App', function() {
  let page: MktbeamPlatformTesterngPage;

  beforeEach(() => {
    page = new MktbeamPlatformTesterngPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
