import MotoristaForm from "../components/motorista/MotoristaForm";
import MotoristaList from "../components/motorista/MotoristaList";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useGerenciarMotorista } from "../hooks/useGerenciarMotorista";
import '../styles/GerenciarMotorista.css'

const GerenciarMotorista = () => {
    const {
        motoristas,
        editingMotorista,
        isModalOpen,
        handleSaveMotorista,
        handleUpdateMotorista,
        handleDeleteMotorista,
        handleEdit,
        toggleModal,
    } = useGerenciarMotorista();

    return (
        <div className="global-motorista">
            <div className="motorista-form">
                <h3>Criar Motorista</h3>
                {/*Formulário do Motorista */}
                <MotoristaForm motoristaToEdit={editingMotorista} onSave={handleSaveMotorista}
                    onUpdate={handleUpdateMotorista}
                    isModal={false}
                />
            </div>

            {/*Lista de Motoristas */}
            <div className="motorista-list">
                <MotoristaList
                    motoristas={motoristas}
                    onDelete={handleDeleteMotorista}
                    onEdit={handleEdit}
                />
            </div>

            <Modal isOpen={isModalOpen} toggle={toggleModal} className="global-motorista">
                <ModalHeader toggle={toggleModal}>Editar Motoristas</ModalHeader>
                <ModalBody>
                    {editingMotorista && (
                        <MotoristaForm motoristaToEdit={editingMotorista} onSave={handleSaveMotorista}
                            onUpdate={handleUpdateMotorista}
                            isModal={true}
                        />
                    )}
                </ModalBody>
            </Modal>
        </div>


    );
};

export default GerenciarMotorista;