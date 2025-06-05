//start

var heroTitle = document.getElementById("hero-title");
var heroSubtitle = document.getElementById("hero-subtitle");
var heroVid = document.getElementsByClassName("video-bg")[0];
var heroScroll = document.getElementById("hero-scroll");
var scrollPoint;
var navBar = document.getElementsByClassName("menu")[0];
var menuButton = document.getElementById("menu-button");
var heroHeight;
var navbarHeight = 55.38 - 10;
var gamecards;
var contactSect = document.getElementById("contact");
var footnoteSect = document.getElementById("footnoteButtons");
var videoDelay = 1000;

var id;
var scrollEl;
var titleReady;
var subtitleReady;
var scrollReady;

//scroll to hash
if (location.hash) {
    id = location.hash.slice(1);

    history.replaceState(null, null, location.pathname);
    scrollEl = document.getElementById(id);

    if (scrollEl) scrollEl.scrollIntoView();
}
//scroll to hash

hideScrollUntilTime();
hideSubtitleUntilTime();
getHeroHeight();
getScrollPoint();
addPauseWhenGamePage();
footerStyle();
// loadTest();

menuButton.addEventListener("click", scrollToTop);
heroScroll.addEventListener("click", scrollToAbout);

//video loading
// vid.load();
// vid.addEventListener('loadedmetadata', () => {
//     vid.currentTime = vid.duration - .1;
//     vid.currentTime = 0;
//     vid.classList.add("show");
// });

heroVid.classList.add("show");
//end of video loading

initAnim();
// end of start

function loadTest() {
    for (let i = 0; i < 10; i++) {
        console.log(i);
    }
}

function navBarVisInit() {
    if (window.pageYOffset > scrollPoint) {
        navBar.classList.add("show");
    }
    else {
        navBar.classList.remove("show");
    }
}

function navBarVis() {
    if (window.pageYOffset > scrollPoint) {
        navBar.classList.add("show");
        heroTitle.classList.remove("show");
        heroSubtitle.classList.remove("show");
        heroScroll.classList.remove("show");
    }
    else {
        navBar.classList.remove("show");
        heroTitle.classList.add("show");
        heroSubtitle.classList.add("show");
        heroScroll.classList.add("show");
    }
}

async function initAnim() {
    if (window.pageYOffset <= scrollPoint) {
        await delay(1000); //1 second delay

        heroTitle.classList.add("show-init");
        showTitleUntilTime();
        responsiveness(true);

        await delay(700); //1.7 seconds

        heroSubtitle.classList.add("show-init");

        await delay(1000); //2.7 seconds

        responsiveness(false);

        subtitleReady = true;
        navBarVis();
        heroSubtitle.classList.remove("show-init");
        heroScroll.classList.remove("show");

        await delay(100); //2.8 seconds

        startVid();

        await delay(1000); //3.8 seconds

        titleReady = true;
        navBarVis();
        heroTitle.classList.remove("show-init");
        heroScroll.classList.remove("show");

        await delay(1000); //4.8 seconds

        heroScroll.classList.add("show-init");
        scrollReady = true;
        navBarVis();
        heroScroll.classList.remove("show-init");
    }
    else {
        subtitleReady = true;
        scrollReady = true;
        navBar.classList.add("show-init");
        navBarVis();
        navBar.classList.remove("show-init");
        startVid();
        responsiveness(false);
    }
}

function responsiveness(init) {
    document.body.style.overflowY = 'scroll';

    if (init == true) {
        window.onresize = function () {
            getHeroHeight();
            getScrollPoint();
            navBarVisInit();
            footerStyle();
        }

        window.onscroll = function () {
            navBarVisInit();
        };
    }
    else {
        window.onresize = function () {
            getHeroHeight();
            getScrollPoint();
            navBarVis();
            footerStyle();
        }

        window.onscroll = function () {
            navBarVis();
        };
    }

    getHeroHeight();
    getScrollPoint();
}

function addPauseWhenGamePage() {
    gamecards = document.getElementsByClassName("gamecard");
    for (let i = 0; i < gamecards.length; i++) {
        gamecards[i].addEventListener("click", pauseAllVideos);
    }
}

function pauseAllVideos(e) {
    e.preventDefault();
    heroVid.pause();
    for (let i = 0; i < gamecards.length; i++) {
        gamecards[i].querySelector("video").pause();
    }
    window.location.href = e.currentTarget.href;
}

async function showTitleUntilTime() {
    titleReady = false;
    while (!titleReady) {
        heroTitle.classList.remove("show");
        await delay(1);
    }
}

async function hideSubtitleUntilTime() {
    subtitleReady = false;
    while (!subtitleReady) {
        heroSubtitle.classList.remove("show");
        await delay(1);
    }
}

async function hideScrollUntilTime() {
    scrollReady = false;
    while (!scrollReady) {
        heroScroll.classList.remove("show");
        await delay(35);
    }
}

function getHeroHeight() {
    var w = window.innerWidth;
    var h = w * 9 / 16;

    if (w > 601) {
        heroHeight = Math.min(h, window.innerHeight);
    }
    else {
        heroHeight = window.innerHeight;
    }
}

function getScrollPoint() {
    let t = heroTitle.getBoundingClientRect().top * .96;

    scrollPoint = heroHeight - t;
}

async function startVid() {
    // while (vid.buffered.end(0) < vid.duration) {

    //     // vid.play().then(() => {
    //     //     vid.pause();
    //     // }).catch((err) => {
    //     //     console.error("autoplay error:", err);
    //     // });
    //     await delay(100);
    //     console.log(vid.buffered.end(0));
    // }

    heroVid.play();
    heroVid.setAttribute('autoplay', true);

    // while (vid.buffered.end(0) < vid.duration) {
    //     await delay(100);
    //     console.log(vid.buffered.end(0));
    // }
}

function footerStyle() {
    if (heroHeight == window.innerHeight) {
        contactSect.classList.add("screen-clr");
        footnoteSect.classList.add("screen-clr");
        contactSect.classList.remove("alt-clr");
        footnoteSect.classList.remove("alt-clr");
    }
    else {
        contactSect.classList.add("alt-clr");
        footnoteSect.classList.add("alt-clr");
        contactSect.classList.remove("screen-clr");
        footnoteSect.classList.remove("screen-clr");
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function scrollToAbout() {
    scroll({
        left: 0,
        top: heroHeight - navbarHeight,
        behavior: "smooth"
    });
}

async function scrollToTop() {

    scroll({
        left: 0,
        top: 0,
        behavior: "smooth"
    })
    return;

    if (window.pageYOffset != Math.round(window.pageYOffset)) {
        scroll({
            left: 0,
            top: 0,
            behavior: "smooth"
        })
        return;
    }

    var scrollSpeed = 3;
    var shouldScroll = true;
    var lastYPos;
    var startPos = parseFloat(window.pageYOffset);

    while (shouldScroll) {
        lastYPos = window.pageYOffset;

        //scrollTo(0, window.pageYOffset - scrollSpeed);
        scroll(0, window.pageYOffset - lerp(startPos, 0, window.pageYOffset, scrollSpeed));

        await delay(1);

        //if(window.pageYOffset == 0 || window.pageYOffset != lastYPos - scrollSpeed) shouldScroll = false;
        if (window.pageYOffset == 0 || window.pageYOffset != lastYPos - lerp(startPos, 0, lastYPos, scrollSpeed)) shouldScroll = false;
    }
}

function lerp(start, end, current, minSpeed) {
    var maxSpeedMult = 2.1;

    var m = (start + end) / 2;

    var abs = Math.abs(parseFloat(current) - m);

    var dist = abs / m;

    var speedMult = 1 - dist;

    var speed = Math.round(Math.pow(minSpeed, 1 + speedMult * maxSpeedMult));

    console.log(speed);

    return speed;
}

// function lerp(start, end, current, minSpeed) {
//     var maxSpeedMult = .5;

//     var m = (start + end) / 2;

//     var abs = Math.abs(parseFloat(current) - m);

//     var dist = abs / m;

//     var speedMult = 1 - dist;

//     var speed = Math.round(Math.pow(minSpeed, 1 + speedMult * maxSpeedMult));

//     console.log(speed);

//     return speed;
// }