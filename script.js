const canvas = document.querySelector(".gardenCanvas");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
canvas.width = width;
let height = window.innerHeight;
canvas.height = height;

const clearButton = document.querySelector("#clear_garden");
const undoButton = document.querySelector("#undo_garden");

let planted = [];
let curX;
let curY;


// update mouse pointer coordinates
// lol testing
document.addEventListener("mousemove", (e) => {
    curX = e.pageX;
    curY = e.pageY;
});


clearButton.addEventListener("click", () => {
    planted = [];
    clear();
});

undoButton.addEventListener("click", () => {
    
});

canvas.addEventListener("click", () => {
    addPlant();
    draw()
});

canvas.addEventListener("mouseover", () => {
    draw();
})

function clear() {
    ctx.fillStyle = "rgb(0 0 0)";
    ctx.fillRect(0, 0, width, height);
}

function draw() {
        clear();
      
      let fLen = planted.length; 
      for (let i = 0; i < fLen; i++) {
        ctx.fillStyle = planted[i].colour;
        ctx.beginPath();
        ctx.arc(planted[i].x, planted[i].y, 30, degToRad(0), degToRad(360), false);
        ctx.fill();
      }

      ctx.fillStyle = "rgb(255,255,255)";
      ctx.beginPath();
      ctx.arc(curX, curY, 30, degToRad(0), degToRad(360), false);
      ctx.fill();
  }

function addPlant() {
    plant = {
        x : curX,
        y : curY,
        colour : "rgb("+ (255*Math.random()) + ","+ (255*Math.random()) + ","+ (255*Math.random())+")"
    };
    planted.push(plant);
}

document.addEventListener('mousemove', e => {
    curX = e.clientX;
    curY = e.clientY;
    document.getElementById("p1").innerHTML = "coords: (" + curX + ", " + curY + ")";
  });

function degToRad(degrees) {
    return (degrees * Math.PI) / 180;
  }