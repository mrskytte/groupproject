//Define elements
const cupboard = document.querySelector("#cupboard")
const stone = document.querySelector("#stone")
const dustbin = document.querySelector("#dustbin")
const scene4txt = document.querySelector("#scene4txt")
const scene4BT = document.querySelector("#scene4BT")
const goScene5 = document.querySelector("#goscene5")
var phoneSound;
var BTsound;
var scene4BGSound;



//Add key listeners
cupboard.addEventListener("click", clickCupboard)
stone.addEventListener("click", clickStone)
dustbin.addEventListener("click", clickDustbin)
scene4txt.addEventListener("click", clickScenetxt)
scene4BT.addEventListener("click", clickBT)
window.addEventListener("click", startSound)
//goScene5.addEventListener("click", clickNextBtn)

//Add BG audio function
function BGsound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("loop", "true")
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

//Add audio function
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}
//Add counters for clickables
var cupboardClick = 0;
var stoneClick = 0;
var dustbinClick = 0;
var BGsoundclick = 0;
var enableClick = 0;


//Add counter for phone to ring
var globalClick = 0;

//Background Audio
function startSound() {
    if (BGsoundclick != 0) {

    } else {
        scene4BGSound = new BGsound("audio/bg_sound.mp3");
        scene4BGSound.play();
        BGsoundclick++;
    }
}

//Click BT to show text and play BT audio and lowers BG audio
function clickBT() {
    scene4txt.classList.remove("hide");
    document.querySelector("audio").volume = 0.4;
    BTsound = new sound("audio/bt_voice.mp3");
    BTsound.play()
    scene4BT.removeEventListener("click", clickBT)
}

//Click text to hide text and BT plus play ambient audio - plus initiate clickability of other objects
function clickScenetxt() {
    BTsound.stop()
    document.querySelector("audio").volume = 1;
    scene4txt.classList.add("fadetxt");
    scene4BT.classList.add("fadeBT");
    enableClick++;
    dustbin.classList.add("glow")
    stone.classList.add("glow")
    cupboard.classList.add("glow")
    scene4txt.removeEventListener("click", clickScenetxt)
}

//Click dustbin adds to individual counter plus phone counter - can only be clicked once
function clickDustbin() {
    if (enableClick == 0) {

    } else if (dustbinClick != 0) {

    } else {
        dustbinClick++;
        globalClick++;
        dustbin.classList.remove("glow");
    }

}


//Click cupboard adds to individual counter plus phone counter - can only be clicked once
function clickCupboard() {
    if (enableClick == 0) {

    } else if (cupboardClick != 0) {

    } else {
        cupboardClick++;
        globalClick++;
        cupboard.classList.remove("glow");
    }

}

//Click stone adds to individual counter plus phone counter - can only be clicked once
function clickStone() {
    if (enableClick == 0) {

    } else if (stoneClick != 0) {

    } else {
        stoneClick++;
        globalClick++;
        stone.classList.remove("glow");
    }
}

//Phone rings when counter is at 3
var phoneCheck = setInterval(function() {
    if(globalClick >= 3){
        phoneSound = new sound("audio/scene_5_telephone.mp3")
        phoneSound.play();
        clearInterval(phoneCheck);
    } else {
        console.log("No ring")
    }
}, 1000)


//Next button appears
