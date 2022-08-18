console.log('Beginning automated tests with JavaScript disabled.');

const puppeteer = require('puppeteer');

async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await page.goto('https://tchan.lol/t');
    await page.evaluate(() => {
        // I can use document.getElement... here to modify the DOM.
        document.getElementById('text').innerText = 'puppeteer thread testing';
        //document.getElementById('embedInputId').value = 'https://www.youtube.com/watch?v=jfKfPfyJRdk';
        //document.getElementById('postButton').click();
    });
    // And I can also do it here.
    const elementHandle = await page.$('input[id=fileInputId]');
    await elementHandle.uploadFile('file.png');
    await page.click('input[id=postButton]');
    //await page.screenshot({path: 'example.png'});
    await browser.close();
};

async function downloadMedia(thread){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(thread);
    const elements = await page.evaluate(() => Array.from(document.querySelectorAll('a[class="imgLink"]'), element => element.href));
 
    console.log(elements);
    elements.map((i) => console.log(i));
    await browser.close();
}

