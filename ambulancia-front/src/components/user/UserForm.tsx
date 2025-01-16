import React, { useState, useEffect } from 'react';
import { User } from '../../types/user/UserType';
import { createUser, updateUser } from '../../services/UserService';

interface UserFormProps {
  userToEdit?: User | null;
  onUserSaved: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ userToEdit, onUserSaved }) => {
  const initialUserState: User = {
    id: 0,
    nome: '',
    email: '',
    senha: '',
    role: '',
    deletedAt: null,
    createdAt: '',
  };

  const [user, setUser] = useState<User>(initialUserState);

  useEffect(() => {
    if (userToEdit) {
      setUser(userToEdit);
    } else {
      setUser(initialUserState);
    }
  }, [userToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userToEdit) {
      await updateUser(user.id, user);
    } else {
      await createUser(user);
    }
    onUserSaved();
  };

  return (
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
        <label>Email</label>
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
      <button className='edit-userForm' type="submit">{userToEdit ? 'Atualizar' : 'Criar'}</button>
    </form>
  );
};

export default UserForm;
