const canvas = document.getElementById("CanvasMain");
const ctx = canvas.getContext("2d");

mouse = false;
canvas.canva;

Pre = document.getElementById("preview");

colorPicker = document.querySelector("#ColorSelector");
sizePicker = document.getElementById("sizeSelector")
size = sizePicker.value; //Determines size of brush
bounding = canvas.getBoundingClientRect();
colorPicker.value = "#000000";
var color;
var x;
var y;
//Tried to use array, then JS broke.
var x1;
var y1;
var lineRec;
dragListener = null


function drawCircle(x, y) { //Draw circle at x and y coords.
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}
function drawLine(x0,y0,x1,y1){
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);
    ctx.lineWidth = size*2;
    ctx.strokeStyle = color;
    ctx.stroke();
    //console.warn("Linedraw");
    //console.warn(x0+" "+y0+","+x1+" "+y1);
}


function drawEvent(event, x, y){ 
    
    drawCircle(x, y, 5);
}
function initiate(event){
    bounding = canvas.getBoundingClientRect();
    x = event.clientX - bounding.left;
    y = event.clientY - bounding.top;
    x1 = x;//Value is reset when mouse press is initiated.
    y1 = y;


    mouse = true;
    drawEvent(event,x ,y);
    //Continues if mouse is held and dragged
    dragListener = canvas.addEventListener("mousemove",(event) => {
        //x1 = x;
        //y1 = y;
        if (mouse == true) {
            bounding = canvas.getBoundingClientRect();
            x = event.clientX - bounding.left;
            y = event.clientY - bounding.top;
            drawEvent(event,x ,y);
            drawLine(x1,y1,x, y);
            x1 = x;
            y1 = y;

        }
    });
}

function release(event) {
    removeEventListener(dragListener,event);//Deletes event listener when necessary.
    mouse = false;
    InterID = null;
}
function update(){
    size = sizePicker.value;
    color = colorPicker.value;
    Pre.style.width = size*2;
    Pre.style.height = size*2;
    Pre.style.background = colorPicker.value;
}
function clearCanvas(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill(); 
    ctx.fillStyle = "black";//Resets color to black incase the color was not changed.
}


reset = document.getElementById("reset");

reset.addEventListener("mouseup",clearCanvas);
colorPicker.addEventListener("input",update);
sizePicker.addEventListener("input",update);
canvas.addEventListener("mousedown",initiate);
canvas.addEventListener("mouseup",release);
canvas.addEventListener("mouseout",release);