const BASE_URL = "https://pixabay.com/api";
const API_KEY = "24794015-09b4d3adaf3fdc4c67b01cd25";
export const PER_PAGE = 12;

export async function fetchImg(query, page) {
    const response = await fetch(`${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}
`);
    const parsedResponse = await response.json();
    const data = await parsedResponse.hits;
    return data;
}