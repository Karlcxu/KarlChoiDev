//start

var largeMediaBg = document.getElementById("large-media-bg");
var largeImage = document.getElementById("large-image");
var largeVid = document.getElementById("large-video");
var media = document.getElementById("media").children;

if (window.innerWidth > 950 && window.innerHeight > 600) {
    addZoomFunctionality();
}

// end of start

function addZoomFunctionality() {
    for (let i = 0; i < media.length; i++) {
        let element = media[i];

        element.addEventListener("click", () => showLargeMedia(element, element.tagName === "IMG"));
    }

    largeMediaBg.addEventListener("click", () => largeMediaBg.classList.remove("show"));
}

function showLargeMedia(element, isImg) {
    ////scroll to image functionality
    //let imgCenter = (picture.getBoundingClientRect().top + picture.getBoundingClientRect().bottom) / 2;

    // scroll({
    //     left: 0,
    //     top: window.pageYOffset + (imgCenter - window.innerHeight / 2),
    //     behavior: "smooth"
    // });

    if (isImg) {
        largeImage.src = element.src;
        largeVid.classList.remove("show");
        largeImage.classList.add("show");
    }
    else {
        largeVid.src = element.src;
        largeImage.classList.remove("show");
        largeVid.classList.add("show");
    }

    largeMediaBg.classList.add("show");
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}