import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54665175-71b46f9aabf89f8cddeeb37be';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
    const response = await axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: page,
            per_page: PER_PAGE,
        },
    });
        return response.data;
    };