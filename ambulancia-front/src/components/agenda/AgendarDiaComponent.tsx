import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Agenda } from '../../types/agenda/Agenda';

interface AgendaFormProps {
  onSave: () => Promise<Agenda | null>;
}

const AgendarDiaComponent: React.FC<AgendaFormProps> = ({ onSave }) => {
  const navigate = useNavigate();

  // Chama onSave() para criar a agenda e redireciona usando o ID retornado.
  const handleCreateAndRedirect = async () => {
    const newAgenda = await onSave();
    if (newAgenda && newAgenda.id) {
      navigate(`/gerenciar-agendamentos/${newAgenda.id}`);
    }
  };

  return (
    <div className="agenda-container">
      <button onClick={handleCreateAndRedirect}>Criar Agenda</button>
    </div>
  );
};

export default AgendarDiaComponent;