"use-strict";

(async function init() {

    let rustApp = null;

    try {
        rustApp = await import('../pkg/index.js');
    } catch (e) {
        console.error(e);
        return;
    }

    const input = document.getElementById('upload');
    const img = document.getElementById('new-img');
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
        const originBase64ImgUrl = fileReader.result;
        img.setAttribute('src', originBase64ImgUrl);
        const base64 = originBase64ImgUrl.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        const newBase64ImgUrl = rustApp.grayscale(base64);
        // exibindo imagem modificada 3 segundos após processamento
        // só para que o usuário possa ter tempo para ver a mudança
        setTimeout(() => img.setAttribute('src', newBase64ImgUrl), 3000)
    };

    input.addEventListener('change', () => {
        fileReader.readAsDataURL(input.files[0]);
    });
})();