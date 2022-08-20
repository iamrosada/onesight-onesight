import CustomModal from "react-modal";
import { customStyles } from "../styles/custom";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  contentLabel?: string;
};

const Modal = ({ children, isOpen, onClose, contentLabel }: Props) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel={contentLabel || "Modal default content"}
    >
      {children}
    </CustomModal>
  );
};
export default Modal;
