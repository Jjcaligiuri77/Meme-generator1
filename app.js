const scores = document.querySelector('.score');
const cards = document.querySelectorAll('.card');
const back = document.querySelectorAll('.back');
const counter = document.querySelector('.count');


let basketball = "F100011951.jpg"; 
let wallet = "F100011915.jpg";
let apples = "F100011954.jpg";
let deer = "F100011953.jpg";
let darts = "F100011872.jpg";
let flower = "F100011946.jpg";

let imagesArray = [basketball, wallet, apples, deer, darts, flower, basketball, wallet, apples, deer, darts, flower];

let score = JSON.parse(localStorage.getItem('score')) || Infinity;
let selectedCard = false;
let card1 = null;
let card2 = null;
let click1;
let click2;
let par1;
let par2;
let count = 0;
let endCheck = 0;


if (score < Infinity) {
    scores.innerText = `Low score: ${score}`
}

for (card of cards) {
    card.addEventListener('click', handleClick);
}

function handleClick(e) {
    if (e.target.tagName === "IMG") { }
    else {

        if (e.target.tagName === "I") {
            e.target.parentElement.style.zIndex = "1";
        } else {
            e.target.style.zIndex = "1";
        }
    
        count++;
        counter.innerText = `Clicks: ${count}`;

        if (!selectedCard) {
         
            if (e.target.tagName === "I") {
                par1 = e.target.parentElement.parentElement;
                click1 = e.target.parentElement;
                card1 = e.target.parentElement.previousElementSibling.src;
            } else {
                par1 = e.target.parentElement;
                click1 = e.target;
                card1 = e.target.previousElementSibling.src;
            }
            selectedCard = true;

        } else {

            if (e.target.tagName === "I") {
                par2 = e.target.parentElement.parentElement
                click2 = e.target.parentElement
                card2 = e.target.parentElement.previousElementSibling.src
            } else {
                par2 = e.target.parentElement
                click2 = e.target
                card2 = e.target.previousElementSibling.src
            }
            selectedCard = false

        }

        if (card1 && card2 && card1 === card2) {
            par1.removeEventListener('click', handleClick)
            par2.removeEventListener('click', handleClick)
            card1 = null
            card2 = null


            for (card of cards) {
                if (card.lastElementChild.style.zIndex === "1") {
                    endCheck++;
                }
            }
            if (endCheck === 42 & count < score) {
                score = count
                scores.innerText = `Low score: ${score}`
                localStorage.setItem('score', score)
            }
        } else if (card1 && card2) {
            card1 = null
            card2 = null
            setTimeout(function () {
                click1.style.zIndex = "2"
                click2.style.zIndex = "2"
            }, 115);

        }
    }
}

const button = document.getElementById('suh')
button.addEventListener('click', reset)

function reset() {
    shuffle(imagesArray)
    let i = 0
    const images = document.querySelectorAll('img')
    for (image of images) {
        image.setAttribute('src', imagesArray[i])
        i++
    }


    for (card of back) {
        card.style.zIndex = "2"
    }

    selectedCard = false
    card1 = null
    card2 = null

    for (card of cards) {
        card.addEventListener('click', handleClick)
    }
    count = 0
    counter.innerText = `Clicks: ${count}`
    endCheck = 0
}


function shuffle(imagesArray) {

    let currentIndex = imagesArray.length;
    let temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = imagesArray[currentIndex];
        imagesArray[currentIndex] = imagesArray[randomIndex];
        imagesArray[randomIndex] = temporaryValue;
    }

    return imagesArray;
}
