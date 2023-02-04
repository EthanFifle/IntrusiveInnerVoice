
const questions = [
    {//1
        question: "What word best describes the tone of the voice?", //Material for face
        options: ["soft", "bright", "sad", "mellow","angry", "rough", "uptight", "smooth", "flat", "sharp"],
        inputType: "radio"
    },
    {//2
        question: "When this voice appears, what are your feelings towards it? You can choose up to two feelings", //Colour
        options: ["detached", "dependant", "tranquil", "disgust", "authoritative", "curious", "calm", "angry", "optimistic", "joy", "trusting", "loyal"],
        inputType: "checkbox"
    },
    {//3
        question: "How seriously do you take what the voice is telling you? Is it very important or does it have very little meaning?",//Warm or Cool
        options: ["very intrusive", "neutral", "not involved, very hands off"],
        inputType: "radio"
    },
    {//4
        question: "How strict is the voice? 1 is least strict, 7 is extremely strict.", //Shape of head
        options: ["one", "two", "three", "four","five", "six", "seven"],
        inputType: "radio"
    },
    {//5
        question: "What word best describes the mood that your intrusive inner voice is in?", //Eyes
        options: ["happy ", "sad", "neutral", "angry","scared", "anxious", "manipulative", "jealous"],
        inputType: "radio"
    },
    {//6
        question: "How loud is the voice? 1 is quietest, 7 is loudest.",
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
            displayThis(currentQuestion, questions[currentQuestion].options.indexOf(selectedOption));
        }else if (event.target.type === "checkbox") {
            const selectedCheckboxes = optionsContainer.querySelectorAll("input[type=checkbox]:checked");
            let subArray = [];

            if (selectedCheckboxes.length <= 2) {
                nextQuestion();

                if (selectedCheckboxes.length === 1) {
                    userAnswers[currentQuestion] = selectedOption;
                    displayThis(currentQuestion, questions[currentQuestion].options.indexOf(selectedOption));
                } else {
                    selectedCheckboxes.forEach(checkbox => {
                        subArray.push(checkbox.value);
                    });
                    userAnswers[currentQuestion] = subArray;
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

function displayThis(question, answer){

    if (question === 0) {
        switch (answer) {
            case 0:
                images.push({src: "Layer 1 - Bagrounds/soft.png" });
                break;
            case 1:
                images.push({src: "Layer 1 - Bagrounds/bright.png" });
                break;
            case 2:
                images.push({src: "Layer 1 - Bagrounds/sad.png" });
                break;
            case 3:
                images.push({src: "Layer 1 - Bagrounds/mellow.png" });
                break;
            case 4:
                images.push({src: "Layer 1 - Bagrounds/angry.png" });
                break;
            case 5:
                images.push({src: "Layer 1 - Bagrounds/rough.png" });
                break;
            case 6:
                images.push({src: "Layer 1 - Bagrounds/uptight.png" });
                break;
            case 7:
                images.push({src: "Layer 1 - Bagrounds/smooth.png" });
                break;
            case 8:
                images.push({src: "Layer 1 - Bagrounds/flat.png" });
                break;
            case 9:
                images.push({src: "Layer 1 - Bagrounds/sharp.png" });
                break;
            default:
        }
    } else if (question === 1){
        switch(answer){
            case 0:
                images.push({src: "Layer 2 - Colours/Single colours/Colours_detached.png" });
                break;
            case 1:
                images.push({src: "Layer 2 - Colours/Single colours/Colours_dependant.png" });
                break;
            case 2:
                images.push({src: "Layer 2 - Colours/Single colours/Colours_tranquil.png" });
                break;
            case 3:
                images.push({src: "Layer 2 - Colours/Single colours/Colours_disgust.png" });
                break;
            case 4:
                images.push({src: "Layer 2 - Colours/Single colours/Colours_authoritative.png" });
                break;
            case 5:
                images.push({src: "Layer 2 - Colours/Single colours/Colours_curious.png" });
                break;
            case 6:
                images.push({src: "Layer 2 - Colours/Single colours/Colours_calm.png" });
                break;
            case 7:
                images.push({src: "Layer 2 - Colours/Single colours/Colours_angry.png" });
                break;
            case 8:
                images.push({src: "Layer 2 - Colours/Single colours/Colours_optimism.png" });
                break;
            case 9:
                images.push({src: "Layer 2 - Colours/Single colours/Colours_joy.png" });
                break;
            case 10:
                images.push({src: "Layer 2 - Colours/Single colours/Colours_trusting.png" });
                break;
            case 11:
                images.push({src: "Layer 2 - Colours/Single colours/Colours_loyal.png" });
                break;
            default:
        }
    } else if (question === 2){
        switch(answer){
            case 0:
                images.push({src: "Layer 3 - Glows/Glows_warm.png" });
                break;
            case 1:
                images.push({src: "Layer 3 - Glows/Glows_cold.png" });
                break;
            case 2:
                images.push({src: "Layer 3 - Glows/Glows_cold.png" });
                break;
            default:
        }
    } else if (question === 3){
        switch(answer){
            case 0:
                images.push({src: "Layer 4 - Face Shapes/one.png" });
                break;
            case 1:
                images.push({src: "Layer 4 - Face Shapes/two.png" });
                break;
            case 2:
                images.push({src: "Layer 4 - Face Shapes/three.png" });
                break;
            case 3:
                images.push({src: "Layer 4 - Face Shapes/four.png" });
                break;
            case 4:
                images.push({src: "Layer 4 - Face Shapes/five.png" });
                break;
            case 5:
                images.push({src: "Layer 4 - Face Shapes/six.png" });
                break;
            case 6:
                images.push({src: "Layer 4 - Face Shapes/seven.png" });
                break;
            default:
        }
    } else if (question === 4){
        switch(answer){
            case 0:
                images.push({src: "Layer 5 - Eyes/happy.png" });
                break;
            case 1:
                images.push({src: "Layer 5 - Eyes/sad.png" });
                break;
            case 2:
                images.push({src: "Layer 5 - Eyes/neutral.png" });
                break;
            case 3:
                images.push({src: "Layer 5 - Eyes/angry.png" });
                break;
            case 4:
                images.push({src: "Layer 5 - Eyes/scared.png" });
                break;
            case 5:
                images.push({src: "Layer 5 - Eyes/anxious.png" });
                break;
            case 6:
                images.push({src: "Layer 5 - Eyes/manipulative.png" });
                break;
            case 7:
                images.push({src: "Layer 5 - Eyes/jealous.png" });
                break;
            default:
        }
    } else {
        switch(answer){
            case 0:
                images.push({src: "Layer 6 - Mouths/one.png" });
                break;
            case 1:
                images.push({src: "Layer 6 - Mouths/two.png" });
                break;
            case 2:
                images.push({src: "Layer 6 - Mouths/three.png" });
                break;
            case 3:
                images.push({src: "Layer 6 - Mouths/four.png" });
                break;
            case 4:
                images.push({src: "Layer 6 - Mouths/five.png" });
                break;
            case 5:
                images.push({src: "Layer 6 - Mouths/six.png" });
                break;
            case 6:
                images.push({src: "Layer 6 - Mouths/seven.png" });
                displayImg();
                break;
            default:
        }
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
