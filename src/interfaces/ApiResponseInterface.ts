import {ApiResponseErrorInterface} from "./ApiResponseErrorInterface";
import {ApiSuccessInterface} from "./ApiSuccessInterface";

export interface ApiResponseInterface {
    config: {},
    data: ApiResponseErrorInterface | ApiSuccessInterface,
    headers: {},
    request: {},
    status: string,
    statusText: string
}
