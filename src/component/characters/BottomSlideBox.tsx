import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { atom, useRecoilState } from "recoil";
import styled, { css, keyframes } from "styled-components";
import rabbit from "@/style/icon/character/rabbit.svg";

export const bottomSlider = atom({
	key: "bottomSlider",
	default: {
		isRepresentative: false,
		isActive: false,
		icon: "",
		title: "",
		description: "",
		tips: "",
		hasCharacter: true,
	},
});

interface BottomSlideBoxProps {}

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

const BottomSlideBox: React.FC<BottomSlideBoxProps> = () => {
	const [slider, setSlider] = useRecoilState(bottomSlider);
	const [isClose, setClose] = useState(false);

	const onClose = () => {
		setClose(true);
	};

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (isClose) {
			timeout = setTimeout(() => {
				setSlider((current) => ({ ...current, isActive: false }));
				setClose(false);
			}, 300);
		}

		return () => {
			clearTimeout(timeout);
		};
	}, [slider, isClose, setSlider]);

	return (
		<ReactModal
			isOpen={slider.isActive}
			style={{ overlay: modalStyle.overlay, content: modalStyle.content }}
		>
			<Background onClick={onClose} isClose={isClose}></Background>
			<Slider isClose={isClose}>
				<SliderWrapper>
					<Picture>
						{slider.hasCharacter ? (
							<img src={slider.icon} alt="icon" />
						) : (
							<img src={rabbit} alt="icon" />
						)}
					</Picture>
					<Title>{slider.title}</Title>
					{slider.isRepresentative && <Representative>현재 나의 대표 프로필이에요.</Representative>}
					{!slider.isRepresentative && slider.hasCharacter && (
						<Button>내 대표 프로필로 설정하기</Button>
					)}
					{!slider.hasCharacter && (
						<>
							<Description>현재 연속 출석 3일째</Description>
							<Tips>TIPS: 10일 연속 출석 달성 시 캐릭터 부여</Tips>
						</>
					)}
				</SliderWrapper>
			</Slider>
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
	height: 300px;
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

const SliderWrapper = styled.div`
	padding: 40px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

const Representative = styled.div`
	font-size: 16px;
	color: ${({ theme }) => theme.colors.grey[500]};
	margin-top: 12px;
`;

const Picture = styled.div``;
const Title = styled.div`
	margin-top: 20px;
	font-size: 20px;
	font-family: ${({ theme }) => theme.fonts.spoqa.bold};
`;
const Button = styled.button`
	width: 320px;
	height: 48px;
	background-color: ${({ theme }) => theme.colors.primary[700]};
	border: 0;
	border-radius: 16px;
	font-size: 16px;
	color: ${({ theme }) => theme.colors.bg.base};
	font-family: ${({ theme }) => theme.fonts.spoqa.bold};
	margin-top: 28px;
`;

const Description = styled.div`
	margin-top: 12px;
	color: ${({ theme }) => theme.colors.primary[900]};
	font-size: 16px;
`;
const Tips = styled.div`
	font-size: 16px;
	margin-top: 20px;
	color: ${({ theme }) => theme.colors.grey[500]};
`;
