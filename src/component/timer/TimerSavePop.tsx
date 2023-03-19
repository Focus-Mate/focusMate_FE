import ReactModal from "react-modal";
import styled from "styled-components";

const modalStyle = {
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	content: {
		width: "280px",
		height: "120px",
		top: "50%",
		left: "50%",
		border: "none",
		borderRadius: "16px",
		backgroundColor: "white",
		transform: "translate(-50%, -50%)",
		justifyContent: "center",
		alignItems: "flex-end",
		gap: "1rem",
	},
};

enum TimerStatus {
	NONE,
	PLAYING,
	PAUSE,
	STOP,
}

interface TimerSavePopProps {
	playStatus: TimerStatus;
	onResetClick: () => void;
	onConfirmClick: () => void;
}

const TimerSavePop: React.FC<TimerSavePopProps> = ({
	playStatus,
	onResetClick,
	onConfirmClick,
}) => {
	return (
		<ReactModal isOpen={playStatus === TimerStatus.STOP} style={modalStyle}>
			<Container>
				<Text>공부시간을 저장할까요?</Text>
				<ButtonGroup>
					<ResetButton onClick={onResetClick}>계속 기록하기</ResetButton>
					<ConfirmButton onClick={onConfirmClick}>네, 저장할게요</ConfirmButton>
				</ButtonGroup>
			</Container>
		</ReactModal>
	);
};

export default TimerSavePop;

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	font-family: "SpoqaMedium";
`;

const Text = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
`;

const ButtonGroup = styled.div`
	flex-shrink: 0;
	display: flex;
	justify-content: space-between;
	gap: 10px;
`;

const Button = styled.button`
	width: 110px;
	height: 40px;
	background-color: transparent;
	border: 0;
	border-radius: 0.75rem;
`;

const ResetButton = styled(Button)`
	background-color: #f2f2f2;
	background-color: ${({ theme }) => theme.colors.bg.mint20};
	color: ${({ theme }) => theme.colors.primary[900]};
`;

const ConfirmButton = styled(Button)`
	width: 130px;
	background-color: ${({ theme }) => theme.colors.primary[800]};
	color: white;
`;
