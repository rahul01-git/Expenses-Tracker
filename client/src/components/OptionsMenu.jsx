import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const OptionsMenu = () => {
  const { user } = useSelector((state) => state.user);
  const role = user.payload.role;

  return (
    <div className="flex justify-around my-4 bg-indigo-200">
      <NavLink className="px-4 py-2 my-2" to="/tags">
        Tags
      </NavLink>
      <NavLink className="px-4 py-2 my-2" to="/expenses">
        Expenses
      </NavLink>
      {role === "admin" && (
        <>
          <NavLink className="px-4 py-2 my-2" to="/category">
            Category
          </NavLink>
          <NavLink className="px-4 py-2 my-2" to="/users">
            Users
          </NavLink>
        </>
      )}
    </div>
  );
};

export default OptionsMenu;
