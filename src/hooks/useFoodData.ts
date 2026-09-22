import axios, { type AxiosPromise } from "axios";
import type { FoodData } from "../interface/FoodData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080/food';

const fetchData = async (): AxiosPromise<FoodData[]> => {
    const response = axios.get(API_URL);
    return response;
}

export function useFoodData() {
    const query = useQuery({
         queryKey: ['foodData'],
         queryFn: fetchData,     
        retry: 2,
    })

    return { 
        ...query,
        data: query.data?.data ?? [],
    }
}