import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { onTags, onTagsArchive, onTagsFetch } from "../api/tagsApi";

const Tags = () => {
  const { user } = useSelector((state) => state.user);
  const [tags, setTags] = useState([]);
  const [values, setValues] = useState({
    user_id: user?.payload?.id,
    tag_title: "",
    color: "#000000",
  });
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await onTags(values);
      console.log();
      setSuccess(data.data.message);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      setValues({
        user_id: user?.payload?.id,
        tag_title: "",
        color: "#000000",
      });

      const response  = await onTagsFetch(user?.payload?.id)
      setTags(response.data.tags);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) =>{
    try {
      await onTagsArchive(id)
      const response  = await onTagsFetch(user?.payload?.id)
      setTags(response.data.tags);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response  = await onTagsFetch(user?.payload?.id)
      setTags(response.data.tags);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-[1fr,2fr] gap-4">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="space-y-6 mt-5 border-r-4 border-indigo-600 p-3"
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
            value={values.tag_title}
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
            value={values.color}
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
                      Title
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
                  {!tags ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No tags available.
                      </td>
                    </tr>
                  ) : (
                    tags.map((tag, idx) => (
                      <tr
                        className="border-b dark:border-neutral-500"
                        key={idx}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {idx + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {tag.tag_title}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ background: tag.color }}
                          ></div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4" ><button onClick={()=>handleDelete(tag.id)} className=" bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-600 cursor-pointer">Archive</button></td>
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

export default Tags;
