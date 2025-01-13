import React, { useEffect, useState } from 'react';
import { UserType } from '../types/UserType';
import { deleteUser, reactivateUser } from '../services/UserService'; // Adicione reactivateUser se necessário

interface UserListProps {
  users: UserType[];
  onEdit: (user: UserType) => void;
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, setUsers }) => {
  const toggleDelete = async (id: number, deletedAt: string | null) => {
    try {
      let response;
      if (deletedAt) {
        // Reativar usuário
        response = await reactivateUser(id); // Certifique-se de criar este serviço
      } else {
        // Deletar usuário
        response = await deleteUser(id);
      }

      if (response.status === 200) {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === id
              ? {
                  ...user,
                  deletedAt: deletedAt ? null : new Date().toISOString(), // Alterna entre deletado e não deletado
                }
              : user
          )
        );
      }
    } catch (error) {
      console.error('Erro ao alternar status do usuário', error);
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
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr
              key={user.id}
              style={{ backgroundColor: user.deletedAt ? '#ffcccc' : 'white' }} // Cor condicional
            >
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.deletedAt ? 'Deletado' : 'Ativo'}</td>
              <td>
                <button onClick={() => onEdit(user)}>Editar</button>
                <button onClick={() => toggleDelete(user.id, user.deletedAt)}>
                  {user.deletedAt ? 'Reativar' : 'Excluir'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;