// @ts-check
const { test, expect } = require('@playwright/test');
const { MainPage } = require('../pageObjects/AUX/MainPage');
const { GamePage } = require('../pageObjects/AUX/GamePage');
const { scrollToBottom } = require('../utils/elementUtils');
const localisation = require('../resources/AUX/localisation.json');

// const testCases = [ "en", "de", "fr" ];
const testCases = [ "en"];

test.describe('AvatarUX end2end Tests', () => {
  for (const language of testCases) {
    test(`navigate to avatarux and open latest game - ${language}`, async ({ page }) => {
      const mainPage = new MainPage(page);
      const gamePage = new GamePage(page, true);

      await test.step('Navigate to main page', async () => {
        await mainPage.goto();
        await expect(await mainPage.title.innerText()).toContain(localisation[language].title);
      });

      await test.step('Close popups', async () => {
        await mainPage.closePopups();
        await expect(mainPage.confirmAge).toBeHidden();
        await expect(mainPage.rejectAllCookies).toBeHidden();
      });

      await test.step('Open latest game', async () => {
        await mainPage.openLatestGame();
        await expect(mainPage.gameModal).toBeVisible();
      });

      await test.step('Wait for game to load then start it', async () => {
        await gamePage.waitForGameLoad();
        await gamePage.startGame();
        await expect(gamePage.canvasInteractable).toBeHidden();
      });

      await test.step('Open settings', async () => {
        await gamePage.openSettings();
        await expect(gamePage.settingsMenu).toBeVisible();
        await expect(await gamePage.settingsMenu.innerText()).toContain(localisation[language].settingsMenu);
      });

      await test.step('Open game info', async () => {
        await gamePage.openGameInfo();
        await expect(gamePage.gameInfoContent).toBeVisible();
        await expect(await gamePage.gameInfoContent.innerText()).toContain(localisation[language].gameInfo);
      });

      await test.step('scroll to bottom of game info', async () => {
        await scrollToBottom(gamePage.gameInfoContent);
        await expect(gamePage.gameInfoContentLastChild).toBeInViewport();
      });

      await test.step('Close game info', async () => {
        await gamePage.closeGameInfo();
        await expect(gamePage.gameInfoContent).toBeHidden();
      });

      await test.step('Open settings', async () => {
        await gamePage.openSettings();
        await expect(gamePage.settingsMenu).toBeVisible();
      });

      await test.step('Open game rules', async () => {
        await gamePage.openGameRules();
        await expect(gamePage.gameRulesContent).toBeVisible();
        await expect(await gamePage.gameRulesContent.innerText()).toContain(localisation[language].gameRules);
      });

      await test.step('scroll to bottom of game rules', async () => {
        await scrollToBottom(gamePage.gameRulesContent);
        await expect(gamePage.gameRulesContentLastChild).toBeInViewport();
      });

      await test.step('Close game rules', async () => {
        await gamePage.closeGameRules();
        await expect(gamePage.gameRulesContent).toBeHidden();
      });
      
// not required since all close buttons close the menu entirely
      // await test.step('Close settings', async () => {
      //   await gamePage.closeSettings();
      //   await expect(gamePage.settingsMenu).toBeHidden();
      // });
      

    });

  }
});
