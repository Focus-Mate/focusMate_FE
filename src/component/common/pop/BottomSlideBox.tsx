import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import ReactModal from "react-modal";
import styled, { css, keyframes } from "styled-components";

interface BottomSlideBoxProps {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const modalStyle = {
	overlay: {
		backgroundColor: "transparent",
		zIndex: 10,
		overflow: "hidden",
	},
	content: {
		backgroundColor: "transparent",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		width: "100%",
		height: "100%",
		borderRadius: 0,
		border: 0,
		padding: 0,
		overflow: "hidden",
		// borderRadius: "20px 20px 0px 0px",
	},
};

const BottomSlideBox: React.FC<BottomSlideBoxProps> = ({ isOpen, setOpen }) => {
	const [isClose, setClose] = useState(false);

	const onClose = () => {
		setClose(true);
	};

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (isClose) {
			timeout = setTimeout(() => {
				setOpen(false);
				setClose(false);
			}, 300);
		}

		return () => {
			clearTimeout(timeout);
		};
	}, [isClose, setOpen]);

	return (
		<ReactModal
			isOpen={isOpen}
			style={{ overlay: modalStyle.overlay, content: modalStyle.content }}
		>
			<Background onClick={onClose} isClose={isClose}></Background>
			<Slider isClose={isClose}></Slider>
		</ReactModal>
	);
};

export default BottomSlideBox;

const BackgroundFadeIn = keyframes`
	0% {
		background: rgba(0, 0, 0, 0);
	}
	100% {
		background: rgba(0, 0, 0, 0.5);
	}
`;

const BackgroundFadeOut = keyframes`
	0% {
		background: rgba(0, 0, 0, 0.5);
	}
	100% {
		background: rgba(0, 0, 0, 0);
	}
`;

const Background = styled.div<{ isClose: boolean }>`
	width: 100%;
	height: 100%;
	position: absolute;
	background: rgba(0, 0, 0, 0);
	animation: ${BackgroundFadeIn} 0.3s ease-in-out forwards;

	${({ isClose }) => {
		return (
			isClose &&
			css`
				animation: ${BackgroundFadeOut} 0.3s ease-in-out forwards;
			`
		);
	}}
`;

const SliderSlideIn = keyframes`
	0% {
		bottom: -280px;
	}
	100% {
		bottom: 0px;
	}
`;

const SliderSlideOut = keyframes`
	0% {
		bottom: 0px;
	}
	100% {
		bottom: -280px;
	}
`;

const Slider = styled.div<{
	isClose: boolean;
}>`
	width: 100%;
	height: 280px;
	background-color: white;
	position: absolute;
	z-index: 10;
	bottom: -280px;
	animation: ${SliderSlideIn} 0.3s ease-in-out forwards;
	border-radius: 20px 20px 0px 0px;

	${({ isClose }) => {
		return (
			isClose &&
			css`
				animation: ${SliderSlideOut} 0.3s ease-in-out forwards;
			`
		);
	}}
`;
