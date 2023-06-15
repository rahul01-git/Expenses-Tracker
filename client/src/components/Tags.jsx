import React, { useState } from "react";
import { useSelector } from "react-redux";
import { onTags } from "../api/others";

const Tags = () => {
  const { user } = useSelector((state) => state.user);
  const [values, setValues] = useState({
    user_id: user?.payload?.id,
    tag_title: "",
    color: "#00000",
  });
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await onTags(values)
      console.log()
      setSuccess(data.data.message);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="space-y-6 mt-5 sm:mx-auto sm:w-full sm:max-w-sm border-2 border-indigo-400 p-3"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-medium leading-9 tracking-wider text-gray-800 pb-5 border-b border-gray-300">
            Tags
          </h2>
          {success && (
            <p className="text-white rounded-sm mb-3 p-3 bg-green-500">
              {success}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="tag_title"
            className="block text-sm font-medium leading-6 text-gray-900 mb-3"
          >
            Tag Title
          </label>
          <input
            type="text"
            name="tag_title"
            onChange={(e) => onChange(e)}
            required
            className="w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none"
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
            onChange={(e) => onChange(e)}
            className="w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none"
          />
        </div>
        <div className="grid">
          <button className=" bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-600">
            Add Tag
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tags;
