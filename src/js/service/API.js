import axios from 'axios';

export async function findMasterClasses() {
  const url = `https://tasty-treats-backend.p.goit.global/api/events`;
  const res = await axios.get(url);
  return res.data;
}

export async function findRecipes(id) {
    const url = `https://tasty-treats-backend.p.goit.global/api/recipes/${id}`
    const res = await axios.get(url);
    return res.data;
}