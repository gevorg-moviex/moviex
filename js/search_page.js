document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("search");
    const span = document.getElementById("search-i");

    const searchResults = JSON.parse(sessionStorage.getItem('searchResults'));

    // Display the movies if available
    if (searchResults) {
        displayMovies(searchResults, "frame-2-search");
        goToMovie(searchResults);
    } else {
        console.log("No search results found");
    }

    span.addEventListener("click", function() {
        let inputVal = input.value;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${inputVal}`;
        request(url, null, result => {
            let myArr = result.results;
            displayMovies(myArr);
            goToMovie(myArr);
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query'); 

    if (query) {
        const input = document.getElementById("search");
        input.value = decodeURIComponent(query); 

        
        const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
        request(searchUrl, null, result => {
            let myArr = result.results;
            displayMovies(myArr);
            goToMovie(myArr); 
        });
    }
});
