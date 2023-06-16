import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  onCategory,
  onCategoryDelete,
  onCategoryFetch,
} from "../api/categoryApi";

const Categories = () => {
  const { user } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    created_by: user?.payload?.id,
    category_name: "",
    description: "",
    color: "#000000",
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
        category_name: "",
        description: "",
        color: "#000000",
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
        className="space-y-6 mt-5 border-r-4 border-indigo-600 p-3"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-medium leading-9 tracking-wider text-gray-800 pb-5 border-b border-gray-300">
            Categories
          </h2>
          {success && (
            <p className="text-white rounded-sm mb-3 p-3 bg-green-500">
              {success}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="category_name"
            className="block text-sm font-medium leading-6 text-gray-900 mb-3"
          >
            Category Name
          </label>
          <input
            type="text"
            name="category_name"
            onChange={(e) => onChange(e)}
            required
            value={values.category_name}
            className="w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900 mb-3"
          >
            Description
          </label>
          <input
            name="description"
            className="w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none mb-0"
            onChange={(e) => onChange(e)}
            value={values.description}
          />
        </div>
        <div>
          <label
            htmlFor="color"
            className="block text-sm font-medium leading-6 text-gray-900 mb-3"
          >
            Color
          </label>
          <input
            type="color"
            name="color"
            value={values.color}
            onChange={(e) => onChange(e)}
            className="w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none"
          />
        </div>
        <div className="grid">
          <button className=" bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-600">
            Add Category
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
                      Description
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Color
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Handle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length === 0 ? (
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
                          {category.category_name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {category.description || "not provided"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ background: category.color }}
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

export default Categories;
