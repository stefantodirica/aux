const { expect } = require('@playwright/test');

exports.MainPage = class MainPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.locator('//head/title[contains(text(), "AvatarUX")]');
    this.confirmAge = page.locator('button#ageOver');
    this.rejectAllCookies = page.locator('.cky-notice-btn-wrapper button[aria-label="Reject All"]');
    this.latestGames = page.locator('#tns3');
    this.latestGame = page.locator('#tns3-item0 button.crunch-button[data-iframe-type="game"]');
    this.gameModal = page.locator('.custom-modal__iframe');
  }

  async goto() {
    await this.page.goto('https://avatarux.com/');
  }

  async closePopups() {
    await this.confirmAge.click();
    await this.rejectAllCookies.click();
  }

  async openLatestGame() {
    await this.latestGame.scrollIntoViewIfNeeded();
    await this.latestGame.click();
  }
};
