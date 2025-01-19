// canvas setup
const canvas = document.querySelector(".gardenCanvas");
const ctx = canvas.getContext("2d");
let width = (window.innerWidth);
canvas.width = width;
let height = (window.innerHeight);
canvas.height = height;

//button setup
const clearButton = document.querySelector("#clear_garden");
const undoButton = document.querySelector("#undo_garden");

//clicked plants
let planted = [];

//mouse tracking
let curX;
let curY;
let on = true;

//current plant tracker
let curColour;
let curType;

//constants
const colour_green = "rgb(76, 153 , 0)";
let scaler = 1;
const leaves_rotate = 30;

//tree initializing
const tree_flowers_X = random_60();
const tree_flowers_Y = random_60();

//load canvas
draw();

//mouse position adjuster
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

//mouse tracker
document.addEventListener('mousemove', e => {
    var pos = getMousePos(canvas, e);
    curX = pos.x;
    curY = pos.y;
    document.getElementById("p1").innerHTML = "coords: (" + curX + ", " + curY + ")";
});


clearButton.addEventListener("click", () => {
    planted = [];
    clear();
});

undoButton.addEventListener("click", () => {
    planted.pop();
    draw();
});

canvas.addEventListener("click", () => {
    addPlant();
    draw()
});

canvas.addEventListener("mouseout", () => {
    on = false;
    draw();
})

canvas.addEventListener("mouseover", () => {
    on = true;
})

//clear canvas
function clear() {
    ctx.fillStyle = "rgb(136 193 45)";
    ctx.fillRect(0, 0, width, height);
}

function draw_given_plant(x, y, colour, type) {
    if (type == "shrubs") {
        make_shrubs(x, y, colour);
    } else if (type == "trees") {
        make_trees(x, y, colour);
    } else if (type == "vines") {
        make_vines(x, y, colour);
    } else {
        make_perennials(x, y, colour);
    }
}

function addPlant() {
    let plant = {
        x : curX,
        y : curY,
        type: get_random_type(),
        colour : "rgb("+ (255*Math.random()) + ","+ (255*Math.random()) + ","+ (255*Math.random())+")"
    };
    planted.push(plant);
}

function draw() {
        clear();
      
      let fLen = planted.length; 
      for (let i = 0; i < fLen; i++) {
        draw_given_plant(planted[i].x, planted[i].y, planted[i].colour, planted[i].type);
      }

      if(on) {
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.beginPath();
        ctx.arc(curX, curY, 30, degToRad(0), degToRad(360), false);
        ctx.fill();
      }
}

function create_petals(x, y, scale, rotation, colour) {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.ellipse(x, y, scale*7, scale*20, degToRad(340+rotation), degToRad(0), degToRad(360));
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x, y, scale*7, scale*20, degToRad(220+rotation), degToRad(0), degToRad(360));
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x, y, scale*7, scale*20, degToRad(100+rotation), degToRad(0), degToRad(360));
    ctx.fill();
}

function create_flower(x, y, scale, colour) {
    create_petals(x, y, 0.9*scale, leaves_rotate, colour_green)
    create_petals(x, y, scale, 0, colour);
    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 255, 0)";
    ctx.arc(x, y, scale*4, 0 , degToRad(360), false);
    ctx.fill();
}

function make_vines(x, y, colour) {
    ctx.fillStyle = colour_green;
    for(let i = 0; i<10; i++) {
        ctx.beginPath();
        ctx.ellipse(x, y, 7*scaler, 10*i*scaler, degToRad(18*i+90), degToRad(0), degToRad(360));
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x, y, 7*scaler, 10*i*scaler, degToRad(18*i+99), degToRad(0), degToRad(360));
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x, y, 7*scaler, 10*i*scaler, degToRad(-18*i-90), degToRad(0), degToRad(360));
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x, y, 7*scaler, 10*i*scaler, degToRad(-18*i - 99), degToRad(0), degToRad(360));
        ctx.fill();
    }
    ctx.beginPath();
    ctx.ellipse(x, y, 7*scaler, 100*scaler, degToRad(90), degToRad(0), degToRad(360));
    ctx.fill();

    create_flower(x+6*scaler, y-20*scaler,0.3, colour);
    create_flower(x, y,0.3, colour);
    create_flower(x+20*scaler, y,0.3, colour);
    create_flower(x-30*scaler, y+11*scaler,0.3, colour);
    create_flower(x-25*scaler, y-30*scaler,0.3, colour);
    create_flower(x-2*scaler, y+16*scaler,0.3, colour);
    create_flower(x-20*scaler, y-5*scaler,0.3, colour);
    create_flower(x-50*scaler, y-10*scaler,0.3, colour);
    create_flower(x+45*scaler, y+15*scaler,0.3, colour);
    create_flower(x+38*scaler, y-17*scaler,0.3, colour);
    create_flower(x+35*scaler, y+24*scaler,0.3, colour);
    create_flower(x+17*scaler, y+24*scaler,0.3, colour);
    create_flower(x-12*scaler, y+30*scaler,0.3, colour);
    create_flower(x-39*scaler, y+35*scaler,0.3, colour);

    create_flower(x-60*scaler, y+30*scaler,0.3, colour);
    create_flower(x-77*scaler, y+5*scaler,0.3, colour);
    create_flower(x+63*scaler, y+25*scaler,0.3, colour);
    create_flower(x+70*scaler, y-20*scaler,0.3, colour);
    create_flower(x+20*scaler, y-45*scaler,0.3, colour);
}

function make_perennials(x, y, colour) {
    create_flower(x, y, 1, colour);
    create_flower(x+15*scaler, y -25*scaler, 0.7, colour);
    create_flower(x - 10*scaler, y - 30*scaler, 0.3, colour);
    create_flower(x + 30*scaler, y -8*scaler, 0.3, colour);
}

function make_shrubs(x, y, colour) {
    create_petals(x, y, 3, 0, colour_green);
    create_petals(x,y, 3, leaves_rotate, colour_green);
    create_flower((x+20*scaler),(y+30*scaler), 0.3, colour);
    create_flower((x-20*scaler),(y+20*scaler), 0.3, colour);
    create_flower((x+28*scaler),(y-30*scaler), 0.3, colour);
    create_flower((x+4*scaler),(y-6*scaler), 0.3, colour);
    create_flower((x-35*scaler),(y-33*scaler), 0.3, colour);
    create_flower((x-3*scaler),(y-2*scaler), 0.3, colour);
    create_flower((x),(y-30*scaler), 0.3, colour);
    create_flower((x+24*scaler),(y), 0.3, colour);
    create_flower((x-4*scaler),(y+38*scaler), 0.3, colour);
    create_flower((x-2*scaler),(y+12*scaler), 0.3, colour);
    create_flower((x+40*scaler),(y+6*scaler), 0.3, colour);
    create_flower((x-40*scaler),(y+12*scaler), 0.3, colour);
    create_flower((x-20*scaler),(y-13*scaler), 0.3, colour);
    create_flower((x-17*scaler),(y-38*scaler), 0.3, colour);
    create_flower((x+3*scaler),(y-43*scaler), 0.3, colour);
    create_flower((x+15*scaler),(y-15*scaler), 0.3, colour);
    create_flower((x+13*scaler),(y+10*scaler), 0.3, colour);
}

function make_trees(x, y, colour) {
    create_petals(x, y, 6*scaler, 0, "rgb(158, 266, 49)");
    create_petals(x, y, 6*scaler, 15, "rgb(128, 255, 0)");
    create_petals(x, y, 6.3*scaler, 30, "rgb(128, 255, 0)");
    create_petals(x, y, 6*scaler, 45, "rgb(128, 255, 0)");
    
    create_petals(x, y, 5*scaler, 0, "rgb(102, 204, 0)");
    create_petals(x, y, 5.5*scaler, 15, "rgb(102, 204, 0)");
    create_petals(x, y, 4.5*scaler, 30, "rgb(102, 204, 0)");
    create_petals(x, y, 5*scaler, 45, "rgb(102, 204, 0)");

    create_petals(x, y, 3*scaler, 0, colour_green);
    create_petals(x, y, 3*scaler, 15, colour_green);
    create_petals(x, y, 2*scaler, 30, colour_green);
    create_petals(x, y, 3*scaler, 45, colour_green);
    for(let i = 0; i < 60; i++) {
        create_flower(x+tree_flowers_X[i], y+(tree_flowers_Y[i]), 0.3, colour);
    }
}

function random_60() {
    let arr = [];
    for(let i = 0; i < 60; i++) {
        arr.push((170*(Math.random() - 0.5))*scaler);
    }
    return arr;
}

function degToRad(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function make_random_colour() {
    return ("rgb(" + (255*Math.random()) + ","+ (255*Math.random()) + ","+ (255*Math.random()) + ")");
}

function get_random_type() {
    let number = Math.random();
    if (number < 0.25) {
        return "shrubs";
    } else if (number < 0.5) {
        return "trees";
    } else if (number < 0.75) {
        return "vines";
    }
    return "perennials";
}