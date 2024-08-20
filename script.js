window.addEventListener("DOMContentLoaded", function() {
    const urlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    const urlRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
    const nowPlaying = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`

    let input = document.getElementById("search")
    let span = document.getElementById("search-i")

    // span.addEventListener("click", function() {
    //     let inputValue = encodeURIComponent(input.value);
    //     location.href = `./html/search_page.html?query=${inputValue}`;
    // });

    request(urlPopular, null, result => {
        let randomMovies = [];
        let movies = result.results;

        for (let i = 0; i < 15; i++) {
            let randomIndex = Math.floor(Math.random() * movies.length);
            randomMovies.push(movies[randomIndex]);
            movies.splice(randomIndex, 1);
        }
        
        displayMovies(randomMovies, "most-popular");
        goToMovieMain(randomMovies);
    }, error => {
        console.log(`Error: ${error.message}`);
    });

    request(urlRated, null, result => {
        let randomMovies2 = [];
        let movies = result.results;

        for (let i = 0; i < 15; i++) {
            let randomIndex = Math.floor(Math.random() * movies.length);
            randomMovies2.push(movies[randomIndex]);
            movies.splice(randomIndex, 1);
        }
        
        displayMovies(randomMovies2, "most-rated");
        goToMovieMain(randomMovies2);
    }, error => {
        console.log(`Error: ${error.message}`);
    });

    request(nowPlaying, null, result => {
        let randomMovies2 = [];
        let movies = result.results;

        for (let i = 0; i < 15; i++) {
            let randomIndex = Math.floor(Math.random() * movies.length);
            randomMovies2.push(movies[randomIndex]);
            movies.splice(randomIndex, 1);
        }
        
        
        goToMovieMain(randomMovies2);
    }, error => {
        console.log(`Error: ${error.message}`);
    });
});