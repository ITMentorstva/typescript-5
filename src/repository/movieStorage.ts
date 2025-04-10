

export function rememberMovieSearch(movie: SingleMovieSearch): void {

    const existingMovies = getAllMovieSearches();

    const alreadyExists:boolean = existingMovies.some((m: SingleMovieSearch) =>
        m.name.toLowerCase() === movie.name.toLowerCase()
        && m.year === movie.year
    );

    if(alreadyExists) {
        return;
    }

    existingMovies.push(movie);

    localStorage.setItem("rememberedMovies", JSON.stringify(existingMovies));
}

export function getAllMovieSearches(): SingleMovieSearch[] {
    const data = localStorage.getItem("rememberedMovies");
    return data ? JSON.parse(data) : [];
}

export function clearMovieStorage(): void {
    localStorage.removeItem("rememberedMovies");
}