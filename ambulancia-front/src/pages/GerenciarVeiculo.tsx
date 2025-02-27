import { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody } from "reactstrap";
import classnames from "classnames";
import VeiculoForm from "../components/veiculo/VeiculoForm";
import VeiculoList from "../components/veiculo/VeiculoList";
import EditVeiculoForm from "../components/veiculo/EditVeiculoForm";
import ManutencaoModal from "../components/modal/veiculo/ManutencaoModal";
import FornecedorForm from "../components/veiculo/FornecedorForm";
import FornecedorList from "../components/veiculo/FornecedorList";
import useGerenciarVeiculo from "../hooks/useGerenciarVeiculo";
import ManutencaoForm from "../components/veiculo/ManutencaoForm";

const GerenciarVeiculo = () => {
  const {
    veiculos, isEditModalOpen, isManutencaoModalOpen, selectedManutencoes, editingVeiculo,
    fornecedores, activeTab,
    handleSaveVeiculo, handleDeleteVeiculo, handleEditVeiculo,
    toggleEditModal, setEditingVeiculo, toggleModalManutencao, handleEdit,
    handleViewManutencoes, handleSaveManutencao, handleSaveFornecedor,
    handleEditForn, setEditingFornecedor, handleDeleteFornecedor, setActiveTab,
    handleEditManu, setEditingManutencao,
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
          <VeiculoForm onSave={handleSaveVeiculo} onCancel={() => setEditingVeiculo(null)} />
          <VeiculoList veiculos={veiculos} onEdit={handleEdit} onDelete={handleDeleteVeiculo} onViewManutencoes={handleViewManutencoes} />
        </TabPane>
        <TabPane tabId="fornecedor">
          <h4>Gerenciar Fornecedores</h4>
          <FornecedorForm onFornecedorChange={handleSaveFornecedor} isModal={false} onCancel={() => setEditingFornecedor(null)} />
          <FornecedorList fornecedores={fornecedores} onEdit={handleEditForn} onDelete={handleDeleteFornecedor} />
        </TabPane>
        <TabPane tabId="manutenção">
          <h4>Gerenciar Manutenções</h4>
          <ManutencaoForm onSave={handleSaveManutencao} onCancel={() => setEditingManutencao(null)}  
     fornecedores={fornecedores} veiculos={veiculos}  />
        </TabPane>
      </TabContent>
      {/* Modal de Edição de Veículo */}
      <Modal isOpen={isEditModalOpen} toggle={toggleEditModal} className="gerenciar">
        <ModalHeader toggle={toggleEditModal}>Editar Veículo</ModalHeader>
        <ModalBody>
          {editingVeiculo && <EditVeiculoForm veiculo={editingVeiculo} onSave={handleEditVeiculo} onCancel={toggleEditModal} />}
        </ModalBody>
      </Modal>
      {/* Modal de Manutenção */}
      {/* <ManutencaoModal
        manutencoes={selectedManutencoes}
        isOpen={isManutencaoModalOpen}
        toggle={toggleModalManutencao}
        onManutencoesChange={handleSaveManutencoesFromModal}
        fornecedores={fornecedores}
      /> */}

    </div>
  );
};

export default GerenciarVeiculo;