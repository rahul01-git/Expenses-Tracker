import axios from 'axios'
axios.defaults.withCredentials = true

export async function onCategory(categoryData) {
    return await axios.post(
        'http://localhost:8000/api/category',
        categoryData
    )
}
export async function onCategoryFetch() {
    return await axios.get(
        `http://localhost:8000/api/category`,
    )
}
export async function onCategoryDelete(id) {
    return await axios.delete(
        `http://localhost:8000/api/category/${id}`,
    )
}