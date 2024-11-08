const domain = 'jurai-git.github.io';

function redirectToLoginPage() {
    // const loginUrl = `https://${domain}/login`;

    window.location.href = 'http://127.0.0.1:5500/login.html'

    // if (typeof chrome !== 'undefined') {
    //     chrome.tabs.create({ url: loginUrl }, function () {
    //         window.close();
    //     });
    // } else if (typeof browser !== 'undefined') {
    //     browser.tabs.create({ url: loginUrl }).then(function () {
    //         window.close();
    //     });
    // }
}

function getCookieAPI() {
    if (typeof browser !== 'undefined') {
        return browser.cookies;
    }
    if (typeof chrome !== 'undefined') {
        return chrome.cookies;
    }
    throw new Error('Unsupported browser');
}

async function getCookieFromDomain(cookieName, domain) {
    const cookiesAPI = getCookieAPI();

    return new Promise((resolve, reject) => {
        cookiesAPI.get({ name: cookieName, url: `https://${domain}` }, (cookie) => {
            if (chrome.runtime.lastError || browser.runtime.lastError) {
                reject(new Error('Failed to access cookie'));
            } else {
                resolve(cookie ? cookie.value : null);
            }
        });
    });
}

(async () => {
    try {
        const accessToken = await getCookieFromDomain('access_token', domain);

        if (accessToken) {
            console.log('Access Token: ', accessToken);
        } else {
            console.warn(`Cookie "access_token" was not found in the domain ${domain}`);
            redirectToLoginPage();
        }
    } catch (error) {
        console.error('Error getting cookie: ', error.message);
    }
})();
