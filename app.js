'use strict';

//Global variables

let productArray = [];
let rounds = 25;

//DOM connectivity

let imgContainer = document.getElementById('img-container');

let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('results-btn');
let resultsList = document.getElementById('results-container');


//Constructor Function

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  productArray.push(this);
}


//Helper functions

function renderImg (){
  imgOneIndex = getRandomIndex();
  imgTwoIndex = getRandomIndex();
  imgThreeIndex = getRandomIndex();

  while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
    // imgOne.src = getRandomIndex();
    imgTwo.src = getRandomIndex();
    imgThree.src = getRandomIndex();
  }

  imgOne.src = productArray[imgOneIndex].image;
  imgOne.title = productArray[imgOneIndex].name;
  imgTwo.src = productArray[imgTwoIndex].image;
  imgTwo.title = productArray[imgTwoIndex].name;
  imgThree.src = productArray[imgThreeIndex].image;
  imgThree.title = productArray[imgThreeIndex].name;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;
}


//Event Listeners

function getRandomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function handleImgClick(event) {
  let imgClicked = event.target.title;
  console.dir(imgClicked);
  
  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].name) {
      productArray[i].clicks++;
    }
  }
  
  rounds--;
  
  renderImg();

  if (rounds === 0) {
    imgContainer.removeEventListener('click', handleImgClick);
  }
}

function handleResults(){
  if (rounds === 0) {
    for (let i = 0; i < productArray.length; i++){
      let li = document.createElement('li');
      li.textContent = `${productArray[i].name} had ${productArray[i].clicks} votes, and was seen ${productArray[i].views} times.`;
      ul.appendChild(li);
      resultsList.appendChild(li);
    }
    results.Btn.removeEventListener('click', handleResults);
  }
}


//Code

let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petSweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let usb = new Product('water-can');
let wineGlass = new Product('wine-glass');

// productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, usb, wineGlass);

renderImg();

imgContainer.addEventListener('click', handleImgClick);
resultsBtn.addEventListener('click', handleResults);
