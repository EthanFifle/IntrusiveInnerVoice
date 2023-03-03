
const questions = [
    {//1
        question: "1. What word best describes the tone of the voice?", //Material for face
        options: ["soft", "bright", "sad", "mellow","angry", "rough", "uptight", "smooth", "flat", "sharp"],
        inputType: "radio"
    },
    {//2
        question: "2. When this voice appears, what are your feelings towards it? You can choose up to two feelings", //Colour
        options: ["detached", "dependant", "tranquil", "disgust", "assertive", "curious", "calm", "angry", "optimistic", "joy", "trusting", "loyal"],
        inputType: "checkbox"
    } ,
    {//3
        question: "3. How seriously do you take what the voice is telling you? Is it very important or does it have very little meaning?",//Warm or Cool
        options: ["very intrusive", "neutral", "not involved, very hands off"],
        inputType: "radio"
    },
    {//4
        question: "4. How strict is the voice? 1 is least strict, 7 is extremely strict.", //Shape of head
        options: ["one", "two", "three", "four","five", "six", "seven"],
        inputType: "radio"
    },
    {//5
        question: "5. What word best describes the mood that your intrusive inner voice is in?", //Eyes
        options: ["happy", "sad", "neutral", "angry","scared", "anxious", "manipulative", "jealous"],
        inputType: "radio"
    },
    {//6
        question: "6. How loud is the voice? 1 is quietest, 7 is loudest.",
        options: ["one", "two", "three", "four","five", "six", "seven"],
        inputType: "radio"
    }
];

const images = [];
const userAnswers = [];
let displayAnswers = [];
let selectedCheckboxes = [];
let currentQuestion = 0;
let nextButtonCreated = false;
let snipItButtonCreated = false;

function displayQuestion() {

    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("options");

    questionContainer.innerHTML = questions[currentQuestion].question;
    optionsContainer.innerHTML = questions[currentQuestion].options
        .map(
            (option, index) => {
                let inputType = questions[currentQuestion].inputType === "checkbox" ? "checkbox" : "radio";
                return `<label id="label-${index}" class="option-label">
                        <input class="radio-label" type="${inputType}" name="answer" value="${option}"> ${option}
                        </label><br>`
            }
        )
        .join("");

    const labels = document.querySelectorAll(".option-label");
    labels.forEach(label => {
        label.addEventListener("mouseover", function() {
            label.style.color = "red";
        });
        label.addEventListener("mouseout", function() {
            label.style.color = "";
        });
    });

    optionsContainer.onclick = function(event) {
        const selectedOption = event.target.value;
        const optionIndex = questions[currentQuestion].options.indexOf(selectedOption);

        if (event.target.type === "radio") {
            if (selectedOption) {
                userAnswers[currentQuestion] = {answer: selectedOption, index: optionIndex};
                displayAnswers[currentQuestion] = selectedOption;
                nextQuestion();
            }
        }else if (event.target.type === "checkbox") {
            const selected = optionsContainer.querySelectorAll("input[type=checkbox]:checked");
            if (selected.length <= 2){
                if (event.target.checked) {
                    selectedCheckboxes.push({answer: selectedOption, index: optionIndex});
                    if (selectedCheckboxes.length > 2) {
                        selectedCheckboxes.shift();
                    }
                } else if (!event.target.checked) {
                    const indexToRemove = selectedCheckboxes.findIndex(
                        option => option.answer === selectedOption
                    );
                    selectedCheckboxes.splice(indexToRemove, 1);
                }
                userAnswers[currentQuestion] = selectedCheckboxes;
                displayAnswers[currentQuestion] = selectedCheckboxes.map(option => option.answer).join(", ");
            } else {
                event.target.checked = false;
            }
            nextQuestion();
        }
    };
}
function nextQuestion() {

    if(!nextButtonCreated){
        const nextButton = document.createElement("button");
        nextButton.innerHTML = (currentQuestion === questions.length - 1) ? "Finish" : "Next";
        nextButtonCreated = true;
        nextButton.onclick = function() {
            currentQuestion++;
            nextButtonCreated = false;

            if (currentQuestion < questions.length) {
                document.getElementById("options").innerHTML = "";
                displayQuestion();
            } else {
                nextButtonCreated = true;
                createImg();
            }
        };

        document.getElementById("options").appendChild(nextButton);
    }

}
function createImg(){

    for (let i = 0; i < userAnswers.length; i++) {

        if (i === 1){ //Question two handling
            if (selectedCheckboxes.length === 2) {
                layerTwo(userAnswers[i][0].index, userAnswers[i][1].index);
            } else {
                allOtherLayers(i, userAnswers[i][0].answer, userAnswers[i][0].index);
            }

        } else {
            allOtherLayers(i, userAnswers[i].answer, userAnswers[i].index);
        }

    }
    finalScreen();
}
function layerTwo(indexOne, indexTwo){
    let opt_1 = indexOne + 1; //+1 to match with option number and pictures
    let opt_2 = indexTwo + 1;
    let src1 = "../Image_src/Layer 2 - Colours/Two colours/Colours_" + opt_1 + " + " + opt_2 + ".png";
    let src2 = "../Image_src/Layer 2 - Colours/Two colours/Colours_" + opt_2 + " + " + opt_1 + ".png";

    let temp = [];
    if (imageExists(src1)) {
        temp.push(src1);
    } else if (imageExists(src2)) {
        temp.push(src2);
    } else {
        console.error("Image not found: " + src1 + " and " + src2);
    }

    images.push({src: temp, layer: "2", order: 3});

}
function allOtherLayers(question, answer, index){

    switch(question){
        case 0:
            images.push({src: "../Image_src/Layer 1 - Backgrounds/" + answer + ".png", layer: 1, order: 2});
            break;
        case 1:
            images.push({src: "../Image_src/Layer 2 - Colours/Single colours/Colours_" + answer + ".png", layer: 2, order: 3});
            break;
        case 2:
            if (index === 0){
                images.push({src: "../Image_src/Layer 3 - Glows/Glows_warm.png", layer: 3, order: 4});
            }
            if (index === 2) {
                images.push({src: "../Image_src/Layer 3 - Glows/Glows_cold.png", layer: 3, order: 4});
            }
            break;
        case 3:
            images.push({src: "../Image_src/Layer 4 - Face Shapes/" + answer + ".png", layer: 5, order: 1});
            break;
        case 4:
            images.push({src: "../Image_src/Layer 5 - Eyes/" + answer + ".png", layer: 5, order: 5});
            break;
        case 5:
            images.push({src: "../Image_src/Layer 6 - Mouths/" + answer + ".png", layer: 6, order: 6});
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
function displayImg(){

    images.sort((a, b) => {
        return a.order - b.order;
    });


    for (let i = 0; i < images.length; i++) {
        const imgDisplay = document.createElement("img");
        imgDisplay.src = images[i].src;
        imgDisplay.style.zIndex = images[i].layer;
        imgDisplay.className = "imgDisplay";
        imgDisplay.style.transform = `translate(${i * 20}px, ${i * 20}px)`;

        setTimeout(() => {
            imgDisplay.style.opacity = "1";
            imgDisplay.style.transform = "translate(0, 0)";
        }, i * 800);

        document.getElementById("img").appendChild(imgDisplay);
    }

    snipItButtonCreated = true;
}
function sneakyImg(){

    document.getElementById("img").innerHTML = "";

    images.sort((a, b) => {
        return a.layer - b.layer;
    });

    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 640;


    for (let i = 0; i < images.length; i++){
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = images[i].src;

        image.onload = function() {
            ctx.drawImage(image, 0, 0);
        };

        document.getElementById("img").appendChild(canvas);
    }

    snipImage();

}
function saveImage() {

    const canvas = document.querySelector("canvas");
    const dataURL = canvas.toDataURL();

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "IntrusiveInnerVoice.png";
    link.click();
}
function snipImage(){

    if(snipItButtonCreated){
        const snipIt = document.createElement("button");
        snipIt.innerHTML = "Snip It!"
        snipIt.onclick = function() {
            saveImage();
        };

        document.getElementById("button").appendChild(snipIt);
    }

}
function highlight(){
    for(let i = 0; i < userAnswers.length; i++){

        if(i === 1){
            if(selectedCheckboxes.length === 2){
                let opt1Index = userAnswers[i][0].index;
                let opt2Index = userAnswers[i][1].index;
                const getText1 = document.getElementById(i + "." + opt1Index);
                const getText2 = document.getElementById(i + "." + opt2Index);
                highlightText(getText1);
                highlightText(getText2);
            }else{
                let optOne = userAnswers[i][0].index;
                const getText = document.getElementById(i + "." + optOne);
                highlightText(getText);
            }

        }else{
            let optionIndex = userAnswers[i].index;
            const getText = document.getElementById(i + "." + optionIndex);
            highlightText(getText);
        }

    }
}
function highlightText(highlight){

    highlight.style.fontStyle = "italic";
    highlight.style.textDecorationLine = "underline";
    highlight.style.textDecorationColor = "black";

}
function finalScreen(){
    document.getElementById("question").innerHTML = "Quiz complete!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("options").innerHTML = "Your answers: " + displayAnswers.join(", ");
    displayImg();
    highlight();
    setTimeout(sneakyImg, 7000);

}

window.onload =  displayQuestion;
