import {callOMDBApi} from "./services/omdbApiService";
import {generateYears} from "./helpers/yearGeneratorHelper";

const movieList = document.getElementById("movieList") as HTMLDivElement;
const searchMovieElement = document.getElementById("searchMovie") as HTMLButtonElement;
const yearSelect = document.getElementById("movieYears") as HTMLSelectElement;

generateYears(1960, yearSelect, 2025);

searchMovieElement.addEventListener("click", async () => {

    movieList.innerHTML = "";

    const movieNameElement = document.getElementById("movieName") as HTMLInputElement;

    if (movieNameElement.value.trim() === '') {
        alert("You need to enter the movie name");
        return;
    }

    let response = await callOMDBApi([
        {key: 's', value: movieNameElement.value},
        {key: 'y', value: yearSelect.value}
    ]);

    if(response.data.Response === 'False') {
        const errorMessage = document.createElement("h2") as HTMLHeadingElement;
        errorMessage.textContent = response.data.Error+" Here are some recommendations that are similar to what you were search: ";

        const errorList = document.getElementById("errors") as HTMLDivElement;
        errorList.append(errorMessage);

        response = await callOMDBApi([
            {key: 's', value: movieNameElement.value}
        ]);
    }

    listMovieResults(response.data.Search, movieList);

});

function listMovieResults(movies: [], htmlMovieList: HTMLElement) {
    movies.forEach(movie => {

        const movieTitle = document.createElement("h2") as HTMLHeadingElement;
        movieTitle.textContent = movie.Title;

        const moviePoster = document.createElement("img") as HTMLImageElement;
        moviePoster.src = movie.Poster;

        const movieHolder = document.createElement("div") as HTMLDivElement;
        movieHolder.append(movieTitle, moviePoster);

        htmlMovieList.append(movieHolder);

    })
}