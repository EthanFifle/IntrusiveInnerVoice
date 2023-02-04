
const questions = [
    {//1
        question: "1. What word best describes the tone of the voice?", //Material for face
        options: ["soft", "bright", "sad", "mellow","angry", "rough", "uptight", "smooth", "flat", "sharp"],
        inputType: "radio"
    },
    {//2
        question: "2. When this voice appears, what are your feelings towards it? You can choose up to two feelings", //Colour
        options: ["detached", "dependant", "tranquil", "disgust", "authoritative", "curious", "calm", "angry", "optimistic", "joy", "trusting", "loyal"],
        inputType: "checkbox"
    },
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
        options: ["happy ", "sad", "neutral", "angry","scared", "anxious", "manipulative", "jealous"],
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
let currentQuestion = 0;
let nextButtonCreated = false;

function displayQuestion() {

    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("options");

    questionContainer.innerHTML = questions[currentQuestion].question;
    optionsContainer.innerHTML = questions[currentQuestion].options
        .map(
            (option, index) => {
                let inputType = questions[currentQuestion].inputType === "checkbox" ? "checkbox" : "radio";
                return `<label id="label-${index}" class="option-label">
                        <input type="${inputType}" name="answer" value="${option}">${option}
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

        if (event.target.type === "radio") {
            userAnswers[currentQuestion] = selectedOption;
            nextQuestion();
            allOtherLayers(currentQuestion, selectedOption, questions[currentQuestion].options.indexOf(selectedOption));
        }else if (event.target.type === "checkbox") {
            const selectedCheckboxes = optionsContainer.querySelectorAll("input[type=checkbox]:checked");
            let subArray = [];
            let combo = [];

            if (selectedCheckboxes.length <= 2) {
                nextQuestion();

                if (selectedCheckboxes.length === 1) {
                    userAnswers[currentQuestion] = selectedOption;
                    allOtherLayers(currentQuestion, selectedOption, questions[currentQuestion].options.indexOf(selectedOption));
                } else {
                    selectedCheckboxes.forEach(checkbox => {
                        subArray.push(checkbox.value);
                        combo.push(questions[currentQuestion].options.indexOf(checkbox.value));
                    });
                    userAnswers[currentQuestion] = subArray.join(", ");
                    layerTwo(combo);
                }


            } else {
                event.target.checked = false;
            }
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
                finalScreen();
            }
        };

        document.getElementById("options").appendChild(nextButton);
    }

}

function layerTwo(comboArray){
    let opt_1 = comboArray[0] + 1; //+1 to match with option number and pictures
    let opt_2 = comboArray[1] + 1;

    let src1 = "Layer 2 - Colours/Two colours/Colours_" + opt_1 + " + " + opt_2 + ".png";
    let src2 = "Layer 2 - Colours/Two colours/Colours_" + opt_2 + " + " + opt_1 + ".png";

    let image = new Image();
    image.src = src1;

    image.onerror = function() {
        image.src = src2;
        image.onerror = function() {
            console.error("Image not found: " + src1 + " and " + src2);
        }
    }

    image.onload = function() {
        images.push({src: image.src});
    }
}
function allOtherLayers(question, answer, index){


    switch(question){
        case 0:
            images.push({src: "Layer 1 - Bagrounds/" + answer + ".png"});
            break;
        case 1:
            images.push({src: "Layer 2 - Colours/Single colours/Colours_" + answer + ".png" });
            break;
        case 2:
            if (index === 0){
                images.push({src: "Layer 3 - Glows/Glows_warm.png" });
            } else {
                images.push({src: "Layer 3 - Glows/Glows_cold.png" });
            }
            break;
        case 3:
            images.push({src: "Layer 4 - Face Shapes/" + answer + ".png" });
            break;
        case 4:
            images.push({src: "Layer 5 - Eyes/" + answer + ".png" });
            break;
        case 5:
            images.push({src: "Layer 6 - Mouths/" + answer + ".png" });
            break;
        default:
    }

}

function displayImg(){

    for(let i=0; i<images.length; i++) {
        const imgDisplay = document.createElement("img");
        imgDisplay.src = images[i].src;
        imgDisplay.style.width = "640px";
        imgDisplay.style.height = "640px";
        imgDisplay.style.position = "absolute";
        imgDisplay.style.transition = "all 2s ease-in-out";
        imgDisplay.style.opacity = "0";

        setTimeout(() => {
            imgDisplay.style.opacity = "1";
        }, i * 1000);

        document.getElementById("img").appendChild(imgDisplay);
    }
}

function finalScreen(){
    displayImg();
    document.getElementById("question").innerHTML = "Quiz complete!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("options").innerHTML = "Your answers: " + userAnswers.join(", ");
}

window.onload = displayQuestion;
