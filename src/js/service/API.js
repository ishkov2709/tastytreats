import axios from 'axios';

export async function findMasterClasses() {
  const url = `https://tasty-treats-backend.p.goit.global/api/events`;
  const res = await axios.get(url);
  return res.data;
}

export async function fetchCategories() {
    try {
      const response = await axios.get('https://tasty-treats-backend.p.goit.global/api/categories');
      return response.data;
    } catch (error) {
      console.error('Помилка під час отримання категорій:', error);
      return [];
    }
  }

export async function findRecipes(id) {
    const url = `https://tasty-treats-backend.p.goit.global/api/recipes/${id}`
    const res = await axios.get(url);
    return res.data;
}
