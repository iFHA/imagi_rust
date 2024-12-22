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
    const btnApplyFilter = document.getElementById('apply-filter');
    const selectFilter = document.getElementById('filter');

    const fileReader = new FileReader();

    fileReader.onloadend = () => {
        const originBase64ImgUrl = fileReader.result;
        img.setAttribute('src', originBase64ImgUrl);
        const base64 = originBase64ImgUrl.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        // const newBase64ImgUrl = rustApp.grayscale(base64);
        // exibindo imagem modificada 3 segundos após processamento
        // só para que o usuário possa ter tempo para ver a mudança
        // setTimeout(() => img.setAttribute('src', newBase64ImgUrl), 3000)
    };

    input.addEventListener('change', () => {
        fileReader.readAsDataURL(input.files[0]);
    });

    btnApplyFilter.addEventListener('click', () => {
        const selectedFilter = selectFilter.value;
        const isValidFilterSelected = ['grayscale', 'sepia'].includes(selectedFilter);
        if(!isValidFilterSelected) {
            alert('Selecione um filtro!');
            return;
        }
        const base64 = img.getAttribute('src').replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        let newBase64ImgUrl = rustApp.apply_filter(base64, selectedFilter);
        img.setAttribute('src', newBase64ImgUrl);
    });
})();