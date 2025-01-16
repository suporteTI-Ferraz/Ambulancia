import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

interface CustomModalProps {
  isOpen: boolean; // Controla se o modal está aberto
  toggle: () => void; // Função para abrir/fechar o modal
  title: string; // Título do modal
  children: React.ReactNode; // Conteúdo do corpo do modal
  onConfirm?: () => void; // Ação para o botão "Confirmar" (opcional)
  confirmText?: string; // Texto do botão "Confirmar" (opcional)
  cancelText?: string; // Texto do botão "Cancelar" (opcional)
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  toggle,
  title,
  children,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          {cancelText}
        </Button>
        {onConfirm && (
          <Button color="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
