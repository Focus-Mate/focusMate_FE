import { Dispatch, SetStateAction } from "react";
import ReactModal from "react-modal";
import { css } from "styled-components";

interface BottomSlideBoxProps {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const modalStyle = {
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		zIndex: 10,
	},
	content: {
		backgroundColor: "white",
		bottom: 0,
		left: 0,
		right: 0,
		top: "auto",
		width: "100%",
		height: "280px",
		borderRadius: "20px 20px 0px 0px",
	},
};

const BottomSlideBox: React.FC<BottomSlideBoxProps> = ({ isOpen, setOpen }) => {
	return (
		<ReactModal
			shouldCloseOnOverlayClick={true}
			shouldCloseOnEsc={true}
			onRequestClose={() => setOpen(false)}
			isOpen={isOpen}
			style={{ overlay: modalStyle.overlay, content: modalStyle.content }}
		></ReactModal>
	);
};

export default BottomSlideBox;
