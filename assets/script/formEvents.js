function callApi(event) {
    event.preventDefault();

    const baseUrl = 'https://cors-anywhere.herokuapp.com/https://jurai-server-production.up.railway.app';

    const urlMap = {
        loginLawyer: `${baseUrl}/advogado/get`,
    };

    const form = event.target;
    const formId = form.id;
    const url = urlMap[formId];

    if (!url) {
        console.error('Form ID não encontrado no mapa de URLs.');
        return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log(`Formulário: ${formId}`);
    console.log(`URL correspondente: ${url}`);
    console.log(`Dados do formulário:`, JSON.stringify(data));

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return fetch(url, options)
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP status: ${res.status}`);
        }
        return res.json();
    });
}

document.getElementById('loginLawyer').addEventListener('submit', (event) => {
    event.preventDefault();

    callApi(event)
    .then(data => {
        alert(`Logado com sucesso, ${data.advogado.username}!`)
        setCookie(data);
        window.location.href = 'index.html'
    })
    .catch(err => alert(err));
});