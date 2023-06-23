import axios from "axios";

export async function findMasterClasses() {
    const url = `https://tasty-treats-backend.p.goit.global/api/events`
    const res = await axios.get(url);
    return res.data;
}

