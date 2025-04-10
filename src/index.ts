import {callOMDBApi} from "./services/omdbApiService";
import {generateYears} from "./helpers/yearGeneratorHelper";
import {listMovieResults} from "./helpers/movieElementHelper";
import {ApiResponseErrorInterface} from "./interfaces/ApiResponseErrorInterface";
import {ApiSuccessInterface} from "./interfaces/ApiSuccessInterface";
import {SingleMovieInterface} from "./interfaces/SingleMovieInterface";
import {clearMovieStorage, getAllMovieSearches, rememberMovieSearch} from "./repository/movieStorage";

const movieList = document.getElementById("movieList") as HTMLDivElement;
const searchMovieElement = document.getElementById("searchMovie") as HTMLButtonElement;
const yearSelect = document.getElementById("movieYears") as HTMLSelectElement;
const errorList = document.getElementById("errorList") as HTMLDivElement;
const existingMoviesDiv = document.getElementById("existingMovies") as HTMLDivElement;
const clearAllSearches = document.getElementById("clearAllSearches") as HTMLButtonElement;

generateYears(1960, yearSelect, 2025);


listAllMovieLabels();

clearAllSearches.addEventListener("click", (): void => {
    clearMovieStorage();
    existingMoviesDiv.innerHTML = "";
});


searchMovieElement.addEventListener("click", async () => {

    movieList.innerHTML = "";
    errorList.innerHTML = "";

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

        const errorData = response.data as ApiResponseErrorInterface;

        const errorMessage = document.createElement("h2") as HTMLHeadingElement;
        errorMessage.textContent = errorData.Error+" Here are some recommendations that are similar to what you were search: ";

        errorList.append(errorMessage);

        response = await callOMDBApi([
            {key: 's', value: movieNameElement.value}
        ]);
    } else {
        rememberMovieSearch(
            {name: movieNameElement.value, year: yearSelect.value}
        );
        listAllMovieLabels();
    }

    const successData = response.data as ApiSuccessInterface;
    listMovieResults(successData.Search, movieList);

});


function listAllMovieLabels(): void {

    existingMoviesDiv.innerHTML = "";

    const existingMovies: SingleMovieSearch[] = getAllMovieSearches();

    existingMovies.forEach((movie: SingleMovieSearch) => {
        const movieLabelTitle = document.createElement("div") as HTMLDivElement;
        movieLabelTitle.textContent = `${movie.name}, ${movie.year}`;
        movieLabelTitle.setAttribute("data-movie-name", movie.name);
        movieLabelTitle.setAttribute("data-movie-year", movie.year);
        existingMoviesDiv.append(movieLabelTitle);

        movieLabelTitle.addEventListener("click", async () => {

            let response = await callOMDBApi([
                {key: 's', value: movie.name},
                {key: 'y', value: movie.year}
            ]);

            const successData = response.data as ApiSuccessInterface;
            listMovieResults(successData.Search, movieList);
        });
    });
}