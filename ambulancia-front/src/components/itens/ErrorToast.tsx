import React from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

const ErrorToast = ({ error }: { error: string | null }) => {
  if (!error) return null;

  return (
    <div className="p-3 position-fixed top-0 end-0" style={{ zIndex: 1050 }}>
      <Toast>
        <ToastHeader icon="danger">Erro</ToastHeader>
        <ToastBody>{error}</ToastBody>
      </Toast>
    </div>
  );
};

export default ErrorToast;
