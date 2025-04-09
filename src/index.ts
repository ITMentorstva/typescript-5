import {callOMDBApi} from "./services/omdbApiService";
import {generateYears} from "./helpers/yearGeneratorHelper";
import {listMovieResults} from "./helpers/movieElementHelper";
import {ApiResponseErrorInterface} from "./interfaces/ApiResponseErrorInterface";
import {ApiSuccessInterface} from "./interfaces/ApiSuccessInterface";
import {SingleMovieInterface} from "./interfaces/SingleMovieInterface";

const movieList = document.getElementById("movieList") as HTMLDivElement;
const searchMovieElement = document.getElementById("searchMovie") as HTMLButtonElement;
const yearSelect = document.getElementById("movieYears") as HTMLSelectElement;
const errorList = document.getElementById("errorList") as HTMLDivElement;

generateYears(1960, yearSelect, 2025);

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
    }

    const successData = response.data as ApiSuccessInterface;
    listMovieResults(successData.Search, movieList);

});