import { sleep } from 'k6';
import {chromium} from 'k6/x/browser';

export default function(){
    const browser=chromium.launch({
        headless:false,
        slowMo:'500ms'
    });

    const context=browser.newContext();
    const page=context.newPage();
    page.goto('https://www.jacplus.com.au',{waitUntil:'networkidle'});
    page.screenshot({path:'home.png'});
    sleep(4);
    let emailTextBox=page.$('input[name="username"]');
    emailTextBox.type('demohub@personal.com');
    let nextButton=page.$('//*[@id="idpLogin"]');
    nextButton.click();
    let passwordBox=page.$('input[name="password"]');
    passwordBox.type('My@password');
    let singInButton=page.$('input[id="submit"]');
    singInButton.click();
    page.screenshot({path:'bookshelf.png'});
    page.close();
    browser.close();
}