const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Dog Image Test', () => {
  let driver;

  beforeAll(async () => {
    // Set up Chrome options
    const options = new chrome.Options();
    options.addArguments('--headless'); // Run in headless mode
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    // Build the WebDriver
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('should load and display dog images', async () => {
    // Navigate to the HTML page (assuming http-server is running on port 8080)
    await driver.get('http://localhost:8080');

    // Wait for the button to be clickable
    const button = await driver.wait(until.elementLocated(By.css('button')), 10000);
    await button.click();

    // Wait for the original image to load
    const originalImg = await driver.wait(until.elementLocated(By.css('#dog-container img')), 10000);

    // Check that the image has a src attribute
    const originalSrc = await originalImg.getAttribute('src');
    expect(originalSrc).toContain('https://images.dog.ceo');

    // Wait for the grayscale image to load
    const greyImg = await driver.wait(until.elementLocated(By.css('#dog-grey img')), 10000);

    // Check that the grayscale image has a src starting with data:
    const greySrc = await greyImg.getAttribute('src');
    expect(greySrc).toMatch(/^data:image\/png;base64,/);
  }, 30000); // Increase timeout for network requests
});