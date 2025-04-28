import classnames from "classnames";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import FornecedorForm from "../components/veiculo/FornecedorForm";
import FornecedorList from "../components/veiculo/FornecedorList";
import ManutencaoForm from "../components/veiculo/ManutencaoForm";
import ManutencaoList from "../components/veiculo/ManutencaoList";
import VeiculoForm from "../components/veiculo/VeiculoForm";
import VeiculoList from "../components/veiculo/VeiculoList";
import useGerenciarVeiculo from "../hooks/useGerenciarVeiculo";
import '../styles/GerenciarVeiculo.css';

const GerenciarVeiculo = () => {
  const {
    veiculos, isEditModalOpen, isManutencaoModalOpen, selectedManutencoes, editingVeiculo,
    fornecedores, activeTab, manutencoes, editingManutencao, editingFornecedor, isFornecedorModalOpen,
    handleSaveVeiculo, handleDeleteVeiculo, handleEditVeiculo,
    toggleEditModal, setEditingVeiculo, toggleModalManutencao, handleEdit,
    handleViewManutencoes, handleSaveManutencao, handleSaveFornecedor, handleUpdateManutencao,
    handleEditForn, setEditingFornecedor, handleDeleteFornecedor, setActiveTab, handleUpdateFornecedor, toggleModalFornecedor,
    handleEditManu, setEditingManutencao, handleDeleteManutencao, 
  } = useGerenciarVeiculo();

  const [buttonLabel, setButtonLabel] = useState("Criar");

  return (
    <div className="container-principal-veiculos">
      <div className="container-forms-e-lists">
        <h3 className="titulo-GerenciarVeiculos">Gerenciar Veículos, Fornecedores e Manutenções</h3>

        {/* Barra de navegação */}
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "veiculo" })}
              onClick={() => setActiveTab("veiculo")}
            >
              Veículo
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "fornecedor" })}
              onClick={() => setActiveTab("fornecedor")}
            >
              Fornecedor
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "manutencao" })}
              onClick={() => setActiveTab("manutencao")}
            >
              Manutenção
            </NavLink>
          </NavItem>
        </Nav>





        {/* Conteúdo das abas */}
        <TabContent activeTab={activeTab}>

          {/* Aba de Veículo */}
          <TabPane className="tab-pane-center" tabId="veiculo">
            <div className="form-list-container">
              <div className="form-section2-veiculo">
                {/* <h4 className="custom-title-table">Criar Veículo</h4> */}
                <VeiculoForm
                  isModal={false}
                  onSave={handleSaveVeiculo}
                  onCancel={() => setEditingVeiculo(null)}
                  veiculoToEdit={editingVeiculo}
                  onUpdate={handleEditVeiculo}
                  
                />
              </div>
              <div className="list-section">
                {/* <h4>Lista de Veículos</h4> */}
                <VeiculoList
                  veiculos={veiculos}
                  onEdit={handleEdit}
                  onDelete={handleDeleteVeiculo}
                  onViewManutencoes={handleViewManutencoes}
                />
              </div>
            </div>
          </TabPane>



          {/* Aba de Manutenção */}
          <TabPane tabId="manutencao">
            <ManutencaoForm
              isModal={false}
              onSave={handleSaveManutencao}
              onCancel={() => setEditingManutencao(null)}
              manutencaoToEdit={editingManutencao}
              onUpdate={handleUpdateManutencao}
              fornecedores={fornecedores}
              veiculos={veiculos}
            />
            <div className="list-section">
              <ManutencaoList
                manutencoes={manutencoes}
                onEdit={handleEditManu}
                onDelete={handleDeleteManutencao}
              />
            </div>
          </TabPane>

          {/* Aba de Fornecedor */}
          <TabPane className="tab-pane-center" tabId="fornecedor">
            <div className="form-list-container">
              <div className="form-section2-veiculo">
                <FornecedorForm
                  onSave={handleSaveFornecedor}
                  isModal={false}
                  onCancel={() => setEditingFornecedor(null)}
                  onUpdate={handleUpdateFornecedor}
                  fornecedorToEdit={editingFornecedor}
                />
              </div>
              <div className="list-section">
                <FornecedorList
                  fornecedores={fornecedores}
                  onEdit={handleEditForn}
                  onDelete={handleDeleteFornecedor}
                />
              </div>
            </div>
          </TabPane>
        </TabContent>



        {/* Modais para edição ---------------------------------------------------------------------------------- */}
        <Modal
          isOpen={isEditModalOpen}
          toggle={toggleEditModal} // Garante que o modal correto será fechado
          className="meu-modal-customizado">
          <ModalHeader toggle={toggleEditModal}>Editar Veículo</ModalHeader>
          <ModalBody>
            {editingVeiculo && (
              <VeiculoForm
                veiculoToEdit={editingVeiculo}
                onSave={handleSaveVeiculo}
                onCancel={toggleEditModal}
                onUpdate={handleEditVeiculo}
                isModal={true}
              />
            )}
        </ModalBody>
      </Modal>

        <Modal isOpen={isFornecedorModalOpen} 
        toggle={toggleModalFornecedor} 
        className="gerenciar">
          <ModalHeader toggle={toggleModalFornecedor}>Editar Fornecedor</ModalHeader>
          <ModalBody>
            {editingFornecedor && (
              <FornecedorForm
                fornecedorToEdit={editingFornecedor}
                onSave={handleSaveFornecedor}
                onCancel={toggleEditModal}
                onUpdate={handleUpdateFornecedor}
                isModal={true}
              />
            )}
          </ModalBody>
        </Modal>

        <Modal isOpen={isManutencaoModalOpen} 
        toggle={toggleModalManutencao} className="gerenciar-manutencao-modal">
          <ModalHeader toggle={toggleModalManutencao}>Editar Manutenção</ModalHeader>
          <ModalBody>
            {editingManutencao && (
              <ManutencaoForm
                onSave={handleSaveManutencao}
                onCancel={() => setEditingManutencao(null)}
                fornecedores={fornecedores}
                veiculos={veiculos}
                onUpdate={handleUpdateManutencao}
                manutencaoToEdit={editingManutencao}
                isModal={true}
              />
            )}
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default GerenciarVeiculo;
