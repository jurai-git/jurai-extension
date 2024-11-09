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

function setCookie(data) {
    const cookiesAPI = getCookieAPI();
    const expirationDate = new Date();

    const rememberMeChecked = document.getElementById('login-remember-field')?.checked || false;

    if (rememberMeChecked) {
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    } else {
        expirationDate.setTime(expirationDate.getTime() + 1800 * 1000);
    }

    cookiesAPI.set({
        name: cookieName,
        value: data.advogado.accessToken,
        url: `https://${domain}`,
        domain: domain,
        path: '/',
        expirationDate: Math.floor(expirationDate.getTime() / 1000),
        secure: true,
        sameSite: 'strict'
    }, (cookie) => {
        if (chrome.runtime.lastError || browser.runtime.lastError) {
            console.error('Erro ao definir o cookie:', chrome.runtime.lastError || browser.runtime.lastError);
        } else {
            console.log(`Cookie "${cookie}" criado com sucesso.`);
        }
    });
}
