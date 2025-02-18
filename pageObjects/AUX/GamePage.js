const { expect } = require('@playwright/test');

exports.GamePage = class GamePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page, loadedInIframe = false) {
    this.page = page;

    if (loadedInIframe) {
      this.iframe = page.frameLocator('iframe.w-100');
      this.body = this.iframe.locator('body');
    } else {
      this.body = page.locator('body');
      this.page.setViewportSize({ width: 966, height: 545 }); // make it proportionate to the game iframe
    }
    
    // elements below are based on this.body to ensure they can be used both as standalone and when launched from the main page (in iframe)
    this.canvas = this.body.locator("//canvas");
    this.canvasInteractable = this.body.locator("//canvas[contains(@style, 'cursor: pointer')]");
    
    this.settingsMenu = this.body.locator("//div[contains(@class, 'mainPageContent')]");
    this.settingsMenuCloseButton = this.settingsMenu.locator("xpath=//preceding-sibling::div[contains(@class, 'closeIcon')]");
    
    this.gameInfoIcon = this.body.locator("//img[contains(@src, 'hud_icon_info')]");    
    this.gameInfoContent = this.body.locator("//div[contains(@class, 'rulesContent')]").first();
    this.gameInfoContentLastChild = this.gameInfoContent.locator("//div/div").last();
    this.gameInfoCloseButton = this.gameInfoContent.locator("xpath=//preceding-sibling::div[contains(@class, 'closeIcon')]");
    
    this.gameRulesIcon = this.body.locator("img[src*='hud_icon_game_rules']");
    this.gameRulesContent = this.body.locator("//div[contains(@class, 'rulesContent')]").last();
    this.gameRulesContentLastChild = this.gameRulesContent.locator("xpath=./div/*").last();
    this.gameRulesCloseButton = this.gameRulesContent.locator("//preceding-sibling::div[contains(@class, 'closeIcon')]");
  }

  // this can be used to load a game with a specific language - without going through the main page
  // the actual game can also be parametrized 
  async goto(language) {
    await this.page.goto('https://cdn-replay-eu.avatarux.app/arcana-pop/index.html?game=arcana-pop&wallet=demo&operator=demo&key=&server=https%3A%2F%2Freplay-eu.avatarux.app&language='+language+'&provider=avatarux&channel=desktop&rgs=avatarux-rgs');
    await this.waitForGameLoad();
  }

  async waitForGameLoad() {
    await this.body.hover();
    await this.canvasInteractable.waitFor({ state: 'visible' });
    await this.initializeCoordinates();
  }

  async startGame() {
    await this.canvasInteractable.click();
  }

  async openSettings() {
    if (!this.buttonCoordinates) {
      await this.initializeCoordinates();
    }
    await this.page.mouse.move(this.buttonCoordinates.settingsButton.x, this.buttonCoordinates.settingsButton.y);
    await this.canvasInteractable.waitFor({ state: 'visible' });
    await this.page.mouse.click(this.buttonCoordinates.settingsButton.x, this.buttonCoordinates.settingsButton.y);
    await this.settingsMenu.waitFor({ state: 'visible' });
    // console.log("Settings Menu: ", await this.settingsMenu.innerText());
  }

  async openGameInfo() {
    await this.gameInfoIcon.hover();
    await this.gameInfoIcon.click();
    await this.gameInfoContent.waitFor({ state: 'visible' });
    // console.log("Game Info: ", await this.gameInfoContent.innerText());
  }

  async closeGameInfo() {
    await this.gameInfoCloseButton.hover();
    await this.gameInfoCloseButton.click();
    await this.gameInfoContent.waitFor({ state: 'hidden' });
  }

  async openGameRules() {
    await this.gameRulesIcon.hover();
    await this.gameRulesIcon.click();
    await this.gameRulesContent.waitFor({ state: 'visible' });
    // console.log("Game Rules: ", await this.gameRulesContent.innerText());
  }

  async closeGameRules() {
    await this.gameRulesCloseButton.hover();
    await this.gameRulesCloseButton.click();
    await this.gameRulesContent.waitFor({ state: 'hidden' });
  }

  async closeSettings() {
    await this.settingsMenuCloseButton.hover();
    await this.settingsMenuCloseButton.click();
    await this.settingsMenu.waitFor({ state: 'hidden' });
  }

  // for buttons hidden in the canvas, we need to initialize the coordinates of the buttons
  async initializeCoordinates() {
    const box = await this.body.boundingBox();
    this.buttonCoordinates = {
      settingsButton: { x: box.x + (box.width * 0.041), y: box.y + (box.height * 0.9544) },
      spinButton: { x: box.x + (box.width * 0.8756), y: box.y + (box.height * 0.7119) },
      //other buttons...
    };
  }

};
