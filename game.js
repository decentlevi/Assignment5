/* <summary>Create the canvas</summary>*/

var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 650;
canvas.blur = 2;
canvas.style.border = "10px solid MidnightBlue";




var ctx = canvas.getContext('2d');
var timer = 0;
var bCatch = false;
var fps = 10;

// // var canvas = document.getElementById('canvas');
// // var image = new Image();
//     image.src = 'images/bg2.jpg';
//     // image.onload = function () {
//         // var canvasContext = canvas.getContext('2d');
//         var ctx = image.width / image.height;
//         var newWidth = canvas.width;
//         var newHeight = newWidth / ctx;
//         if (newHeight > canvas.height) {
//                     newHeight = canvas.height;
//             newWidth = newHeight * ctx;
//         }

//         canvasContext.drawImage(image,0,0, newWidth , newHeight);
    


/* <summary>Background image</summary>*/
var bgStart = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgStart = true;
};
bgImage.src = "images/bg2.jpg";



/* <summary>Lady Bug image</summary>*/
var bugStart = false;
var bugImage = new Image();
bugImage.onload = function () {
    bugStart = true;
};
bugImage.src = "images/bug.png";

var bug = {};
var bugCatch = 0;
// <summary>When bug is bCatch, reset </summary>
var reset = function () {
    bug.x = 40 + (Math.random() * (canvas.width - 70));
    do {
        bug.y = 40 + (Math.random() * (canvas.height - 70));
    }
    while (bug.y < 100)
};

//<summery>mousedown event</summary>
window.addEventListener("mousedown", onMouseDown, false);
function onMouseDown(e) {

    if (e.button != 0) return;

    mouseXinCanvas = e.clientX;
    mouseYinCanvas = e.clientY;

    if (bugBody(bug, mouseXinCanvas, mouseYinCanvas)) {
        bCatch = true;
        clearInterval(timer);
        timer = setInterval(reset, 20000 / fps);
        reset();
    }
    if (ResetScore(mouseXinCanvas, mouseYinCanvas)) {
        location.reload();
    }
    if (ResetSpeed(mouseXinCanvas, mouseYinCanvas)) {
        clearInterval(timer);
        timer = setInterval(reset, 20000 / fps);
        reset();
        render();
    }
};

//<summary>bug's body define</summary>
function bugBody(bug, x, y) {

    if (x <= (bug.x + 80)
        && bug.x <= (x + 80)
        && y <= (bug.y + 80)
        && bug.y <= (y + 80)
    ) {
        fps = fps + 5;
        bugCatch++;
        return true;
    }
    return false;
};

//<summary> Reset Score box </summary>
function ResetScore(x, y) {

    if (x > (305)
        && x < (545)
        && y > (15)
        && y < (85)
    ) {
        return true;
    }
    return false;
};

//<summary> Reset speed box </summary>
function ResetSpeed(x, y) {
    if (x > (605)
        && x < (845)
        && y > (15)
        && y < (85)
    ) {
        fps = 10;
        return true;
    }
    return false;
};

// <summary> Draw everything </summary>
var render = function () {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    if (bgStart) {
        ctx.drawImage(bgImage, 0, 100);
    }
    if (bugStart) {
        ctx.drawImage(bugImage, bug.x, bug.y);
    }
    if (bCatch == true) {
        if (bgStart) {
            ctx.drawImage(bgImage, 0, 100);
        }
        bCatch = false;
    }

    // <summary> Score, Title </summary>
    ctx.fillStyle = "rgb(227, 199, 13)";
    ctx.font = "35px Bradley";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Bug Smasher", 25, 40);
    ctx.font = "20px Calibri";
    ctx.fillText("Score: " + bugCatch, 120, 10);



    // <summary> Reset Score, Speed button </summary>
    ctx.fillStyle = "rgb(227, 199, 13)";
    ctx.fillRect(320, 18, 200, 61);
    ctx.fillRect(560, 18, 200, 61);
    ctx.fillStyle = "rgb(30, 136, 168)";
    ctx.fillRect(325, 21, 190, 54);
    ctx.fillRect(565, 21, 190, 54);
    ctx.fillStyle = "rgb(900, 900, 900)";
    ctx.font = "28px Bradley";
    ctx.fillText("Reset Score", 350, 34);
    ctx.fillText("Reset Speed", 590, 34);

};

// <summary> Game loop </summary>
var main = function () {
    render();
    requestAnimationFrame(main);
};

// <summary> Cross-browser support for requestAnimationFrame </summary>
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
// <summary>start the game!</summary>
reset();
main();