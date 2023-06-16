import axios from "axios";
axios.defaults.withCredentials = true;

export async function onUsersFetch() {
  return await axios.get(`http://localhost:8000/api/users`);
}
export async function onStatusChange(value, id) {
  return await  await axios.put(`http://localhost:8000/api/users/status/${id}`, { value });
}
