
const images = [];

function layerTwo(indexOne, indexTwo){
    let opt_1 = indexOne;
    let opt_2 = indexTwo;

    let src1 = "../.img/Layer 2 - Colours/Two colours/Colours_" + opt_1 + " + " + opt_2 + ".png";
    let src2 = "../.img/Layer 2 - Colours/Two colours/Colours_" + opt_2 + " + " + opt_1 + ".png";

    let temp = [];
    if (imageExists(src1)) {
        temp.push(src1);
    } else if (imageExists(src2)) {
        temp.push(src2);
    } else {
        console.error("Image not found: " + src1 + " and " + src2);
    }

    images.push({src: temp.toString(), layer: 2, order: 3});

}

function allOtherLayers(question, answer, index){

    switch(question){
        case 0:
            images.push({src: "../.img/Layer 1 - Backgrounds/" + answer + ".png", layer: 1, order: 2});
            break;
        case 1:
            images.push({src: "../.img/Layer 2 - Colours/Single colours/Colours_" + answer + ".png", layer: 2, order: 3});
            break;
        case 2:
            if (index === 0){
                images.push({src: "../.img/Layer 3 - Glows/Glows_warm.png", layer: 3, order: 4});
            } else if (index === 1){
                images.push({src: "../.img/Layer 3 - Glows/neutral.png", layer: 3, order: 4});
            } else {
                images.push({src: "../.img/Layer 3 - Glows/Glows_cold.png", layer: 3, order: 4});
            }
            break;
        case 3:
            images.push({src: "../.img/Layer 4 - Face Shapes/" + answer + ".png", layer: 4, order: 1});
            break;
        case 4:
            images.push({src: "../.img/Layer 5 - Eyes/" + answer + ".png", layer: 5, order: 5});
            break;
        case 5:
            images.push({src: "../.img/Layer 6 - Mouths/" + answer + ".png", layer: 6, order: 6});
            break;
        default:
    }

}

function imageExists(image_url) {
    let http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status !== 404;
}

function getImages(){
    return images;
}

function clear(){
    images.length = 0;
}

export {layerTwo, allOtherLayers, getImages, clear};