
import * as imageBuilder from './ImageBuilder.js';

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

let userAnswers = [];
let q2Flag = 1;
let ansIndexCount = 0;
let currentQuestion = 0;
let nextButtonCreated = false;
let uuidIdentifier = create_UUID();

function create_UUID(){
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

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

    optionsContainer.onclick = function(event) {
        const selectedOption = event.target.value;
        const optionIndex = questions[currentQuestion].options.indexOf(selectedOption);

        if (event.target.type === "radio") {
            if (selectedOption) {
                userAnswers[ansIndexCount] = {p_ID: uuidIdentifier, q_index: currentQuestion + 1, a_index: optionIndex + 1, answer: selectedOption};
                nextQuestion();
            }
        }else if (event.target.type === "checkbox") {
            const selected = optionsContainer.querySelectorAll("input[type=checkbox]:checked");

            if (selected.length <= 2){
                q2Flag = selected.length;
                if (event.target.checked) {

                    userAnswers.push({p_ID: uuidIdentifier, q_index: currentQuestion + 1, a_index: optionIndex + 1, answer: selectedOption});

                } else if (!event.target.checked) {
                    const indexToRemove = userAnswers.findIndex(
                        option => option.answer === selectedOption
                    );
                    userAnswers.splice(indexToRemove, 1);
                }

            } else {
                event.target.checked = false;
            }

            ansIndexCount = q2Flag; //Make sure the index continues relative to the # of options selected
            nextQuestion();

        }
    };
}

function nextQuestion() {

    if(!nextButtonCreated){
        const nextButton = document.createElement("button");
        nextButton.className = "Button";
        nextButton.innerHTML = (currentQuestion === questions.length - 1) ? "Finish" : "Next";
        nextButtonCreated = true;
        nextButton.onclick = function() {

            if (currentQuestion < questions.length - 1 && (q2Flag !== 0) ) {

                document.getElementById("options").innerHTML = "";
                currentQuestion++;
                ansIndexCount++;
                nextButtonCreated = false;
                displayQuestion();

            } else if (q2Flag === 0){
                nextButtonCreated = true;
                console.log("Please select an option")
            } else {
                nextButtonCreated = true;
                createImg();
            }
        };

        document.getElementById("options").appendChild(nextButton);
    }

}

function createImg(){

    imageBuilder.clear();

    for (let i = 0; i < userAnswers.length; i++) {

        if (i === 1 && q2Flag === 2){ //Question two handling
            imageBuilder.layerTwo(userAnswers[i].a_index, userAnswers[i+1].a_index);
            i++;
        } else {
            imageBuilder.allOtherLayers(userAnswers[i].q_index - 1, userAnswers[i].answer, userAnswers[i].a_index - 1);
        }

    }

    finalScreen();
}

function displayImg(){

    const images = imageBuilder.getImages();

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

}

function highlight() {

    for (let i = 0; i < userAnswers.length; i++) {

        let questionIndex = userAnswers[i].q_index - 1;

        if (i === 1 && q2Flag === 2) {

            let opt1Index = userAnswers[i].a_index - 1;
            let opt2Index = userAnswers[i + 1].a_index - 1;
            let getText1 = document.getElementById(questionIndex + "." + opt1Index);
            let getText2 = document.getElementById(questionIndex + "." + opt2Index);
            highlightText(getText1);
            highlightText(getText2);
            i++;

        } else {
            let optionIndex = userAnswers[i].a_index - 1;
            const getText = document.getElementById(questionIndex + "." + optionIndex);
            highlightText(getText);
        }

    }
}

function highlightText(highlight){

    highlight.style.fontStyle = "italic";
    highlight.style.textDecorationLine = "underline";
    highlight.style.textDecorationColor = "black";

}

function submitQuiz() {

    const disclaimer = document.getElementById("disclaimer");
    const submitBtn = document.getElementById("submitButton");
    disclaimer.style.display = "block";
    submitBtn.style.display = "block";

    submitBtn.addEventListener("click", function () {
        // Send databaseAns to PHP script

        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "../initializeController.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("databaseAns=" + JSON.stringify(userAnswers));
        submitBtn.style.display = "none";
        disclaimer.style.display = "none";
        document.getElementById("finalText").style.display = "block";
    });

}
function finalScreen(){
    document.getElementById("question").innerHTML = "Quiz complete!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("options").innerHTML = "Your answers: " + userAnswers.map(option => option.answer).join(", ");
    displayImg();
    highlight();
    setTimeout(submitQuiz, 7000);

}

window.onload =  displayQuestion;


