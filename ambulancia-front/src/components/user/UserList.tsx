import React, { useState } from 'react';
import { User } from '../../types/user/UserType';
import { FiEdit, FiTrash, FiRefreshCw, FiSearch } from 'react-icons/fi'; // Adicione o ícone de busca
import DataCriacao from '../itens/DataFormatada';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number, deletedAt: string | null) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  const [pesquisarUser, setPesquisarUser] = useState('');
  

  // Função para filtrar os usuários com base no nome ou email
  const filteredUsers = users.filter(user => {
    const nome = user.nome ? user.nome.toLowerCase() : '';
    const email = user.email ? user.email.toLowerCase() : '';
    const pesquisa = pesquisarUser.toLowerCase();
  
    return nome.includes(pesquisa) || email.includes(pesquisa);
  });

    // Ordenar os usuários pela data de criação ou pelo id (ordem decrescente)
    const sortedUsers = filteredUsers.sort((a, b) => {
      // Opção 1: Ordenar pelo id (decrescente)
      // return b.id - a.id;
  
      // Opção 2: Ordenar pela data de criação (decrescente)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

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
            <th>Criação</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
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
                    onClick={() => onDelete(user.id, user.deletedAt)}
                  />
                ) : (
                  <FiTrash
                    className="icon-action delete"
                    title="Desativar"
                    onClick={() => onDelete(user.id, null)}
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
