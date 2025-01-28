import MotoristaForm from "../components/motorista/MotoristaForm";
import MotoristaList from "../components/motorista/MotoristaList";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useGerenciarMotorista } from "../hooks/useGerenciarMotorista";

const GerenciarMotorista = () => {
    const{
        motoristas,
        editingMotorista,
        isModalOpen,
        handleSaveMotorista,
        handleUpdateMotorista,
        handleDeleteMotorista,
        handleEdit,
        toggleModal,
    } = useGerenciarMotorista();

    return(
        <div className="gerenciar">
            <div>
                <h3>Criar Motorista</h3>
                {/*Formulário do Motorista */}
                <MotoristaForm motoristaToEdit={editingMotorista} onSave={handleSaveMotorista}
                onUpdate={handleUpdateMotorista}
                isModal={false}
                />
            </div>

            {/*Lista de Motoristas */}
            <MotoristaList motoristas={motoristas} onDelete={handleDeleteMotorista} onEdit={handleEdit}
            />

            <Modal isOpen={isModalOpen} toggle={toggleModal} className="gerenciar">
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