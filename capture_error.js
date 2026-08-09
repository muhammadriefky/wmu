import puppeteer from 'puppeteer';

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
        page.on('response', response => {
            if (response.status() >= 400) {
                console.log('RESPONSE ERROR:', response.status(), response.url());
            }
        });
        
        await page.goto('http://127.0.0.1:8000/admin/video', { waitUntil: 'networkidle0' });
        await browser.close();
    } catch (err) {
        console.error(err);
    }
})();
