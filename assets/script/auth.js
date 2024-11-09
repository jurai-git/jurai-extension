const domain = 'jurai-git.github.io';
const cookieName = 'access_token';

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
        const accessToken = await getCookieFromDomain(cookieName, domain);

        if (accessToken) {
            console.log('Access Token: ', accessToken);
        } else {
            console.warn(`Cookie "access_token" was not found in the domain ${domain}`);
            window.location.href = 'login.html'
        }
    } catch (error) {
        console.error('Error getting cookie: ', error.message);
    }
})();


document.getElementById('logout').addEventListener('click', () => {
    const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
    
    browserAPI.cookies.remove({
        url: `https://${domain}/`,
        name: cookieName
    }, (details) => {
        if (details) {
            console.log('Cookie deletado:', details);
        } else {
            console.log('Não foi possível deletar o cookie');
        }
    });

    window.location.href = 'index.html'
});
