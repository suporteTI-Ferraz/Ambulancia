
import React, { useState } from 'react';
import { Motorista } from '../../types/motorista/MotoristaType';
import ButtonSpinner from '../itens/ButtonSpinner';
import { useLoading } from '../../contexts/LoadingContext';
import { useToast } from '../../hooks/useToast';
import InputMask from 'react-input-mask';
import '../../styles/MotoristaForm.css'

interface MotoristaFormProps {
  motoristaToEdit: Motorista | null;
  onSave: (motorista: Motorista) => void;
  onUpdate: (id: number, motorista: Motorista) => void;
  isModal: Boolean; 
};

export const MotoristaForm: React.FC<MotoristaFormProps> = ({
  motoristaToEdit, onSave, onUpdate, isModal
}) => {
    const initialFormData: Motorista = {
        id: motoristaToEdit?.id || 0,
        nomeMotorista: motoristaToEdit?.nomeMotorista || '',
        telefone: motoristaToEdit?.telefone || '',
        deletedAt: motoristaToEdit?.deletedAt || null,
        createdAt: "",
    };

    const [formData, setFormData] = useState<Motorista>(initialFormData);
    const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
    const { handleLoad, dismissLoading } = useToast();

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const {name, value} = e.target;
      setFormData({ ...formData, [name]: value });
    };

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
        <div className={isModal ? 'modal-root' : ''}>
            <form onSubmit={handleSubmit} className={isModal ? 'modal-form' : ''}>
                <div className='div-input-motorista'>
                    <label className='titulo-motorista'>Nome</label>
                    <input 
                      type="text"
                      name='nomeMotorista'
                      value={formData.nomeMotorista}
                      onChange={handleInputChange}
                      required
                    />
                </div>
                <div className='div-input-motorista'>
                    <label className='titulo-motorista'>Telefone</label>
                    <InputMask
                      mask="(99) 99999-9999"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      className="input-telefone-motorista"
                      placeholder="(00) 00000-0000"
                      required
                    />
                </div>
                <ButtonSpinner classe="button-form-motorista" name={isModal ? "Atualizar" : "Salvar"} isLoading={loading} type='submit'/>
            </form>
        </div>
    )
}

export default MotoristaForm;
