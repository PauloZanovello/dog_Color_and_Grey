const dogImgContainer = document.getElementById('dog-container');
const dogGreyContainer = document.getElementById('dog-grey');
const dogImg = document.createElement('img');
const dogGreyImg = document.createElement('img');

async function fetchAndProcessDogImage() {
    try {
        // Buscar URL da imagem
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        const imageUrl = data.message;
        console.log('Imagem de cachorro aleatória:', imageUrl);

        // Definir src da imagem original
        dogImg.src = imageUrl;

        // Para tons de cinza, usar Canvas
        const tempImg = new Image();
        tempImg.crossOrigin = 'Anonymous';
        tempImg.src = imageUrl;

        tempImg.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = tempImg.width;
            canvas.height = tempImg.height;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(tempImg, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Converter para tons de cinza
            for (let i = 0; i < data.length; i += 4) {
                const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
                data[i] = gray;
                data[i + 1] = gray;
                data[i + 2] = gray;
            }

            ctx.putImageData(imageData, 0, 0);
            dogGreyImg.src = canvas.toDataURL('image/png');
        };

        tempImg.onerror = function() {
            dogGreyImg.src = 'error+imgGREY';
        };

        dogImgContainer.appendChild(dogImg);
        dogGreyContainer.appendChild(dogGreyImg);

    } catch (error) {
        console.error('Erro ao buscar e processar imagem:', error);
        dogImg.src = 'error+img';
        dogGreyImg.src = 'error+imgGREY';
    }
}

async function createDogImage() {
    console.log('Carregando e processando imagem de cachorro...');
    await fetchAndProcessDogImage();
    console.log('Processamento completo!');
}

// Função será chamada pelo botão