import * as imageBuilder from './ImageBuilder.js';

(async () => {
    let gallery;
    const getData = async () => {
        const response = await fetch("../initializeGallery.php");
        const data = await response.json();
        gallery = data;
        return data;
    };

    await getData();
    const keys = Object.keys(gallery);

    for(const key in gallery) {

        const index = keys.indexOf(key) + 1;
        const arrLength = gallery[key].length;
        imageBuilder.clear();

        for(let i = 0; i < arrLength; i++){

            if(i === 1 && arrLength === 7){ //If question has 2 answers for Q2

                imageBuilder.layerTwo(gallery[key][i].a_index, gallery[key][i+1].a_index);
                i++;

            } else {
                imageBuilder.allOtherLayers(gallery[key][i].q_index - 1, gallery[key][i].answer, gallery[key][i].a_index - 1);
            }

        }

        await displayGallery(index);

    }

})();

async function displayGallery(index) {

    const images = imageBuilder.getImages();
    images.sort((a, b) => a.layer - b.layer);
    await displayImg(images, index);

}

async function displayImg(images, index){

    const container = document.createElement("div");
    container.id = "img_" + index;
    container.classList.add('w-dyn-item', 'w-col', 'w-col-4');
    container.setAttribute("role", "listItem");

    const imageArr = [];
    for (let i = 0; i < images.length; i++) {
        const image = new Image();
        image.src = images[i].src;
        const loadedImage = new Promise(resolve => {
            image.onload = () => {
                resolve(image);
            };
        });
        imageArr.push(loadedImage);
    }

    const loadedImages = await Promise.all(imageArr);
    const canvas = document.createElement("canvas");
    canvas.width = 350;
    canvas.height = 350;

    for (let i = 0; i < loadedImages.length; i++) {
        const ctx = canvas.getContext("2d");
        const image = loadedImages[i];

        const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
        const width = image.width * scale;
        const height = image.height * scale;

        ctx.drawImage(image, 0, 0, width, height);

    }

    const image = document.createElement("img");
    image.classList.add('w-dyn-item', 'w-col', 'w-col-4');
    image.id = "img_" + index;

    container.appendChild(canvas);
    document.getElementById("galleryImages").appendChild(container);

}
