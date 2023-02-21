import styled from "styled-components";

const NicknameChange = () => {
	return (
		<Container>
			<Header2>
				수정하실 닉네임을
				<br />
				입력해주세요
			</Header2>

			<InputBox>
				<Input type="text" placeholder="8자 이내 한글이나 영어로 입력해주세요." />
			</InputBox>

			<ButtonBox>
				<Button>확인</Button>
			</ButtonBox>
		</Container>
	);
};

export default NicknameChange;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 70px 20px 0;
	height: 100vh;
`;

const Header2 = styled.h2`
	font-size: 1.5rem;
	line-height: 1.5;
`;

const InputBox = styled.div`
	margin-top: 2rem;
`;

const Input = styled.input`
	width: 100%;
	height: 62px;
	border: 0;
	background: #f6f6f6;
	border-radius: 20px;
	padding: 0 20px;
	outline: none;
`;

const ButtonBox = styled.div`
	position: absolute;
	padding: 20px;
	width: 100%;
	bottom: 0;
	left: 0;
`;

const Button = styled.button`
	width: 100%;
	height: 48px;
	border: 0;
	border-radius: 16px;
	background: ${({ theme }) => theme.colors.bg.line};
	color: ${({ theme }) => theme.colors.grey[500]};
`;
