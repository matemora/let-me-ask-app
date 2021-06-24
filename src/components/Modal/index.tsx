import { useEffect } from "react";
import { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import './styles.scss';

type ModalProps = {
  icon: ReactNode;
  showModal: boolean;
  title: string;
  subtitle: string;
  confirmButton: ReactNode;
  cancelButton: ReactNode;
}

export function Modal({
  showModal, title, subtitle, confirmButton, cancelButton, icon,
}: ModalProps) {
  const elementRef = useRef(document.createElement('div'));

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    const currentElementRef = elementRef.current
    if (!modalRoot) {
      return;
    }
    modalRoot.appendChild(currentElementRef);

    return () => {
      modalRoot.removeChild(currentElementRef);
      return;
    }
  }, []);

  function ModalContent() {
    return (
      <div className={`modal-container ${showModal ? 'visible' : 'hidden'}`}>
        <div>
          {icon}
          <div className="info">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="controls">
            {cancelButton}
            {confirmButton}
          </div>
        </div>
      </div>
    );
  }

  if (showModal) {
    return createPortal(<ModalContent />, elementRef.current);
  }

  return null;
}

