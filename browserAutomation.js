import {chromium} from 'k6/experimental/browser'
import {check, sleep} from 'k6'

export default async function(){
    const browser=chromium.launch({headless:false});
    const page=browser.newPage();

    try{
        await page.goto('https://www.jacplus.com.au/',{waitUntil:'networkidle'});
        await page.locator('input[name="username"]').type('demohub@personal.com');
        await page.locator('//*[@id="idpLogin"]').click();
        await Promise.all([
            page.waitForSelector('input[name="password"]'),
        ]);
        await page.locator('input[name="password"]').type('My@password');

        const loginButton=page.locator('//*[@id="submit"]');
        await Promise.all([
            page.waitForNavigation(),
            loginButton.click(),
        ]);
        await page.locator('//*[@id="bookshelfTab"]').click();

        await Promise.all([
            page.waitForNavigation(),
            page.waitForSelector("//strong[normalize-space()='Jacaranda English 10']").click(),
        ]);
        page.screenshot({path:'loTitle.png'});
        
        sleep(5);
        check(page,{
            'Valid Title' : page.title()=='Jacaranda English Is... 10',
        });
    } finally {
        page.close();
        browser.close();
    }

}