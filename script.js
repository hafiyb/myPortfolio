const firebaseConfig = {

    apiKey: "AIzaSyCw49RIyTYhi8fkz9Kt4hbBx3mQfDsU8HM",

    authDomain: "portfolio-acffb.firebaseapp.com",
  
    databaseURL: "https://portfolio-acffb-default-rtdb.asia-southeast1.firebasedatabase.app",
  
    projectId: "portfolio-acffb",
  
    storageBucket: "portfolio-acffb.appspot.com",
  
    messagingSenderId: "823601544180",
  
    appId: "1:823601544180:web:e312398dd078d43253d7a1"
  
  };
  
  
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);
  
//   console.log(firebase)

console.log(window.innerWidth)

  
var now = new Date();
var start = new Date(now.getFullYear(), 0, 0);
var diff = now - start;
var oneDay = 1000 * 60 * 60 * 24;
var day = Math.floor(diff / oneDay);
var percent = Math.floor(((day-256) / 109 ) * 100)

document.getElementById('percent').innerHTML = percent
window.addEventListener("scroll", onScroll)

var projects = [{
    title: "Chat room",
    desc: "This chat room utilizes firebase to store messages and user information",
    imgSrc: "assets/images/projects/chat.png",
    link: "https://hafiyb.github.io/Day13/"
},
{
    title: "Weather app",
    desc: "A weather app to demonstrate the use of OpenWeatherMap API",
    imgSrc: "assets/images/projects/weather.png",
    link: "https://hafiyb.github.io/Day14/"
},
{
    title: "Music player",
    desc: "A simple music player playing some of my favourite tracks",
    imgSrc: "assets/images/projects/music1.png",
    link: "https://hafiyb.github.io/day9/"
},
{
    title: "Video player",
    desc: "An attempt at a web video player using CSS grid",
    imgSrc: "assets/images/projects/video1.png",
    link: "https://hafiyb.github.io/day8/"
},
{
    title: "Piano",
    desc: "A simplistic web piano demonstrating the use of keypresses and howler.js",
    imgSrc: "assets/images/projects/piano1.png",
    link: "https://hafiyb.github.io/day11/"
}
]

var gunshot = new Howl({
    src: ['assets/sounds/gun.wav'],
  });
var scoreUp = new Howl({
    src: ['assets/sounds/point.wav'],
  });

function soundGun(){
    gunshot.play()
}

function soundScore(){
    scoreUp.play()
}

var hiScore = document.getElementById('hi-score')

setInterval(function(){
    if(gameMode == false){
        hiScore.classList.remove('animate__flash')
        setTimeout(function(){
            hiScore.classList.add('animate__flash')
        }, 1000)
    } 
}, 2000)

//=========================================================================================================================================================
//GAME TRIGGER HERE
//=========================================================================================================================================================


var bgImg = document.getElementById('bg-img')
var banner = document.getElementById('banner')
var myImg = document.getElementById('my-img')
var notDucks = document.getElementsByClassName('not-ducks')
var ducks = document.getElementsByClassName('game-ducks')
var gameMode = false
var gameScore = document.getElementById('game-score')
var score = 0

function startGame(){

    banner.onclick = soundGun

    updateScore()

    myImg.classList.add('animate__flipOutY')
    

    setTimeout(function(){
        
        bgImg.classList.add('animate__flash')
        banner.style.cursor = 'crosshair'

        for(let i = 0; i < scrollText.length ; i++){
            textSpeed[i] = 0
            textPos[i] = -250
            scrollText[i].innerHTML = ''
        }

        for(let i = 0; i < ducks.length; i++){
            ducks[i].classList.add('scrolling-text')
            textSpeed[scrollText.length - 1] = 1
            textPos[scrollText.length - 1] = -250
            scrollText[scrollText.length - 1].style.filter = 'blur(0px)'
            scrollText[scrollText.length - 1].style.transform = 'scaleX(-1)'
        }

        setTimeout(function(){
            bgImg.style.backgroundPositionY = 'bottom'
            bgImg.style.backgroundImage = 'url(assets/images/duckwallpaper.png)'
            bgImg.style.filter = 'blur(0px)'
        },600)
    },500)

    gameMode = true

}


function duckShot(num){
    textSpeed[notDucks.length + num] = 0
    soundScore()
    score++

    setTimeout(function(){
        
        ducks[num].classList.add('animate__fadeOutDownBig')
        setTimeout(function(){
            textPos[notDucks.length + num] = -250
            textSpeed[notDucks.length + num] = 1
            setTimeout(function(){
                ducks[num].classList.remove('animate__fadeOutDownBig')
            },100)
        },300)
    },200)

    updateScore()
}

function updateScore(){

    if(score < 10){
        gameScore.innerHTML = '0000' + score
    } else if(score < 100 && score >= 10 ){
        gameScore.innerHTML = '000' + score
    } else if(score < 1000 && score >= 100 ){
        gameScore.innerHTML = '00' + score
    } else if(score < 10000 && score >= 1000 ){
        gameScore.innerHTML = '0' + score
    } else gameScore.innerHTML = score
}



//=========================================================================================================================================================
//SCROLLING TEXT
//=========================================================================================================================================================


var bannerText = ['Hello!','Bonjour!','Selamat sejahtera!','สวัสดี','你好','வணக்கம்!','こんにちは','¡Hola!','سلام','Selamat siang']
// var bannerSize = [12,16,20,24,28,32,36,40,38,34]
// var bannerSpeed = [3,4,5,6,7,8,9,10,11,12]
// var bannerTop = [90,120,170,220,270,320,350,370,390,400]
var bannerColor = ['#000000', '#ffffff', '#ff9f1c','#000000', '#ffffff', '#ff9f1c','#000000', '#ffffff', '#ff9f1c']

var scrollText = document.getElementsByClassName('scrolling-text')
var textSpeed = []
var textPos = []

for(i = 0; i < scrollText.length ; i++){
    textSpeed[i] = 1
    textPos[i] = -299
}

function randomizer(mul){
    return Math.round(Math.random() * mul)
}



// if(window.innerWidth > 1100){
setInterval(function(){
    for(let i = 0; i < scrollText.length; i ++){
        textPos[i] -= textSpeed[i]
        scrollText[i].style.transform = `translateX(${textPos[i]}px)`

        scrollText[i].style.display ='block'
        if(textPos[i] <= -300){

            if(gameMode == true){

                textPos[i] = window.innerWidth + 10
                textSpeed[i] = randomizer(10) * 0.5 + 5 //randomize here
                scrollText[i].style.top = (randomizer(300) + 100) + 'px' //randomize here
                scrollText[i].style.fontSize = (randomizer(28) + 12) + 'px'
                
                // scrollText[i].style.backgroundColor = 'black'

            } else {

                textPos[i] = window.innerWidth + 10
                textSpeed[i] = randomizer(12) * 0.5 + 3 //randomize here
                scrollText[i].style.top = (randomizer(400) + 100) + 'px' //randomize here
                scrollText[i].style.fontSize = (randomizer(28) + 12) + 'px'
                scrollText[i].innerHTML = bannerText[randomizer(9)]


            }
        }
    }
}, 20)
// }

var iconBlink = document.getElementsByClassName('animate-icon')
var iconNum = 0

setInterval(function(){
    iconNum += 1
    // console.log('test')
    iconBlink[iconNum-1].classList.remove('animate__pulse')
    
    if(iconNum == iconBlink.length){
        iconNum = 0
        // console.log('test2')
        
        // iconBlink[iconNum].style.backgroundColor = 'blue'
    }
    iconBlink[iconNum].classList.add('animate__pulse')
    
},1000)


// var myImg = document.getElementById('my-img')
// var myImg2 = document.getElementById('my-img2')
// var toggleImg = false

// setInterval(function(){
//     if(toggleImg == false){
//         toggleImg = true
//         myImg.classList.remove('animate__flipInY')
//         myImg.classList.add('animate__flipOutY')
//         // myImg.style.display = 'none'

//         myImg2.classList.remove('animate__flipOutY')
//         myImg2.classList.add('animate__flipInY')
//         // myImg2.style.display = 'block'
//     } else {
//         toggleImg = false
//         myImg.classList.remove('animate__flipOutY')
//         myImg.classList.add('animate__flipInY')
//         // myImg.style.display = 'block'

//         myImg2.classList.remove('animate__flipInY')
//         myImg2.classList.add('animate__flipOutY')
//         // myImg2.style.display = 'none'
//     }
// }, 5000)


//=========================================================================================================================================================
//NAV CONTROL
//=========================================================================================================================================================

var navClickFlag = false
var navMenu = document.getElementById('nav-expand')
var navIcon = document.getElementById('navbutton')

function navClicked(){
    console.log(navClickFlag)
    if(navClickFlag == true){
        // navMenu.style.display = 'none'
        navMenu.classList.add("animate__fadeOutUpBig")
        navMenu.classList.remove("animate__fadeInDownBig")
        navClickFlag = false
        document.querySelector('body').style.overflow = 'auto'
        navIcon.style.transform = 'rotate(0deg) scale(1.5)'
    } else {
        navMenu.style.display = 'flex'
        navMenu.classList.remove("animate__fadeOutUpBig")
        navMenu.classList.add("animate__fadeInDownBig")
        navClickFlag = true
        document.querySelector('body').style.overflow = 'hidden'
        navIcon.style.transform = 'rotate(-90deg) scale(2)'
    }
}

//=========================================================================================================================================================
//PROJECTS APPEND CARD
//=========================================================================================================================================================


for(let i = 0 ; i< projects.length;i++){

    var createProjText = document.createElement('div')
    createProjText.classList.add('project-card-text')

    var createTitle = document.createElement('h3')
    createTitle.innerHTML = projects[i].title
    var createDesc = document.createElement('p')
    createDesc.innerHTML = projects[i].desc

    createProjText.append(createTitle)
    createProjText.append(createDesc)
    createProjText.classList.add('project-card-txt')

    var createProjCard = document.createElement('div')
    createProjCard.classList.add('project-card')

    var createProjImg = document.createElement('img')
    createProjImg.src = projects[i].imgSrc

    if( i % 2 == 0){
        createProjCard.classList.add('card-left')
        createProjCard.append(createProjImg)
        createProjCard.append(createProjText)
    }else{
        createProjCard.classList.add('card-right')
        createProjCard.append(createProjText)
        createProjCard.append(createProjImg)
    }

    var createAnchor = document.createElement('a')
    createAnchor.href = projects[i].link
    createAnchor.classList.add('project-card-anchor')
    createAnchor.target = "blank"
    
    createAnchor.append(createProjCard)
    document.getElementById('project-card-container').append(createAnchor)
}

var itemList = document.querySelectorAll('.project-card-anchor');

function onScroll(evt){

    // console.log("window scrollY : ", window.scrollY)
    // console.log(itemList[0].offsetTop)

    for(let i = 0; i < itemList.length; i += 1){
        if(window.scrollY >= itemList[i].offsetTop - 600){
            itemList[i].classList.remove('slideOut');
            if( i % 2 == 0){ 
                itemList[i].classList.add('slideInRight')
            }else{
                itemList[i].classList.add('slideInLeft')
            }
        } else { 
            if( i % 2 == 0){
                itemList[i].classList.remove('slideInRight')
            }else{
                itemList[i].classList.remove('slideInLeft')
            }
            itemList[i].classList.add('slideOut');
        }
    }
}

//=========================================================================================================================================================
//CONTACT INFO FIREBASE
//=========================================================================================================================================================

function toTop(){
    window.scrollTo(0, 0)
}

var theirName = document.getElementById('their-name')
var theirEmail = document.getElementById('their-email')
var theirPhone = document.getElementById('their-phone')

function sendData(){
    if(theirName.value == ''){
        theirName.style.border = "3px solid red"
    } else {
        theirName.style.border = "none"
        theirName.style.borderBottom = "2px dashed gray"
    }
    
    if(theirEmail.value == ''){
        theirEmail.style.border = "3px solid red"
    } else {
        theirEmail.style.border = "none"
        theirEmail.style.borderBottom = "2px dashed gray"
    }

    if(theirEmail.value != '' && theirName.value != ''){
        firebase.database().ref('contacts').push({
            name : theirName.value,
            email : theirEmail.value,
            phone : theirPhone.value
            
        })
        theirName.value = ''
        theirEmail.value = ''
        theirPhone.value = ''
        alert("Contact info sent, Thanks!")
    }
}

