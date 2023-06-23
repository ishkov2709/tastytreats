import axios from 'axios';

const API_KEY = '37206496-4ba23d7a61facc457fce3b97c';
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

export async function searchImages(searchQuery, page) {
  const apiUrl = `${BASE_URL}?category=${searchQuery}&page=${page}&per_page=40`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data.results;
    return data;
  } catch (error) {
    throw new Error('An error occurred while fetching images.');
  }
}
