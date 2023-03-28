
let imageBuilder;

fetch('../initializeGallery.php')
    .then(response => response.json())
    .then(data => {
        // Do something with the data, e.g. manipulate the image arrays
        console.log(data);
    })
    .catch(error => console.error(error));