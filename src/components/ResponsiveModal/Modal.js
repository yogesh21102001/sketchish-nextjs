import React from "react";
import { Modal } from "react-responsive-modal";

export function ResponsiveModal({
  isOpen,
  onClose,
  closeOnEsc = false,
  closeOnOverlayClick = true,
  showCloseIcon = true,
  center = true,
  component,
  className
}) {
  return (
    <Modal
      classNames={className}
      open={isOpen}
      onClose={onClose}
      closeOnEsc={closeOnEsc}
      closeOnOverlayClick={closeOnOverlayClick}
      showCloseIcon={showCloseIcon}
      center={center}
    >
      {component}
    </Modal>
  );
}
