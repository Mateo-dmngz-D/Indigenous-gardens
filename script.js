// canvas setup
const canvas = document.querySelector(".gardenCanvas");
const ctx = canvas.getContext("2d");
let width = (window.innerWidth);
canvas.width = width;
let height = (window.innerHeight);
canvas.height = height/2;

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

colour_choices = {
    "Blue": "rgb(0, 150, 255)",
    "Lavender" : "rgb(230, 230, 250)",
    "Lilac": "rgb(210,175,255)",
    "Mauve": "rgb(224, 176, 255)",
    "Orange" : "rgb(242, 140, 40)",
    "Pink": "rgb(255, 182, 193)",
    "Light Purple": "rgb(195, 177, 225)",
    "Purple": "rgb(128, 0, 128)",
    "Red": "rgb(196, 30, 58)",
    "Scarlett": "rgb(255, 36, 0)",
    "Violet":"rgb(127, 0, 255)",
    "White": "rgb(255, 255, 255)",
    "Yellow": "rgb(255, 215, 0)",
    "other": make_random_colour()
};

function addPlant() {
    let plant = {
        x : curX,
        y : curY,
        type: currType,
        colour : colour_choices[currColour]
    };
    planted.push(plant);
}

function draw() {
    clear();
      
    let fLen = planted.length; 
    for (let i = 0; i < fLen; i++) {
    draw_given_plant(planted[i].x, planted[i].y, planted[i].colour, planted[i].type);
    }

    //   if(on) {
    //     ctx.fill
    //   }
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
        return "Shrubs";
    } else if (number < 0.5) {
        return "Trees";
    } else if (number < 0.75) {
        return "Vines";
    }
    return "Perennials";
}

document.addEventListener('DOMContentLoaded', () => {
    displayDebugInfo('DOM fully loaded and parsed');
    populateFilterOptions();
    loadCSVData();
  });
  
  const flowerTypes = ['All', 'biennials', 'perennials', 'shrubs', 'trees'];
  const flowerColors = ['All', 'Red', 'Purple', 'White', 'Mauve', 'Orange', 'Lilac', 'Blue', 'Yellow', 'Lavender', 'Pink', 'Purple', 'Scarlett', 'Violet'];
  const bloomPeriods = ['All', 'May-June', 'July-August', 'May'];
  
  function populateFilterOptions() {
    const typeSelect = document.getElementById('flower-type');
    const colorSelect = document.getElementById('flower-color');
    const bloomPeriodSelect = document.getElementById('flower-bloom_period');
  
    populateSelect(typeSelect, flowerTypes);
    populateSelect(colorSelect, flowerColors);
    populateSelect(bloomPeriodSelect, bloomPeriods);
  }
  
  function populateSelect(selectElement, options) {
    for(let i = 0; i < options.length; i++) {
      const option = options[i];
      const optionElement = document.createElement('option');
      optionElement.textContent = option;
      optionElement.value = option;
      selectElement.appendChild(optionElement);
    }
  }
  
  function loadCSVData() {
    fetch('clean_plants_data.csv')
      .then(response => response.text())
      .then(data => {;
        jsonData = csvToJson(data);
        populateTable(jsonData);
      })
  }
  
  function csvToJson(csvData) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
  
    const jsonResult = lines.slice(1).map(line => {
      const values = line.split(',');
      if (values.length !== headers.length) {
        return null;
      }
      const jsonObject = {};
      headers.forEach((header, index) => {
        jsonObject[header.trim()] = values[index].trim();
      });
      return jsonObject;
    }).filter(item => item !== null);
  
    return jsonResult;
  }
  
  function populateTable(data) {
    const tableBody = document.querySelector('#flower-table tbody');
    tableBody.innerHTML = '';
  
    data.forEach(flower => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${flower['Latin Name']}</td>
        <td>${flower['Common Name']}</td>
        <td>${flower['Type']}</td>
        <td>${flower['Color']}</td>
        <td>${flower['Bloom Period']}</td>
        <td><button onclick="selectFlower('${flower['Latin Name']}')">Select</button></td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  function filterFlowers(jsonData, type, color, bloomPeriod) {
    return jsonData.filter(flower => {
      const matchesType = type === 'All' || flower['Type'] === type;
      const matchesColor = color === 'All' || flower['Color'] === color;
      const matchesBloomPeriod = bloomPeriod === 'All' || flower['Bloom Period'] === bloomPeriod;
      return matchesType && matchesColor && matchesBloomPeriod;
    });
  }
  
  function updateTableWithFilters() {
    const typeSelect = document.getElementById('flower-type').value;
    const colorSelect = document.getElementById('flower-color').value;
    const bloomPeriodSelect = document.getElementById('flower-bloom_period').value;
  
    const filteredData = filterFlowers(jsonData, typeSelect, colorSelect, bloomPeriodSelect);
    populateTable(filteredData);
  }
  
  function selectFlower(latinName) {
    const selectedFlower = jsonData.find(flower => flower['Latin Name'] === latinName);
    if (selectedFlower) {
      document.getElementById('flower-latin-name').textContent = selectedFlower['Latin Name'];
      document.getElementById('flower-common-name').textContent = selectedFlower['Common Name'];
      document.getElementById('flower-type-info').textContent = selectedFlower['Type'];
      document.getElementById('flower-color-info').textContent = selectedFlower['Color'];
      document.getElementById('flower-bloom-period').textContent = selectedFlower['Bloom Period'];
      document.getElementById('flower-photo').src = selectedFlower['Photo'];

      currColour = getColor(selectedFlower['Latin Name']);
      currType = getType(selectedFlower['Latin Name']);
    }
  }

  let currColour;
  let currType;
  
  function displayDebugInfo(message) {
    const debugInfoDiv = document.getElementById('title-info');
    debugInfoDiv.innerHTML += `<p>${message}</p>`;
  }
  
  function getType (latinName) {
    const flower = jsonData.find(flower => flower['Latin Name'] === latinName);
    return flower['Type'];
  }
  
  function getColor (latinName) {
    const flower = jsonData.find(flower => flower['Latin Name'] === latinName);
    return flower['Color'];
  }
