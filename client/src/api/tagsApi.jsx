import axios from 'axios'
axios.defaults.withCredentials = true

export async function onTags(tagsData) {
    return await axios.post(
        'http://localhost:8000/api/tags',
        tagsData
    )
}
export async function onTagsFetch(id) {
    return await axios.get(
        `http://localhost:8000/api/tags/${id}`,
    )
}
export async function onTagsArchive(id) {
    return await axios.put(
        `http://localhost:8000/api/tags/${id}`,
    )
}