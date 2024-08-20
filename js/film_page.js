let filmLogo = document.getElementById("film-logo");
let filmTitle = document.getElementById("film-title");
let requestTitle;
let filmClock = document.getElementById("film-clock");
let filmRating = document.getElementById("film-rating");
let url = new URLSearchParams(location.search);
let userId = url.get("id");
let myInput = document.getElementById("input");
let mySpan = document.getElementById("search-i")


console.log(userId);

span.addEventListener("click", function() {
    let inputValue = encodeURIComponent(input.value); // Get the input value and encode it for use in a URL
    location.href = `../html/search_page.html?query=${inputValue}`;
});


window.addEventListener("DOMContentLoaded", function() {
    const url = `https://api.themoviedb.org/3/movie/${userId}?api_key=${API_KEY}`;

    request(url, null, result => {
        // console.log(result);
        requestTitle = result.title;
        drawInfos(result);

        const urlAdvanced = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${requestTitle.split(' ')[0]}`;
        // console.log(requestTitle.split(' ')[0]);

        request(urlAdvanced, null, data => {
            console.log(data);
            displayMovies2(data.results);
            goToMovie(data.results)
        });
    });
});

function drawInfos(data){
    let imageUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    filmLogo.src = imageUrl;
    filmClock.textContent = data.release_date;
    filmTitle.textContent = data.title;
    filmRating.textContent = data.vote_average.toFixed(1);
}

function displayMovies2(arr){
    let blocks = document.querySelectorAll(".frame-2-img2"); 
    let titles = document.querySelectorAll(".title-movie2"); 
    let clocks = document.querySelectorAll(".clock-span2"); 
    let ratings = document.querySelectorAll(".rating-span2"); 

    blocks.forEach(block => {
        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }
    });

    titles.forEach(title => title.innerHTML = "");
    clocks.forEach(clock => clock.innerHTML = "");
    ratings.forEach(rating => rating.innerHTML = "");

    for (let i = 0; i < blocks.length; i++) {
        if (i < arr.length) {
            let img = document.createElement("img");
            let imageUrl = `https://image.tmdb.org/t/p/w500${arr[i].poster_path}`;
            img.src = imageUrl;
            blocks[i].appendChild(img);
            titles[i].innerHTML = arr[i].title;
            clocks[i].innerHTML = arr[i].release_date;
            ratings[i].innerHTML = arr[i].vote_average.toFixed(1);
        } else {
            blocks[i].style.backgroundImage = "";
            let frame2 = document.querySelector(".frame-2");
            let main = document.querySelector(".main");

            main.removeChild(frame2);

            let errorDiv = document.createElement("div");
            let errorBlock = document.createElement("h3");
            errorBlock.textContent = "The film not found";

            errorDiv.append(errorBlock);
            main.append(errorDiv);
            errorBlock.style.textAlign = "center";
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const leftArrow = document.querySelector(".arrows-slide-left");
    const rightArrow = document.querySelector('.arrows-slide-right');

    const scrollAmount = 1000; 
    const scrollDuration = 400; 

    function scrollTo(targetPosition) {
        const startPosition = slides.scrollLeft;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        function animateScroll(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / scrollDuration, 1);
            slides.scrollLeft = startPosition + (distance * progress);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }

    leftArrow.addEventListener('click', () => {
        const slideWidth = document.querySelector('.slide').offsetWidth;
        scrollTo(slides.scrollLeft - slideWidth);
    });

    rightArrow.addEventListener('click', () => {
        const slideWidth = document.querySelector('.slide').offsetWidth;
        scrollTo(slides.scrollLeft + slideWidth);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    let isDragging = false;
    let startX;
    let scrollLeft;

    function handleMouseDown(e) {
        isDragging = true;
        startX = e.pageX - slides.offsetLeft;
        scrollLeft = slides.scrollLeft;
        slides.classList.add('dragging');
    }

    function handleMouseLeave() {
        isDragging = false;
        slides.classList.remove('dragging');
    }

    function handleMouseUp() {
        isDragging = false;
        slides.classList.remove('dragging');
    }

    function handleMouseMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - slides.offsetLeft;
        const walk = (x - startX) * 2;
        slides.scrollLeft = scrollLeft - walk;
    }

    slides.addEventListener('mousedown', handleMouseDown);
    slides.addEventListener('mouseleave', handleMouseLeave);
    slides.addEventListener('mouseup', handleMouseUp);
    slides.addEventListener('mousemove', handleMouseMove);

    function handleTouchStart(e) {
        isDragging = true;
        startX = e.touches[0].pageX - slides.offsetLeft;
        scrollLeft = slides.scrollLeft;
    }

    function handleTouchEnd() {
        isDragging = false;
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        const x = e.touches[0].pageX - slides.offsetLeft;
        const walk = (x - startX) * 4;
        slides.scrollLeft = scrollLeft - walk;
    }

    slides.addEventListener('touchstart', handleTouchStart);
    slides.addEventListener('touchend', handleTouchEnd);
    slides.addEventListener('touchmove', handleTouchMove);
});


let credit = `https://api.themoviedb.org/3/movie/${userId}/credits?api_key=${API_KEY}`

request(credit, null, credits => {
    let mainSlider = document.querySelector(".slides")

    if (credits.cast.length == 0){
        mainSlider.innerHTML = `
            <span>Nothing Found <i class="fa-solid fa-user-minus" style="margin: 10px;"></i></span>
        `
    }

    for (let i = 0; i < credits.cast.length; i++){
        let slide = document.createElement("div");
        slide.classList.add("slide");
    
        let slideImg = document.createElement("img");
        slideImg.src = `https://image.tmdb.org/t/p/w500${credits.cast[i].profile_path}`
        slideImg.alt = `Hero ${i}`

        slide.appendChild(slideImg);

        mainSlider.appendChild(slide)
    }
});

let trailerResult = `https://api.themoviedb.org/3/movie/${userId}/videos?api_key=${API_KEY}`
request(trailerResult, null, trailerData => {
    console.log(trailerData);
    let trailersItem = document.querySelectorAll(".trailers-item");

    for (let i = 0; i < trailersItem.length; i++){
        let trailer = document.createElement("iframe")
        trailer.classList.add("trailer-video")
        trailer.src = `https://www.youtube.com/embed/${trailerData.results[i].key}`
        console.log(trailer);
        
        trailersItem[i].appendChild(trailer)
        
    }
});