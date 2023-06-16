import axios from 'axios'
axios.defaults.withCredentials = true

export async function onExpenses(expensesData) {
    return await axios.post(
        'http://localhost:8000/api/expenses',
        expensesData
    )
}
export async function onExpensesFetch(id) {
    return await axios.get(
        `http://localhost:8000/api/expenses/${id}`,
    )
}
export async function onDeletedExpensesFetch(id) {
    return await axios.get(
        `http://localhost:8000/api/expenses/deleted/${id}`,
    )
}
export async function onExpensesSoftDelete(id) {
    return await axios.put(
        `http://localhost:8000/api/expenses/${id}`,
    )
}
export async function onExpensesRecover(id) {
    return await axios.put(
        `http://localhost:8000/api/expenses/recover/${id}`,
    )
}
export async function onExpensesDelete(id) {
    return await axios.delete(
        `http://localhost:8000/api/expenses/${id}`,
    )
}