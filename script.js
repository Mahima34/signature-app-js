const colorPicker = document.getElementById('colorPicker');
const canvasColor = document.getElementById('canvasColor');
const canvas = document.getElementById('myCanvas');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const fontPicker = document.getElementById('fontPicker');
const ctx = canvas.getContext('2d');
const retrieveButton = document.getElementById('retrieveButton');

colorPicker.addEventListener('change',(e)=>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})
canvas.addEventListener('mousedown',(e)=>{
    isDrawing = true;
    lastX = Event.offsetX;
    lastY = Event.offsetY;
})
canvas.addEventListener('mousemove',(e)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(Event.offsetX, Event.offsetY);
        ctx.stroke();

        lastX = Event.offsetX;
        lastY = Event.offsetY;
    }
})

canvas.addEventListener('mouseup',() =>{
    isDrawing = false;
})

canvasColor.addEventListener('change',(e)=>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,500)
})

fontPicker.addEventListener('change',(e)=>{
    ctx.linewidth = e.target.value
})

clearButton.addEventListener('click',(e)=>{
    ctx.clearRect(0,0,canvas.clientWidth,canvas.height)
})

saveButton.addEventListener('click',(e)=>{
    localStorage.setItem('canvasContents',canvas.toDataURL());

    let link = document.createElement('a');

    link.download = 'my-canvas.png';

    link.href = canvas.toDataURL();

    link.click();
})

retrieveButton.addEventListener('click', ()=>{
    let savedCanvas = localStorage.getItem('canvasContents');

    if(savedCanvas){
        let img = Image();
        img.src = savedCanvas;
        ctx.drawImage(img,0,0)
    }
})

