let APIkey = "548d1947";
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let showWatchlistBtn = document.getElementById("showWatchlistBtn");


const getDate = async (movieTitle) => {
    try {
        let response = await fetch(`http://www.omdbapi.com/?apikey=${APIkey}&t=${movieTitle}`);
        let jsonData = await response.json();
        
        let div = document.createElement("div");
        div.classList.add("movieCard");
        div.innerHTML = `
            <img src="${jsonData.Poster}" alt="${jsonData.Title} Poster">
            <div class="cardText">
                <h1>${jsonData.Title}</h1>
                <p><strong>Year:</strong> ${jsonData.Year}</p>
                <p><strong>Genre:</strong> ${jsonData.Genre}</p>
                <p><strong>Director:</strong> ${jsonData.Director}</p>
                <p><strong>Actors:</strong> ${jsonData.Actors}</p>
                <p><strong>Plot:</strong> ${jsonData.Plot}</p>
                <p><strong>Language:</strong> ${jsonData.Language}</p>
                <p><strong>IMDB Rating:</strong> ${jsonData.imdbRating}</p>
                <button class="addToWatchlistBtn">Add to Watchlist</button>
            </div>
        `;

        
        document.querySelector(".card").innerHTML = "";
        document.querySelector(".card").appendChild(div);

        
        div.querySelector(".addToWatchlistBtn").addEventListener("click", () => {
            addToWatchlist(jsonData);
        });
    } catch (error) {
        console.error('Error fetching movie data:', error);
        document.querySelector(".card").innerHTML = "<h1>Error fetching data. Please try again.</h1>";
    }
};


const addToWatchlist = (movie) => {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (!watchlist.some(item => item.Title === movie.Title)) {
        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert(`${movie.Title} added to your watchlist!`);
    } else {
        alert(`${movie.Title} is already in your watchlist.`);
    }
};

const displayWatchlist = () => {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    let watchlistHTML = "";

    if (watchlist.length === 0) {
        watchlistHTML = "<h1>Your watchlist is empty.</h1>";
    } else {
        watchlist.forEach(movie => {
            watchlistHTML += `
                <div class="movieCard">
                    <img src="${movie.Poster}" alt="${movie.Title} Poster">
                    <div class="cardText">
                        <h1>${movie.Title}</h1>
                        <p><strong>Year:</strong> ${movie.Year}</p>
                        <p><strong>Genre:</strong> ${movie.Genre}</p>
                        <p><strong>Director:</strong> ${movie.Director}</p>
                        <p><strong>Actors:</strong> ${movie.Actors}</p>
                        <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
                    </div>
                </div>
            `;
        });
    }

    document.querySelector(".card").innerHTML = watchlistHTML;
};


searchBtn.addEventListener("click", () => {
    let movieName = searchInput.value.trim();
    if (movieName !== "") {
        getDate(movieName);
    } else {
        document.querySelector(".card").innerHTML = "<h1>First Search Movie Name</h1>";
    }
});


showWatchlistBtn.addEventListener("click", displayWatchlist);
