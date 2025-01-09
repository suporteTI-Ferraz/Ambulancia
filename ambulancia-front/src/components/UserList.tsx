import React, { useEffect, useState } from 'react';
import { UserType } from '../types/UserType';
import { deleteUser } from '../services/UserService';

interface UserListProps {
    users: UserType[];
    onEdit: (user: UserType) => void;
    setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
  }
  
  const UserList: React.FC<UserListProps> = ({ users, onEdit, setUsers }) => {
    const handleDelete = async (id: number) => {
      try {
        await deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error('Erro ao excluir usuário', error);
      }
    };
  
    return (
      <div>
        <h2>Lista de Usuários</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => onEdit(user)}>Editar</button>
                  <button onClick={() => handleDelete(user.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default UserList;