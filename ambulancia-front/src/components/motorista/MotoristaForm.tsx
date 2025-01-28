import React, { useState } from 'react';
import { Motorista } from '../../types/motorista/MotoristaType';
import ButtonSpinner from '../itens/ButtonSpinner';
import { useLoading } from '../../contexts/LoadingContext';
import { useToast } from '../../hooks/useToast';

interface MotoristaFormProps {
  motoristaToEdit: Motorista | null;
  onSave: (motorista: Motorista) => void;
  onUpdate: (id: number, motorista: Motorista) => void;
  isModal: Boolean; 
};

export const MotoristaForm: React.FC<MotoristaFormProps> = ({motoristaToEdit, onSave, onUpdate, isModal}) =>{
    const initialFormData: Motorista = {
        id: motoristaToEdit?.id || 0,
        nomeMotorista: motoristaToEdit?.nomeMotorista || '',
        deletedAt: motoristaToEdit?.deletedAt || null,
        createdAt: "",
    };

      const [formData, setFormData] = useState<Motorista>(initialFormData);
      const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
      const { handleLoad, dismissLoading } = useToast();

      const handleInputChange = (e: React.ChangeEvent<HTMLElement>) =>{
        const {name, value} = e.target as HTMLInputElement;
        setFormData({ ...formData, [name]: value });
      }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        const toastKey = handleLoad("Carregando...");
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Para testar o spinner
            if (motoristaToEdit && isModal) {
                onUpdate(motoristaToEdit.id, formData);
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

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome</label>
                <input 
                type="text"
                name='nomeMotorista'
                value={formData.nomeMotorista}
                onChange={handleInputChange}
                required
                />
            </div>
            <ButtonSpinner name={isModal ? "Atualizar" : "Salvar"} isLoading={loading} type='submit'/>
        </form>
    )

}

export default MotoristaForm;