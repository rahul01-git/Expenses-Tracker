import React, { useEffect, useState } from "react";
import { onStatusChange, onUsersFetch,onRoleChange } from "../api/usersApi";

const Users = () => {
  const [users, setUsers] = useState([]);

  const handleStatusChange = async (e, id) => {
    try {
      const value = e.target.value;
      await onStatusChange(value, id);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: value } : user
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoleChange = async (e, id) => {
    try {
      const value = e.target.value;
      await onRoleChange(value, id);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, role: value } : user
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await onUsersFetch();
      setUsers(data.users);
    };

    fetchUsers();
  }, []);
  return (
    <table className="min-w-full text-left text-sm font-light">
      <thead className="border-b font-medium dark:border-neutral-500">
        <tr>
          <th scope="col" className="px-6 py-4">
            S.N.
          </th>
          <th scope="col" className="px-6 py-4">
            FirstName
          </th>
          <th scope="col" className="px-6 py-4">
            LastName
          </th>
          <th scope="col" className="px-6 py-4">
            Email
          </th>
          <th scope="col" className="px-6 py-4">
            Role
          </th>
          <th scope="col" className="px-6 py-4">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user, idx) => (
            <tr className="border-b dark:border-neutral-500" key={idx}>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {idx + 1}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {user.first_name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {user.last_name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {user.email}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                <select
                  className={`w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none`}
                  value={user.status}
                  onChange={(e) => handleStatusChange(e, user.id)}
                >
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="blocked">Blocked</option>
                </select>
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                <select
                  className={`w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none`}
                  value={user.role}
                  onChange={(e) => handleRoleChange(e, user.id)}
                >
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Users;
