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
import Manutencao from "../types/veiculo/ManutencaoType";

const GerenciarVeiculo = () => {
  const {
    veiculos, isEditModalOpen, isManutencaoModalOpen, selectedManutencoes, editingVeiculo,
    fornecedores, activeTab, manutencoes, editingManutencao, editingFornecedor, isFornecedorModalOpen,
    handleSaveVeiculo, handleDeleteVeiculo, handleEditVeiculo,
    toggleEditModal, setEditingVeiculo, toggleModalManutencao, handleEdit,
    handleViewManutencoes, handleSaveManutencao, handleSaveFornecedor, handleUpdateManutencao,
    handleEditForn, setEditingFornecedor, handleDeleteFornecedor, setActiveTab, handleUpdateFornecedor, toggleModalFornecedor,
    handleEditManu, setEditingManutencao, handleDeleteManutencao
  } = useGerenciarVeiculo();

  return (
    <div className="gerenciar">
      <h3>Gerenciar Veículos, Fornecedores e Manutenções</h3>
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
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="veiculo">
          <h4>Criar Veículo</h4>
          <VeiculoForm isModal={false} onSave={handleSaveVeiculo}
           onCancel={() => setEditingVeiculo(null)}
          veiculoToEdit={editingVeiculo} onUpdate={handleEditVeiculo} />
          
          <VeiculoList veiculos={veiculos} onEdit={handleEdit} onDelete={handleDeleteVeiculo} onViewManutencoes={handleViewManutencoes} />
        </TabPane>
        <TabPane tabId="fornecedor">
          <h4>Gerenciar Fornecedores</h4>
          <FornecedorForm onSave={handleSaveFornecedor} isModal={false} 
          onCancel={() => setEditingFornecedor(null)} onUpdate={handleUpdateFornecedor} fornecedorToEdit={editingFornecedor} />

          <FornecedorList fornecedores={fornecedores} onEdit={handleEditForn} onDelete={handleDeleteFornecedor} />
        </TabPane>
        <TabPane tabId="manutenção">
          <h4>Gerenciar Manutenções</h4>
          <ManutencaoForm onSave={handleSaveManutencao} onCancel={() => setEditingManutencao(null)}
          fornecedores={fornecedores} veiculos={veiculos} onUpdate={handleUpdateManutencao}
          manutencaoToEdit={editingManutencao} isModal={false}  />

          <ManutencaoList manutencoes={manutencoes} onEdit={handleEditManu} onDelete={handleDeleteManutencao}/>

        </TabPane>
      </TabContent>
      {/* Modal de Edição de Veículo */}
      <Modal isOpen={isEditModalOpen} toggle={toggleModalFornecedor} className="gerenciar">
        <ModalHeader toggle={toggleEditModal}>Editar Veículo</ModalHeader>
        <ModalBody>
          {editingVeiculo && <VeiculoForm veiculoToEdit={editingVeiculo} onSave={handleSaveVeiculo} onCancel={toggleEditModal} 
          onUpdate={handleEditVeiculo } isModal={true} />}
        </ModalBody>
      </Modal>

            {/* Modal de Fornecedores */}
            <Modal isOpen={isFornecedorModalOpen} toggle={toggleModalFornecedor} className="gerenciar">
        <ModalHeader toggle={toggleModalFornecedor}>Editar Fornecedor</ModalHeader>
        <ModalBody>
          {editingFornecedor && <FornecedorForm fornecedorToEdit={editingFornecedor} onSave={handleSaveFornecedor} onCancel={toggleEditModal} 
          onUpdate={handleUpdateFornecedor } isModal={true} />}
        </ModalBody>
      </Modal>
        
      {/* Modal de Manutenção */}
      <Modal isOpen={isManutencaoModalOpen} toggle={toggleModalManutencao} className="gerenciar">
        <ModalHeader toggle={toggleModalManutencao}>Editar Manutenção</ModalHeader>
        <ModalBody>
          {editingManutencao &&  <ManutencaoForm onSave={handleSaveManutencao} onCancel={() => setEditingManutencao(null)}
          fornecedores={fornecedores} veiculos={veiculos} onUpdate={handleUpdateManutencao}
          manutencaoToEdit={editingManutencao} isModal={true}  />}
        </ModalBody>
      </Modal>

    </div>
  );
};

export default GerenciarVeiculo;