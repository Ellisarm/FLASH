const puppeteer = require("puppeteer-core");

async function scrapeProductSecond(url = "https://www.flashscore.ro/") {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--single-process',
  ]
  });
  const page = await browser.newPage();
  await page.goto(url);
  // console.log("sunt in funcite");

  const echipeAcasa = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "div.container > div:first-child > div:first-child > div:first-child > #mc > #fsbody > #live-table > section > div > div > div.event__match  > div.event__participant.event__participant--home"
      )
    ).map((x) => x.textContent);
  });

  const echipeDeplasare = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "div.container > div:first-child > div:first-child > div:first-child > #mc > #fsbody > #live-table > section > div > div > div.event__match  > div.event__participant.event__participant--away"
      )
    ).map((x) => x.textContent);
  });

  const theIds = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "div.container > div:first-child > div:first-child > div:first-child > #mc > #fsbody > #live-table > section > div > div > div.event__match "
      )
    ).map((x) => x.id);
  });

  /* await console.log(echipeDeplasare, echipeDeplasare.length  );
 await console.log(echipeAcasa, echipeAcasa.length  ); 
 await console.log(theIds, idurile.length); */
  await browser.close();
  return { echipeAcasa, echipeDeplasare, theIds };
}
module.exports = scrapeProductSecond;
