import axios from 'axios'
axios.defaults.withCredentials = true

export async function onTags(tagsData) {
    return await axios.post(
        'http://localhost:8000/api/tags',
        tagsData
    )
}