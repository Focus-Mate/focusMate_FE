import CharacterBox from "@/component/characters/CharacterBox";
import StackHeader from "@/component/common/StackHeader";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import characterSizeArea from "@/style/charactor/character_size_area.png";
import CharacterGroup from "@/component/characters/CharacterGroup";

const Characters = () => {
	const navigate = useNavigate();
	return (
		<Container>
			<StackHeader
				options={{
					before: {
						iconOptions: {
							onClick: () => navigate("/chart"),
						},
					},
				}}
			>
				캐릭터 목록
			</StackHeader>
			<Content>
				<Box>
					<MainText>나의 프로필</MainText>
					<SubText>모은 캐릭터 중 하나를 내 대표 프로필로 선택할 수 있어요.</SubText>
					<Center margin>
						<CharacterBox src={characterSizeArea} alt={"대표이미지"} />
					</Center>
					<Center>
						<Title>달성한 목표</Title>
						<Text>첫걸음 시작!</Text>
					</Center>
				</Box>
				<Box>
					<PickCounter>
						모은캐릭터 <PickNow>1</PickNow>
						<PickAll>/ 10</PickAll>
					</PickCounter>
					<Comments>주어진 목표를 달성하고 캐릭터를 모아봐요</Comments>
					<CharacterGroup />
				</Box>
			</Content>
		</Container>
	);
};

export default Characters;

const Container = styled.div`
	background-color: #f6f6f6;
`;
const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;
const Box = styled.div`
	background-color: white;
	padding: 24px 20px;
`;

const MainText = styled.div`
	font-family: "SpoqaMedium";
	font-size: 1.25rem;
	text-align: center;
`;

const SubText = styled.div`
	font-size: 0.75rem;
	width: 150px;
	margin: 1rem auto 0;
	text-align: center;
	line-height: 1.25;
	color: ${({ theme }) => theme.colors.grey[500]};
`;

const Center = styled.div<{
	margin?: boolean;
}>`
	display: flex;
	justify-content: center;
	align-items: center;

	${(props) =>
		props.margin &&
		css`
			margin: 20px 0 16px;
		`}
`;

const Title = styled.div`
	padding: 0.5rem;
	background-color: #f6f6f6;
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.grey[600]};
`;
const Text = styled.div`
	font-family: "SpoqaMedium";
	font-size: 0.875rem;
	margin-left: 0.5rem;
`;

const PickCounter = styled.div`
	width: 160px;
	height: 48px;
	background-color: #e9faf7;
	color: ${({ theme }) => theme.colors.grey[900]};
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
	border-radius: 16px;
	font-family: ${({ theme }) => theme.fonts.spoqa.medium};
	margin: 0 auto;
`;

const PickNow = styled.div`
	font-family: ${({ theme }) => theme.fonts.spoqa.bold};
	color: ${({ theme }) => theme.colors.primary[900]};
`;

const PickAll = styled.div`
	color: ${({ theme }) => theme.colors.grey[500]};
`;

const Comments = styled.div`
	width: 100%;
	text-align: center;
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.grey[500]};
	margin-top: 12px;
	margin-bottom: 45px;
`;
