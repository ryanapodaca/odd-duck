"use strict";

//Global variables

let productArray = [];
let rounds = 25;

//DOM connectivity

let imgContainer = document.getElementById("img-container");

let imgOne = document.getElementById("img-one");
let imgTwo = document.getElementById("img-two");
let imgThree = document.getElementById("img-three");

let resultsBtn = document.getElementById("results-btn");
// let resultsList = document.getElementById('results-container');

//Canvas element
let barGraph = document.getElementById("chart");

//Constructor Function

function Product(name, fileExtension = "jpeg") {
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  productArray.push(this);
}

//Helper functions

function renderImg() {
  // let imgOneIndex = getRandomIndex();
  // let imgTwoIndex = getRandomIndex();
  // let imgThreeIndex = getRandomIndex();

  // while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
  //   imgTwo.src = getRandomIndex();
  //   imgThree.src = getRandomIndex();
  //  }

  let indexArray = [];

  while (indexArray.length < 6) {
    let randomIndex = getRandomIndex();
    if (!indexArray.includes(randomIndex)) {
      indexArray.push(randomIndex);
    }
  }

  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();

  imgOne.src = productArray[imgOneIndex].image;
  imgOne.title = productArray[imgOneIndex].name;
  imgOne.alt = `This an image of ${productArray[imgOneIndex].name}.`;
  imgTwo.src = productArray[imgTwoIndex].image;
  imgTwo.title = productArray[imgTwoIndex].name;
  imgTwo.alt = `This an image of ${productArray[imgTwoIndex].name}.`;
  imgThree.src = productArray[imgThreeIndex].image;
  imgThree.title = productArray[imgThreeIndex].name;
  imgThree.alt = `This an image of ${productArray[imgThreeIndex].name}.`;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;
}

function getRandomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

//Event Listeners

function handleImgClick(event) {
  let imgClicked = event.target.title;
  console.dir(imgClicked);

  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].name) {
      productArray[i].clicks++;
      rounds--;
      renderImg();
    }
  }

  if (rounds === 0) {
    imgContainer.removeEventListener("click", handleImgClick);
    resultsBtn.addEventListener("click", handleResults); //maybe
  }
}

function handleResults() {
  if (rounds === 0) {
    renderChart();
    resultsBtn.removeEventListener("click", handleResults);
  }
}

function renderChart() {
  let names = [];
  let votes = [];
  let views = [];

  for (let i = 0; i < productArray.length; i++) {
    names.push(productArray[i].name);
    votes.push(productArray[i].clicks);
    views.push(productArray[i].views);
  }
  console.log(names);
  console.log(views);

  let chartObject = {
    type: "bar",
    data: {
      labels: names,
      datasets: [
        {
          label: "# of Votes",
          data: votes,
          borderWidth: 5,
        },
        {
          label: "# of Views",
          data: views,
          borderWidth: 5,
        }
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  new Chart(barGraph, chartObject);
}

//Code

let bag = new Product("bag");
let banana = new Product("banana");
let bathroom = new Product("bathroom");
let boots = new Product("boots");
let breakfast = new Product("breakfast");
let bubblegum = new Product("bubblegum");
let chair = new Product("chair");
let cthulhu = new Product("cthulhu");
let dogDuck = new Product("dog-duck");
let dragon = new Product("dragon");
let pen = new Product("pen");
let petSweep = new Product("pet-sweep");
let scissors = new Product("scissors");
let shark = new Product("shark");
let sweep = new Product("sweep", "png");
let tauntaun = new Product("tauntaun");
let unicorn = new Product("unicorn");
let usb = new Product("water-can");
let wineGlass = new Product("wine-glass");

// productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, usb, wineGlass);

// for (let i = 0; i < productArray.length; i++) {
//   productArray[i].;
// }

renderImg();

imgContainer.addEventListener("click", handleImgClick);
resultsBtn.addEventListener("click", handleResults);
