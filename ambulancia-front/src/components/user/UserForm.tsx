import React, { useState } from 'react';
import { User } from '../../types/user/UserType';
import ButtonSpinner from '../itens/ButtonSpinner';
import { useLoading } from '../../contexts/LoadingContext';
import { useToast } from '../../hooks/useToast';

interface UserFormProps {
  userToEdit: User | null;
  onSave: (paciente: User) => void;
  onUpdate: (id: number, paciente: User) => void;
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Senha</label>
        <input
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleInputChange}
        />
      </div>
      <div>
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
      <ButtonSpinner name={isModal ? 'Atualizar' : 'Criar'} isLoading={loading} type="submit"/>
    </form>
  );
};

export default UserForm;
