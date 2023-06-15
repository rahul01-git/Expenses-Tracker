import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  onCategory,
  onCategoryDelete,
  onCategoryFetch,
} from "../api/categoryApi";

const Expenses = () => {
  const { user } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    created_by: user?.payload?.id,
    title: "",
    note: "",
    image: "#000000",
  });

  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await onCategory(values);
      console.log();
      setSuccess(data.data.message);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      setValues({
        created_by: user?.payload?.id,
        title: "",
        note: "",
        image: "#000000",
      });

      const response = await onCategoryFetch();
      setCategories(response.data.category);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await onCategoryDelete(id);
      const response = await onCategoryFetch();
      setCategories(response.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await onCategoryFetch();
      setCategories(response.data.category);
    };

    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-[1fr,1fr] gap-4">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="space-y-6 mt-5 border-r-4 border-indigo-600 p-3 h-96 overflow-y-auto"
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
            htmlFor="image"
            className="block text-sm font-medium leading-6 text-gray-900 mb-3"
          >
            image
          </label>
          <input type="file" name="image" onChange={(e) => onChange(e)} className="w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none"/>
        </div>
        <div>
          <label
            htmlFor="expenses_date"
            className="block text-sm font-medium leading-6 text-gray-900 mb-3"
          >
            Date
          </label>
          <input type="date" name="expenses_date" onChange={(e) => onChange(e)} className="w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none"/>
        </div>
        <div>
          <label
            htmlFor="category_id"
            className="block text-sm font-medium leading-6 text-gray-900 mb-3"
          >
            Category
          </label>
          <select name="category_id"  onChange={(e) => onChange(e)}  className="block text-sm font-medium leading-6 text-gray-900 mb-3">
            <option value="one">one</option>
            <option value="two">two</option>
            <option value="three">three</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900 mb-3"
          >
            Amount
          </label>
          <input type="number" name="amount" onChange={(e) => onChange(e)} className="w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none" placeholder="+ve for income -ve for expense"/>
        </div>
        <div className="grid">
          <button className=" bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-600">
            Add Transaction
          </button>
        </div>
      </form>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden sm:rounded-lg">
            <div className="h-96 overflow-y-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      S.N.
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      note
                    </th>
                    <th scope="col" className="px-6 py-4">
                      image
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Handle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!categories ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No Categories available.
                      </td>
                    </tr>
                  ) : (
                    categories.map((category, idx) => (
                      <tr
                        className="border-b dark:border-neutral-500"
                        key={idx}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {idx + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {category.title}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {category.note || "not provided"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ background: category.image }}
                          ></div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <button
                            onClick={() => handleDelete(category.id)}
                            className=" bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-600 cursor-pointer"
                          >
                            Delete
                          </button>
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
