const puppeteer = require('puppeteer');
const util = require('util');

(async () => {
  const urls = ["https://www.youtube.com","https://www.google.com/"];
  const checkedText = 'search text';
  const foundURLs = [];
  const uncheckedURLS = [];

  const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true
  });

  const page = await browser.newPage();

  for (const url of urls) {
      try {
          await page.goto(url, { waitUntil: 'networkidle0' });
          const pageSource = await page.content();
          const textFound = pageSource.includes(checkedText);

          if(textFound){
            console.log(`URL with "${checkedText}" in it: ${url}`);
            foundURLs.push(url);
          }
      } catch (e) {
          console.log(`Unreachable URL: ${url}`);
          uncheckedURLS.push(url);
      }
  }

  console.log(`URLs with "${checkedText}" in it:`);
  console.log(util.inspect(foundURLs, {showHidden: false, depth: null}));
  console.log(`Unreachable URLs:`);
  console.log(util.inspect(uncheckedURLS, {showHidden: false, depth: null}));

  await browser.close();
})();