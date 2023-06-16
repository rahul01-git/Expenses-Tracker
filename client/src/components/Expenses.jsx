import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onCategoryFetch } from "../api/categoryApi";
import {
  onDeletedExpensesFetch,
  onExpenses,
  onExpensesSoftDelete,
  onExpensesDelete,
  onExpensesFetch,
  onExpensesRecover,
} from "../api/expensesApi";
import { fetchProtectedInfo } from "../api/auth";
import { populateData } from "../redux/slices/userSlice";

const Expenses = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [viewSoftDeleted, setViewSoftDeleted] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [values, setValues] = useState({
    created_by: user?.payload?.id,
    title: "",
    note: "",
    category_id: "",
    amount: "",
    expenses_date: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    try {
      const dataMsg = await onExpenses(values);
      setSuccess(dataMsg.data.message);
      setError("");
      const { data } = await fetchProtectedInfo();
      dispatch(populateData(data));
      formRef.current.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      setValues({
        created_by: user?.payload?.id,
        title: "",
        note: "",
        category_id: "",
        amount: "",
        expenses_date: "",
      });

      const response = await onExpensesFetch(user?.payload?.id);
      setExpenses(response.data.rows);
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
      setSuccess(false);

      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleSoftDelete = async (id) => {
    try {
      await onExpensesSoftDelete(id);
      const { data } = await fetchProtectedInfo();
      dispatch(populateData(data));
      const expense = await onExpensesFetch(user?.payload?.id);
      console.log(expense.data.rows);
      setExpenses(expense.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRecover = async (id) => {
    try {
      await onExpensesRecover(id);
      const { data } = await fetchProtectedInfo();
      dispatch(populateData(data));
      showDeleted();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await onExpensesDelete(id);
      const expense = await onDeletedExpensesFetch(user?.payload?.id);
      setExpenses(expense.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  const showDeleted = async () => {
    try {
      const expense = await onDeletedExpensesFetch(user?.payload?.id);
      setViewSoftDeleted(true);
      setExpenses(expense.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const response = await onCategoryFetch();
    const expense = await onExpensesFetch(user?.payload?.id);
    setCategories(response.data.category);
    setExpenses(expense.data.rows);
    setViewSoftDeleted(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-[2fr,3fr] gap-8 ">
      <div className="form-container h-96">
        <form
          encType="multipart/form-data"
          ref={formRef}
          onSubmit={(e) => handleSubmit(e)}
          className="space-y-6 mt-5  p-3 overflow-y-auto"
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-medium leading-9 tracking-wider text-gray-800 pb-5 border-b border-gray-300">
              Expenses And Income
            </h2>
            {success && (
              <p className="text-white rounded-sm mb-3 p-3 bg-green-500">
                {success}
              </p>
            )}
            {error && (
              <p className="text-white rounded-sm mb-3 p-3 bg-red-500">
                {error}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900 mb-3"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={(e) => onChange(e)}
              required
              value={values.title}
              className="w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="note"
              className="block text-sm font-medium leading-6 text-gray-900 mb-3"
            >
              Note
            </label>
            <input
              name="note"
              className="w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none mb-0"
              onChange={(e) => onChange(e)}
              value={values.note}
            />
          </div>
          <div>
            <label
              htmlFor="expenses_date"
              className="block text-sm font-medium leading-6 text-gray-900 mb-3"
            >
              Date
            </label>
            <input
              type="date"
              name="expenses_date"
              value={values.expenses_date}
              onChange={(e) => onChange(e)}
              className={`w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none`}
            />
          </div>
          <div>
            <label
              htmlFor="category_id"
              className="block text-sm font-medium leading-6 text-gray-900 mb-3"
            >
              Category
            </label>
            <select
              name="category_id"
              onChange={(e) => onChange(e)}
              value={values.category_id}
              className={`w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none`}
            >
              <option>---Select Category---</option>
              {categories &&
                categories.map((cat, idx) => (
                  <option value={cat.id} key={idx}>
                    {cat.category_name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium leading-6 text-gray-900 mb-3"
            >
              Amount
            </label>
            <input
              type="number"
              name="amount"
              onChange={(e) => onChange(e)}
              className="w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none"
              placeholder="+ve for income -ve for expense"
              required
              value={values.amount}
            />
          </div>
          <div className="grid">
            <button className=" bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-600">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden sm:rounded-lg">
            <div className="h-96 overflow-y-auto">
              {viewSoftDeleted ? (
                <button
                  className=" bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-600 cursor-pointer float-right mr-3"
                  onClick={() => fetchData()}
                >
                  Show Expenses
                </button>
              ) : (
                <button
                  className=" bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-600 cursor-pointer float-right mr-3"
                  onClick={() => showDeleted()}
                >
                  Show Deleted
                </button>
              )}

              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      S.N.
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Note
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Handle
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {expenses.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No Expenses available.
                      </td>
                    </tr>
                  ) : (
                    expenses.map((expense, idx) => (
                      <tr
                        className="border-b dark:border-neutral-500"
                        key={idx}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {idx + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {expense.title}
                        </td>
                        <td
                          className={`whitespace-nowrap px-6 py-4 ${
                            expense.amount < 0
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {expense.amount}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {expense.note || "not provided"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {categories &&
                            categories.map(
                              (cat) =>
                                cat?.id === expense.category_id && (
                                  <span key={cat.id}>{cat.category_name}</span>
                                )
                            )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {expense.expenses_date.substring(0, 10)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {expense.soft_delete ? (
                            <>
                              <button
                                onClick={() => handleDelete(expense.id)}
                                className=" bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-600 cursor-pointer"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => handleRecover(expense.id)}
                                className=" bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-600 cursor-pointer ml-3"
                              >
                                Recover
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleSoftDelete(expense.id)}
                              className=" bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-600 cursor-pointer"
                            >
                              Soft Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
