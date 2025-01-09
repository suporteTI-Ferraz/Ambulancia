import React, { useState, useEffect } from "react";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import { UserType } from "../types/UserType";
import { fetchUsers } from "../services/UserService";

const GerenciarUser = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await fetchUsers();
      setUsers(response.data);
    };
    loadUsers();
  }, []);

  const handleUserSaved = () => {
    const reloadUsers = async () => {
      const response = await fetchUsers();
      console.log(response.data)
      setUsers(response.data);
    };
    reloadUsers();
    setEditingUser(null);
  };

  const handleEdit = (user: UserType) => {
    setEditingUser(user);
  };

  return (
    <div className="gerenciar-user">
      <UserForm userToEdit={editingUser} onUserSaved={handleUserSaved} />
      <UserList users={users} onEdit={handleEdit} setUsers={setUsers} />
    </div>
  );
};

export default GerenciarUser;
