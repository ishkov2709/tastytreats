import axios from 'axios';

export async function findMasterClasses() {
  const url = `https://tasty-treats-backend.p.goit.global/api/events`;
  const res = await axios.get(url);
  return res.data;
}

export async function fetchCategories() {
  try {
    const response = await axios.get(
      'https://tasty-treats-backend.p.goit.global/api/categories'
    );
    return response.data;
  } catch (error) {
    console.error('Помилка під час отримання категорій:', error);
    return [];
  }
}

export async function findRecipes(id) {
  const url = `https://tasty-treats-backend.p.goit.global/api/recipes/${id}`;
  const res = await axios.get(url);
  return res.data;
}

export async function fetchPopularRecipes() {
  const url = `https://tasty-treats-backend.p.goit.global/api/recipes/popular`;
  const res = await axios.get(url);
  return res.data;
}

export async function fetchAreaRecipes() {
  const url = `https://tasty-treats-backend.p.goit.global/api/areas`;
  const res = await axios.get(url);
  return res.data;
}

export async function fetchIngredientsRecipes() {
  const url = `https://tasty-treats-backend.p.goit.global/api/ingredients`;
  const res = await axios.get(url);
  return res.data;
}

export async function patchRating(id, data) {
  const url = `https://tasty-treats-backend.p.goit.global/api/recipes/${id}/rating`;
  return await axios.patch(url, data);
}
