const puppeteer = require('puppeteer-core')

 async function scrapeProduct(url) {
  const browser = await puppeteer.launch({
    headless:true,
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

  const cote = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "#detail > div:not([class]) > div.oddsTab__tableWrapper > div > div.ui-table__body > div > a > span"
      )
    ).map((x) => x.textContent);
  });
  // console.log(cote); 
//  await console.log(cote);
  await browser.close();
  return cote 
}
module.exports = scrapeProduct




// const puppeteer = require("puppeteer");
// async function scrapeProduct(url) {
//   const browser = await puppeteer.launch();
//   const page = await  browser.newPage();
//   await page.goto(url);

//   /*  const [el] = await page.$x('//*[@id="detail"]/div[4]/div[2]/div[2]/a/img')
//   const src = await el.getProperty('src')
//   const srcTxt = await src.jsonValue()

//   const [el2] = await page.$x('//*[@id="detail"]/div[4]/div[2]/div[4]/div[2]/a')
//   const txt = await el2.getProperty()
//   const rawTxt = await txt.jsonValue()

//   console.log({srcTxt, rawTxt}); */

//   export const cote= await page.evaluate(() => {
//     return Array.from(
//       document.querySelectorAll(
//         "#detail > div:nth-child(6) > div.oddsTab__tableWrapper > div > div.ui-table__body > div > a:nth-child(2) > span"
//       )
//     ).map((x) => x.textContent);
//   });
//   console.log(cote);
//   await browser.close();

  
// }

//  scrapeProduct('https://www.flashscore.ro/meci/jDccmYos/#comparare-cote/cote-1x2/final').then(() => {
 
//  })

