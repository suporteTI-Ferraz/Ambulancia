import React, { useState } from 'react';
import { User } from '../../types/user/UserType';
import ButtonSpinner from '../itens/ButtonSpinner';
import { useLoading } from '../../contexts/LoadingContext';
import { useToast } from '../../hooks/useToast';
import '../../styles/UserForm.css'

interface UserFormProps {
  userToEdit: User | null;
  onSave: (user: User) => void;
  onUpdate: (id: number, user: User) => void;
  isModal: Boolean; 
}

const UserForm: React.FC<UserFormProps> = ({ userToEdit, onSave, onUpdate, isModal }) => {
  const initialFormData: User = {
    id: userToEdit?.id || 0,
    nome: userToEdit?.nome || '',
    email: userToEdit?.email || '',
    senha: userToEdit?.senha || '',
    role: userToEdit?.role || '',
    deletedAt: userToEdit?.deletedAt || null,
    createdAt: "",
  };

  const [formData, setFormData] = useState<User>(initialFormData);
  const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
  const { handleLoad, dismissLoading } = useToast();
  

  const handleInputChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const toastKey = handleLoad("Carregando...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Para testar o spinner
      if (userToEdit && isModal) {
        onUpdate(userToEdit.id, formData);
      } else {
        onSave(formData); // Chama a função onSave (criação ou edição)
      }
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    } finally {
      setLoading(false);
      dismissLoading(toastKey);
    }
  };


  return (
    // modal altera aqui:
    <form className="div-form" onSubmit={handleSubmit}> 
      <div className='form-user'>
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='form-user'>
        <label>E-mail</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='form-user'>
        <label>Senha</label>
        <input
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleInputChange}
        />
      </div>
      <div className='form-cargo'>
        <label>Cargo</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Selecione um cargo
          </option>
          <option value="EMPLOYEE">Funcionário</option>
          <option value="ADMIN">Administrador</option>
        </select>
      </div>
      <div className='form-user-button'>
        <ButtonSpinner classe='button-form-user' name={isModal ? 'Atualizar' : 'Criar'} isLoading={loading} type="submit"/>
      </div>
    </form>
  );
};

export default UserForm;
