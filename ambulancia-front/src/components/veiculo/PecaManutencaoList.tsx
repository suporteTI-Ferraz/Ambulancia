import React, { useState } from "react";
import { Modal } from "react-bootstrap"; // Modal do react-bootstrap
import { FiEdit, FiSearch, FiTrash, FiRefreshCw } from "react-icons/fi"; // Ícones de edição, pesquisa, desativar e reativar
import PecaManutencaoForm from "./PecaManutencaoForm"; // Suponho que você tenha esse componente de formulário

interface PecaManutencao {
  id: number;
  createdAt: string;
  nomePeca: string;
  quantidade: number;
  custoUnitario: number;
  deletedAt: string | null;
}

interface PecaManutencaoListProps {
  pecaManutencoes: PecaManutencao[];
  onEdit: (pecaManutencao: PecaManutencao) => void;
  onDelete: (id: number, deletedAt: string | null) => void;
  onUpdate: (id: number, pecaManutencao: PecaManutencao) => void;
}

const PecaManutencaoList: React.FC<PecaManutencaoListProps> = ({
  pecaManutencoes,
  onEdit,
  onDelete,
  onUpdate,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [pecaToEdit, setPecaToEdit] = useState<PecaManutencao | null>(null);
  const [pesquisarPecaManutencao, setPesquisarPecaManutencao] = useState('');

  const filteredPecaManutencoes = pecaManutencoes.filter(peca =>
    peca.createdAt.toLowerCase().includes(pesquisarPecaManutencao.toLowerCase())
  );

  const sortedPecaManutencoes = filteredPecaManutencoes.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleEdit = (peca: PecaManutencao) => {
    setPecaToEdit({ ...peca }); // Cópia do objeto da peça
    setShowModal(true); // Exibe o modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPecaToEdit(null); // Limpa a peça para editar
  };

  return (
    <div className="form-section2-funcionario">
      {/* Campo de Pesquisa */}
      <div className="custom-search-container">
        <FiSearch className="custom-search-icon-user-list" />
        <input
          className="custom-input-search"
          type="text"
          placeholder="Pesquisar por Data de Criação"
          value={pesquisarPecaManutencao}
          onChange={(e) => setPesquisarPecaManutencao(e.target.value)}
        />
      </div>

      {/* Tabela de Peças */}
      <table className="custom-table">
        <thead>
          <tr className="custom-th-tr">
            <th className="custom-th">Data de Criação</th>
            <th className="custom-th">Nome da Peça</th>
            <th className="custom-th">Quantidade</th>
            <th className="custom-th">Custo da Peça</th>
            <th className="custom-th">Status</th>
            <th className="custom-th">Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedPecaManutencoes.map((peca) => (
            <tr
              key={peca.id}
              className="custom-tr"
              style={{ backgroundColor: peca.deletedAt ? '#ffcccc' : 'white' }}
            >
              <td className="custom-td">{peca.createdAt}</td>
              <td className="custom-td">{peca.nomePeca}</td>
              <td className="custom-td">{peca.quantidade}</td>
              <td className="custom-td">{peca.custoUnitario}</td>
              <td className="custom-td">{peca.deletedAt ? 'Desativado' : 'Ativo'}</td>
              <td className="custom-td">
                <div className="icon-container">
                  <FiEdit
                    className="custom-icon-action edit"
                    title="Editar"
                    onClick={() => handleEdit(peca)} // Chama a função de editar
                  />
                  {/* Se a peça não estiver desativada, mostramos o botão de desativar */}
                  {!peca.deletedAt && (
                    <FiTrash
                      className="custom-icon-action delete"
                      title="Desativar"
                      onClick={() => onDelete(peca.id, null)} // Passa null para desativar
                    />
                  )}
                  {/* Se a peça estiver desativada, mostramos o botão de reativar */}
                  {peca.deletedAt && (
                    <FiRefreshCw
                      className="custom-icon-action reactivate"
                      title="Reativar"
                      onClick={() => onDelete(peca.id, peca.deletedAt)} // Passa o deletedAt para reativar
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Edição */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Peça de Manutenção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pecaToEdit && (
            <PecaManutencaoForm
              onSave={onEdit} // Usando o onEdit para salvar ou atualizar a peça
              onCancel={handleCloseModal} // Função para cancelar e fechar o modal
              onUpdate={onUpdate} // Função para atualizar a peça
              pecaManutencaoToEdit={pecaToEdit} // Passando os dados da peça a ser editada
              isModal={true} // Indicando que o formulário está em um modal
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PecaManutencaoList;
