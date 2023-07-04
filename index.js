var heading = document.querySelector(".titlehead");
var pencilcolor = document.querySelector(".pencilcolor");
var pensize = document.getElementById("pensize");
var pensizevalue = document.getElementById("pensize").value;

pensize.addEventListener("click", ()=>{
    pensizevalue = pensize.value;
})
pensize.addEventListener("input", ()=>{
    pensizevalue = pensize.value;
})

var pencolor = document.getElementById("pencolor");
var pencolorvalue = document.getElementById("pencolor").value;

pencolor.addEventListener("click", ()=>{
    pencolorvalue = pencolor.value;
})
pencolor.addEventListener("input", ()=>{
    pencolorvalue = pencolor.value;
})

var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;
canvas.style.margin = (window.innerWidth - canvas.width)/2+"px " + (window.innerHeight-canvas.height)/2 + "px";
var context = canvas.getContext('2d');

var buttons = document.querySelectorAll(".button--");
var state = "pencil";
var isDrawingOnCanvas = false, x = 0, y = 0;;

buttons[0].addEventListener("click", ()=>{
    state = "pencil";
    pencilcolor.classList.remove("d-none");
    heading.innerHTML = "Pencil";
})


buttons[1].addEventListener("click", ()=>{
    state = "eraser";
    pencilcolor.classList.add("d-none");
    heading.innerHTML = "Eraser";
})

buttons[2].addEventListener("click", () => {
    var anchor = document.createElement("a");
    var newCanvas = document.createElement("canvas");
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    
    var newContext = newCanvas.getContext("2d");
    newContext.fillStyle = "white";
    newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);
    newContext.drawImage(canvas, 0, 0);
  
    anchor.href = newCanvas.toDataURL();
    anchor.download = "download.png";
    anchor.click();
});

function hexToRgb(hex) {
    let x = [];
    hex = hex.replace('#', '')
    if (hex.length != 6) {
        hex = modifyHex(hex)
    }
    x.push(parseInt(hex.slice(0, 2), 16))
    x.push(parseInt(hex.slice(2, 4), 16))
    x.push(parseInt(hex.slice(4, 6), 16))
    return "rgb(" + x.toString() + ")";
}
  

function brushStyle() {
    context.fillStyle = "black";
    context.lineCap = "round";
    context.shadowColor = "rgba(0, 0, 0, 0)";
    context.lineJoin = "miter";
    context.shadowBlur = 0;
    context.lineWidth = pensizevalue;
    context.strokeStyle = hexToRgb(pencolorvalue);
}

document.addEventListener("mousedown", (e) => {
    if(state == "pencil"){
        x = e.layerX - canvas.offsetLeft;
        y = e.layerY - canvas.offsetTop;
        context.globalCompositeOperation = "source-over";
        brushStyle();
    }
    if(state == "eraser"){
        x = e.layerX - canvas.offsetLeft;
        y = e.layerY - canvas.offsetTop;
        context.globalCompositeOperation="destination-out";
        context.lineWidth = 3;
        context.lineWidth = pensizevalue;
    }
    isDrawingOnCanvas = true;
});

canvas.addEventListener("mouseleave", () => {
    isDrawingOnCanvas = false;
});

canvas.addEventListener("mousemove", (e) => {
    if (isDrawingOnCanvas && state == "pencil") {
        context.beginPath();
        context.moveTo(x, y);
        x = e.layerX - canvas.offsetLeft;
        y = e.layerY - canvas.offsetTop;
        context.lineWidth = pensizevalue;
        context.lineTo(x, y);
        context.stroke();
    } 
    if (isDrawingOnCanvas && state == "eraser"){
        context.beginPath();
        context.moveTo(x,y);
        x = e.layerX - canvas.offsetLeft;
        y = e.layerY - canvas.offsetTop;
        context.lineWidth = pensizevalue;
        context.lineTo(x,y);
        context.stroke(); 
    }
});

document.addEventListener("mouseup", () => {
    isDrawingOnCanvas = false;
});
