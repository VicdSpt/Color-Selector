const colorLabels = [...document.querySelectorAll(".input-group label")]  
const colorPickerInputs = [...document.querySelectorAll("input[type='color']")]
const rangeLabelValue = document.querySelector(".orientation-value")

const gradientData = {
    angle: 90,
    colors:["#FF5F6D","#FFC371"]
}

// for 3e colors, you need to add "#89E905" to colors above and add "${gradientData.colors[2]}"

function populateUI(){
    colorLabels[0].textContent = gradientData.colors[0];
    colorLabels[1].textContent = gradientData.colors[1];
    // colorLabels[2].textContent = gradientData.colors[2];

    colorPickerInputs[0].value = gradientData.colors[0];
    colorPickerInputs[1].value = gradientData.colors[1];
    // colorPickerInputs[2].value = gradientData.colors[2];

    colorLabels[0].style.background = gradientData.colors[0];
    colorLabels[1].style.background = gradientData.colors[1];
    // colorLabels[2].style.background = gradientData.colors[2];

    document.body.style.background = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`

    rangeLabelValue.textContent = `${gradientData.angle}°`

    adaptInputsColor()
}
populateUI()

function adaptInputsColor(){
    colorLabels.forEach(label => {
        const hexColor = label.textContent.replace("#", "");
        const red = parseInt(hexColor.slice(0,2), 16)
        const green = parseInt(hexColor.slice(2,4), 16)
        const blue = parseInt(hexColor.slice(4,6), 16)
        const yiq = (red * 299 + green * 587 + blue * 114) / 1000;

        if(yiq >= 128){
            label.style.color = "#111"
        }
        else{
            label.style.color = "#F1F1F1"
        }
    })
}

const rangeInput = document.querySelector(".inp-range")
rangeInput.addEventListener("input", handleInclination)

function handleInclination(){
    gradientData.angle = rangeInput.value;
    rangeLabelValue.textContent = `${gradientData.angle}°`
    populateUI();
}

colorPickerInputs.forEach(input => input.addEventListener("input", colorInputModification))

function colorInputModification(element){
    const currentInput = element.target;
    const currentIndex = colorPickerInputs.indexOf(element.target);

    gradientData.colors[currentIndex] = currentInput.value.toUpperCase();
    populateUI();
}

const copyBtn = document.querySelector(".copy-btn");
copyBtn.addEventListener("click", handleGradientCopy)

let lock = false;
function handleGradientCopy(){

    const gradient = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`
    
    navigator.clipboard.writeText(gradient)

    if(lock) return;
    lock = true;
    copyBtn.classList.add("active")
    setTimeout(() => {
        copyBtn.classList.remove("active")
        lock = false;
    }, 1000)
}

const randomGradientBtn = document.querySelector(".random-btn");
randomGradientBtn.addEventListener("click", createRandomGradient);

function createRandomGradient(){

    for(let i = 0; i < colorLabels.length; i++) {
        randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        gradientData.colors[i] = randomColor.toUpperCase()
    }
    populateUI()
}