
import { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody } from "reactstrap";
import classnames from "classnames";
import VeiculoForm from "../components/veiculo/VeiculoForm";
import VeiculoList from "../components/veiculo/VeiculoList";
import FornecedorForm from "../components/veiculo/FornecedorForm";
import FornecedorList from "../components/veiculo/FornecedorList";
import useGerenciarVeiculo from "../hooks/useGerenciarVeiculo";
import ManutencaoForm from "../components/veiculo/ManutencaoForm";
import ManutencaoList from "../components/veiculo/ManutencaoList";
import PecaManutencaoForm from "../components/veiculo/PecaManutencaoForm";
import PecaManutencaoList from "../components/veiculo/PecaManutencaoList";
import '../styles/GerenciarVeiculo.css'


const GerenciarVeiculo = () => {
  const {
    veiculos, isEditModalOpen, isManutencaoModalOpen, selectedManutencoes, editingVeiculo,
    fornecedores, activeTab, manutencoes, editingManutencao, editingFornecedor, isFornecedorModalOpen,
    editingPecaManutencao, pecaManutencoes,
    handleSaveVeiculo, handleDeleteVeiculo, handleEditVeiculo,
    toggleEditModal, setEditingVeiculo, toggleModalManutencao, handleEdit,
    handleViewManutencoes, handleSaveManutencao, handleSaveFornecedor, handleUpdateManutencao,
    handleEditForn, setEditingFornecedor, handleDeleteFornecedor, setActiveTab, handleUpdateFornecedor, toggleModalFornecedor,
    handleEditManu, setEditingManutencao, handleDeleteManutencao,  handleEditPecaManu, handleSavePecaManutencao, setEditingPecaManutencao,
    handleUpdatePecaManutencao,
  } = useGerenciarVeiculo();

  return (
    <div className="container-principal-veiculos">
      <div className="container-forms-e-lists">
        <h3>Gerenciar Veículos, Fornecedores e Manutenções</h3>
  
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
              className={classnames({ active: activeTab === "manutenção" })}
              onClick={() => setActiveTab("manutenção")}
            >
              Manutenção
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "peça" })}
              onClick={() => setActiveTab("peça")}
            >
              Peça
            </NavLink>
          </NavItem>
        </Nav>
  
        {/* Conteúdo das abas */}
        <TabContent activeTab={activeTab}>
          {/* Aba de Veículo */}
          <TabPane className="tab-pane-center" tabId="veiculo">
            <div className="form-list-container">
              <div className="form-section2-veiculo">
                <h4>Criar Veículo</h4>
                <VeiculoForm
                  isModal={false}
                  onSave={handleSaveVeiculo}
                  onCancel={() => setEditingVeiculo(null)}
                  veiculoToEdit={editingVeiculo}
                  onUpdate={handleEditVeiculo}
                />
              </div>
              <div className="list-section">
                <h4>Lista de Veículos</h4>
                <VeiculoList
                  veiculos={veiculos}
                  onEdit={handleEdit}
                  onDelete={handleDeleteVeiculo}
                  onViewManutencoes={handleViewManutencoes}
                />
              </div>
            </div>
          </TabPane>

          {/* Aba de Fornecedor */}
          <TabPane className="tab-pane-center" tabId="fornecedor">
            <div className="form-list-container">
              <div className="form-section2-veiculo">
                <h4>Gerenciar Fornecedores</h4>
                <FornecedorForm
                  onSave={handleSaveFornecedor}
                  isModal={false}
                  onCancel={() => setEditingFornecedor(null)}
                  onUpdate={handleUpdateFornecedor}
                  fornecedorToEdit={editingFornecedor}
                />
              </div>
              <div className="list-section">
                <h4>Lista de Fornecedores</h4>
                <FornecedorList
                  fornecedores={fornecedores}
                  onEdit={handleEditForn}
                  onDelete={handleDeleteFornecedor}
                />
              </div>
            </div>
          </TabPane>
  
          {/* Aba de Manutenção */}
          <TabPane className="tab-pane-center" tabId="manutenção">
            <div className="form-list-container">
              <div className="form-section2-veiculo">
                <h4>Gerenciar Manutenções</h4>
                <ManutencaoForm
                  onSave={handleSaveManutencao}
                  onCancel={() => setEditingManutencao(null)}
                  fornecedores={fornecedores}
                  veiculos={veiculos}
                  onUpdate={handleUpdateManutencao}
                  manutencaoToEdit={editingManutencao}
                  isModal={false}
                />
              </div>
              <div className="list-section">
                <h4>Lista de Manutenções</h4>
                <ManutencaoList
                  manutencoes={manutencoes}
                  onEdit={handleEditManu}
                  onDelete={handleDeleteManutencao}
                />
              </div>
            </div>
          </TabPane>
  
          {/* Aba de Peça */}
          <TabPane className="tab-pane-center" tabId="peça">
            <div className="form-list-container">
              <div className="form-section2-veiculo">
                <h4>Criar Peças para Manutenção</h4>
                <PecaManutencaoForm
                  isModal={false}
                  onSave={handleSavePecaManutencao}
                  onCancel={() => setEditingPecaManutencao(null)}
                  pecaManutencaoToEdit={editingPecaManutencao}
                  onUpdate={handleUpdatePecaManutencao}
                  manutencoes={manutencoes}
                />
              </div>
              <div className="list-section">
                <h4>Lista de Peças</h4>
                <PecaManutencaoList
                  pecaManutencoes={pecaManutencoes}
                  onEdit={handleEditPecaManu}
                  onDelete={handleDeleteVeiculo}
                />
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default GerenciarVeiculo;


