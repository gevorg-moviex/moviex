let input = document.getElementById("search");
let span = document.getElementById("search-i");
const API_KEY = "5ef8a6de9a2941621bd7a066376f65b9";

async function request(url, options, onsuccess, onerror) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
            onsuccess(data);
        } else {
            onerror({ statusCode: data.cod, message: data.message });
        }
    } catch (error) {
        console.error("Request failed:", error);
    }
}

// span.addEventListener("click", function() {
//     let inputVal = input.value;
//     const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${inputVal}`;
//     request(url, null, result => {
//         console.log(result);
//         let myArr = result.results
//         displayMovies(myArr)
//         goToMovie(myArr)
//     });
// })

function displayMovies(movies) {
    let blocks = document.querySelectorAll(".frame-2-img");
    let titles = document.querySelectorAll("#title-movie");
    let clocks = document.querySelectorAll("#clock-span");
    let ratings = document.querySelectorAll("#rating-span");

    blocks.forEach(block => {
        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }
    });
    titles.forEach(title => title.innerHTML = "");
    clocks.forEach(clock => clock.innerHTML = "");
    ratings.forEach(rating => rating.innerHTML = "");

    for (let i = 0; i < blocks.length; i++) {
        if (i < movies.length) {
            let img = document.createElement("img");
            let imageUrl = `https://image.tmdb.org/t/p/w500${movies[i].poster_path}`;
            img.src = imageUrl;
            blocks[i].appendChild(img);
            titles[i].innerHTML = movies[i].title;
            clocks[i].innerHTML = movies[i].release_date;
            ratings[i].innerHTML = movies[i].vote_average.toFixed(1);
        } else {
            blocks[i].style.backgroundImage = "";
            let frame2 = section.querySelector(".frame-2");
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


window.addEventListener("DOMContentLoaded", function() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

    request(url, null, result => {
        let randomMovies = [];
        let movies = result.results;

        for (let i = 0; i < 15; i++) {
            let randomIndex = Math.floor(Math.random() * movies.length);
            randomMovies.push(movies[randomIndex]);
            movies.splice(randomIndex, 1);
        }
        
        displayMovies(randomMovies);
        goToMovie(randomMovies)
    }, (error) => {
        console.log(`Error: ${error.message}`);
    });
});


function goToMovie(movies, link = "../html/film_page.html?id=") {
    let movieItems = document.querySelectorAll(".frame-2-childs");

    movieItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            let movieId = movies[index].id;
            window.location.href = `${link}${movieId}`;
            console.log(movieId);
        });
    });
}

function goToMovieMain(movies) {
    let movieItems = document.querySelectorAll(".frame-2-childs");

    movieItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            let movieId = movies[index].id;
            window.location.href = `html/film_page.html?id=${movieId}`;
            console.log(movieId);
        });
    });
}

function nowPlaying(movies){
    let blocks = document.querySelector(".frame-1-item");

    for (let i = 0; i < blocks.length; i++){
        if (i < blocks.length){
            let nowImg = document.createElement("img");
            nowImg.src = `https://image.tmdb.org/t/p/w500${movies[i].poster_path}`;

            blocks[i].appendChild(nowImg)

        }
    }
}



// function ratedFilms(movies){
//     let blocks = document.querySelectorAll("#frame-3-img");
//     let titles = document.querySelectorAll(".title-movie3");
//     let clocks = document.querySelectorAll(".clock-span3");
//     let ratings = document.querySelectorAll(".rating-span3");

//     blocks.forEach(block => {
//         while (block.firstChild) {
//             block.removeChild(block.firstChild);
//         }
//     });
//     titles.forEach(title => title.innerHTML = "");
//     clocks.forEach(clock => clock.innerHTML = "");
//     ratings.forEach(rating => rating.innerHTML = "");

//     for (let i = 0; i < blocks.length; i++) {
//         if (i < movies.length) {
//             let img = document.createElement("img");
//             let imageUrl = `https://image.tmdb.org/t/p/w500${movies[i].poster_path}`;
//             img.src = imageUrl;
//             blocks[i].appendChild(img);
//             titles[i].innerHTML = movies[i].title;
//             clocks[i].innerHTML = movies[i].release_date;
//             ratings[i].innerHTML = movies[i].vote_average.toFixed(1);
//         } else {
//             blocks[i].style.backgroundImage = "";
//             let frame2 = document.querySelector(".frame-2");
//             let main = document.querySelector(".main")

//             main.removeChild(frame2)

//             let errorDiv = document.createElement("div")
//             let errorBlock = document.createElement("h3")
//             errorBlock.textContent = "The film not found"

//             errorDiv.append(errorBlock)


//             main.append(errorDiv)
//             errorBlock.style.textAlign = "center"
//         }
//     }
// }