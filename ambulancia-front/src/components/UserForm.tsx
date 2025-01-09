import React, { useState, useEffect } from 'react';
import { UserType } from '../types/UserType';
import { createUser, updateUser } from '../services/UserService';

interface UserFormProps {
  userToEdit?: UserType | null;
  onUserSaved: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ userToEdit, onUserSaved }) => {
  const initialUserState: UserType = {
    id: 0,
    nome: '',
    email: '',
    senha: '',
    role: '',
  };

  const [user, setUser] = useState<UserType>(initialUserState);
  const [isEditMode, setIsEditMode] = useState<boolean>(!!userToEdit);

  useEffect(() => {
    if (userToEdit) {
      setUser(userToEdit);
      setIsEditMode(true); // Modo de edição
    } else {
      setUser(initialUserState);
      setIsEditMode(false); // Modo de criação
    }
  }, [userToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      await updateUser(user.id, user);
    } else {
      await createUser(user);
    }
    onUserSaved();
  };
  
  

  const handleResetToCreateMode = () => {
    setUser(initialUserState);
    setIsEditMode(false); // Mudar para modo de criação
  };

  return (
    <div>
      <h2>{isEditMode ? 'Editar Usuário' : 'Criar Usuário'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={user.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={user.senha}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Cargo</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecione um cargo
            </option>
            <option value="EMPLOYEE">Funcionário</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>
        <button type="submit">{isEditMode ? 'Atualizar' : 'Criar'}</button>
        {isEditMode && (
          <button type="button" onClick={handleResetToCreateMode}>
            Voltar para Criar Usuário
          </button>
        )}
      </form>
    </div>
  );
};

export default UserForm;

