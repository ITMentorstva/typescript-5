import {SingleMovieInterface} from "../interfaces/SingleMovieInterface";

export function listMovieResults(movies: SingleMovieInterface[], htmlMovieList: HTMLElement): void {

    htmlMovieList.innerHTML = "";

    movies.forEach(movie => {

        const movieTitle = document.createElement("h2") as HTMLHeadingElement;
        movieTitle.textContent = <string> movie.Title;

        const moviePoster = document.createElement("img") as HTMLImageElement;
        moviePoster.src = <string> movie.Poster;

        const movieHolder = document.createElement("div") as HTMLDivElement;
        movieHolder.append(movieTitle, moviePoster);

        htmlMovieList.append(movieHolder);

    })
}