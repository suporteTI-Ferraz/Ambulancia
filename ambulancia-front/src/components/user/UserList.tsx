import React, { useState } from 'react';
import { User } from '../../types/user/UserType';
import { FiEdit, FiTrash, FiRefreshCw, FiSearch } from 'react-icons/fi'; // Adicione o ícone de busca
import { deleteUser, reactivateUser } from '../../services/UserService'; // Adicione reactivateUser se necessário
import DataCriacao from '../itens/DataFormatada';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, setUsers }) => {
  const [pesquisarUser, setPesquisarUser] = useState('');
  

  // Função para filtrar os usuários com base no nome ou email
  const filteredUsers = users.filter(user =>
    user.nome.toLowerCase().includes(pesquisarUser.toLowerCase()) ||
    user.email.toLowerCase().includes(pesquisarUser.toLowerCase())
  );

  const toggleDelete = async (id: number, deletedAt: string | null) => {
    try {
      let response;
      if (deletedAt) {
        // Reativar usuário
        response = await reactivateUser(id);
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
                  deletedAt: deletedAt ? null : new Date().toISOString(),
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

      {/* Campo de Pesquisa */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <FiSearch style={{ marginRight: '8px', fontSize: '20px', color: '#007BFF' }} />
        <input
          type="text"
          placeholder="Pesquisar por Nome ou Email"
          value={pesquisarUser}
          onChange={e => setPesquisarUser(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '14px',
            border: '2px solid #007BFF',
            borderRadius: '4px',
            width: '100%',
            maxWidth: '400px',
          }}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data de Criação</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr
              key={user.id}
              style={{ backgroundColor: user.deletedAt ? '#ffcccc' : 'white' }}
            >
              <td>{user.id}</td>
              <td><DataCriacao createdAt={user.createdAt} /></td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.deletedAt ? 'Desativado' : 'Ativo'}</td>
              <td>
                {/* Ícones de Ações */}
                <FiEdit
                  className="icon-action edit"
                  title="Editar"
                  onClick={() => onEdit(user)}
                />
                {user.deletedAt ? (
                  <FiRefreshCw
                    className="icon-action reactivate"
                    title="Reativar"
                    onClick={() => toggleDelete(user.id, user.deletedAt)}
                  />
                ) : (
                  <FiTrash
                    className="icon-action delete"
                    title="Desativar"
                    onClick={() => toggleDelete(user.id, null)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
