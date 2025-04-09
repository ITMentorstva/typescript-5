import {SingleMovieInterface} from "./SingleMovieInterface";


export interface ApiSuccessInterface {
    Response: string,
    Search: SingleMovieInterface[],
    totalResult: string
}