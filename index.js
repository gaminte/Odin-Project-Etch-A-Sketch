let container = document.querySelector(".container");
let sliderContainer = document.querySelector(".slider");
let colorMode = "bw";
let slider = document.getElementById("rangeSlider");
let bw = document.getElementById("bw");
let color = document.getElementById("color");
let eraser = document.getElementById("eraser");
let clear = document.getElementById("clear");
let gridSize = slider.value;


// Adding grids
function createGrid(gridSize) {
  for (let i = 1; i <= gridSize ** 2; i++) {
    let cell = document.createElement("div");
    cell.classList.add("grid");
    container.append(cell);
    cell.addEventListener("mousedown", click);
    cell.addEventListener("mouseover", hover);
  }

  container.style.gridTemplateColumns= `repeat(${gridSize}, 1fr)`;
  container.style.gridTemplateRows= `repeat(${gridSize}, 1fr)`;
}

function deleteGrid() {
  let cells = document.querySelectorAll(".container>.grid");
  cells.forEach(div => div.remove());
}


// Adding hover effects
function click(e) {
  let cell = e.target;
  if (colorMode == "bw") {
    cell.style.backgroundColor = "rgb(0,0,0)";
  }
  else if (colorMode == "color") {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    cell.style.backgroundColor = `rgb(${r},${g},${b})`
  }
  else if (colorMode == "eraser") {
    cell.style.backgroundColor = "";
  }
}

function hover(e) {
  let cell = e.target
  if(e.buttons > 0) {
    if (colorMode == "bw") {
      cell.style.backgroundColor = "rgb(0,0,0)";
    }
    else if (colorMode == "color") {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      cell.style.backgroundColor = `rgb(${r},${g},${b})`
    }
    else if (colorMode == "eraser") {
      cell.style.backgroundColor = "";
    }
  }
}


// Adding Slider range value
let sliderValue = document.createElement("p");
sliderValue.innerText = `${slider.value} x ${slider.value}`;
sliderValue.classList.add("sliderValue");
sliderContainer.append(sliderValue);


// Adding button controls
bw.classList.add("toggle")
bw.onclick = e => {
  colorMode = e.target.id;
  toggleBtn()
}

color.onclick = e => {
  colorMode = e.target.id;
  toggleBtn()
}

eraser.onclick = e => {
  colorMode = e.target.id;
  toggleBtn()
}

clear.onclick = () => {
  deleteGrid();
  createGrid(gridSize);
}

slider.onchange = e => {
  deleteGrid();
  createGrid(e.target.value);
  gridSize = e.target.value;
  sliderValue.innerText = `${e.target.value} x ${e.target.value}`;
}


// Adding toggle controls
function toggleBtn() {
  if (colorMode == "bw") {
    bw.classList.add("toggle");
    color.classList.remove("toggle");
    eraser.classList.remove("toggle");
  }
  else if (colorMode == "color") {
    color.classList.add("toggle");
    bw.classList.remove("toggle");
    eraser.classList.remove("toggle");
  }
  else if (colorMode == "eraser") {
    eraser.classList.add("toggle");
    bw.classList.remove("toggle");
    color.classList.remove("toggle");
  }
}

window.onload = () => {
  createGrid(16);
}