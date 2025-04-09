import {ApiParametersInterface} from "../interfaces/ApiParametersInterface";
import axios from "axios";
import {ApiResponseInterface} from "../interfaces/ApiResponseInterface";


const API_KEY = "7a3e117a";
const API_URL = "https://www.omdbapi.com/";

function buildUrl(params: ApiParametersInterface[]): string {
    let searchParams = "";

    params.forEach(params => {
        searchParams += `${params.key}=${params.value}&`;
    });

    return API_URL+"?"+searchParams+"apikey="+API_KEY;
}

export async function callOMDBApi(params: ApiParametersInterface[]): Promise<ApiResponseInterface> {
    const url = buildUrl(params);
    return await axios.get(url);
}

