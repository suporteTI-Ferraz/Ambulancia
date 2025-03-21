import React, { useState } from 'react';
import { User } from '../../types/user/UserType';
import { FiEdit, FiTrash, FiRefreshCw, FiSearch } from 'react-icons/fi'; // Adicione o ícone de busca
import DataCriacao from '../itens/DataFormatada';
import '../../styles/UserList.css'

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
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div >

      {/* Campo de Pesquisa */}
      <div className="custom-div-form-section2-search" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div className="custom-search-container">
          <FiSearch className="custom-search-icon-user-list" />
          <input
            className="custom-input-search"
            type="text"
            placeholder="Pesquisar por Nome ou Email"
            value={pesquisarUser}
            onChange={e => setPesquisarUser(e.target.value)}
          />
        </div>
      </div>
      
      <table className="custom-table">
        <thead className="custom-title-table">
          <tr className='custom-tr'>
            <th className='custom-th-tr'>Criação</th>
            <th className='custom-th-tr'>Nome</th>
            <th className='custom-th-tr'>Email</th>
            <th className='custom-th-tr'>Cargo</th>
            <th className='custom-th-tr'>Status</th>
            <th className='custom-th-tr'>Ações</th>
          </tr>
        </thead>
        
        <tbody className="custom-body-table">
          {sortedUsers.map((user) => (
            <tr
              key={user.id}
              style={{ backgroundColor: user.deletedAt ? '#ffcccc' : 'white' }}
            >
              <td className='custom-td'><DataCriacao createdAt={user.createdAt} /></td>
              <td className='custom-td'>{user.nome}</td>
              <td className='custom-td'>{user.email}</td>
              <td className='custom-td'>
                {user.role === 'EMPLOYEE' ? 'Funcionário' : user.role === 'ADMIN' ? 'Administrador' : user.role}
              </td>

              <td className='custom-td'>
                <span className={user.deletedAt ? 'status-desativado' : 'status-ativo'}>
                  {user.deletedAt ? 'Desativado' : 'Ativo'}
                </span>
              </td>
              <td className='custom-td'>
                {/* Ícones de Ações */}
                <FiEdit
                  className="custom-icon-action edit"
                  title="Editar"
                  onClick={() => onEdit(user)}
                />
                {user.deletedAt ? (
                  <FiRefreshCw
                    className="custom-icon-action reactivate"
                    title="Reativar"
                    onClick={() => onDelete(user.id, user.deletedAt)}
                  />
                ) : (
                  <FiTrash
                    className="custom-icon-action delete"
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
