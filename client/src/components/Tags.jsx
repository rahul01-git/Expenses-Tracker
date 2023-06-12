import React from "react";

const Tags = () => {
  return (
    <div>
      <form
        action="#"
        className="space-y-6 mt-5 sm:mx-auto sm:w-full sm:max-w-sm border-2 border-indigo-400 p-3"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-medium leading-9 tracking-wider text-gray-800 pb-5 border-b border-gray-300">
            Tags
          </h2>
        </div>
        <div>
          <label
            htmlFor="tagTitle"
            className="block text-sm font-medium leading-6 text-gray-900 mb-3"
          >
            Tag Title
          </label>
          <input
            type="text"
            name="tag_title"
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
