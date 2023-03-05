import styled from "styled-components";
import CharacterItem from "./CharacterItem";
import characterSizeArea from "@/style/charactor/character_size_area.png";
import { useState } from "react";
import BottomSlideBox from "./BottomSlideBox";

const CharacterGroup = () => {
	const [slideState, setSlideState] = useState(true);
	return (
		<Container>
			<BottomSlideBox isOpen={slideState} setOpen={setSlideState} />
			<CharacterGroupHeader>
				<Subject>시작이 반! 기능 써보기</Subject>
				<Count>1/5</Count>
			</CharacterGroupHeader>
			<CharacterGroupComment>
				매일 타이머 작동 시마다 출석으로 자동 체크됩니다
			</CharacterGroupComment>
			<CharacterItems>
				<CharacterItem isActive={true} src={characterSizeArea} onClick={() => setSlideState(true)}>
					첫걸음 시작!
				</CharacterItem>
				<CharacterItem>첫걸음 시작2</CharacterItem>
				<CharacterItem>첫걸음 시작3</CharacterItem>
				<CharacterItem>첫걸음 시작4</CharacterItem>
				<CharacterItem>첫걸음 시작5</CharacterItem>
			</CharacterItems>
		</Container>
	);
};

export default CharacterGroup;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const CharacterGroupHeader = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Subject = styled.div`
	font-size: 1.25rem;
	font-family: ${({ theme }) => theme.fonts.spoqa.medium};
`;

const Count = styled.div`
	font-family: ${({ theme }) => theme.fonts.spoqa.regular};
	color: ${({ theme }) => theme.colors.grey[600]};
`;

const CharacterGroupComment = styled.div`
	margin-top: 12px;
	color: ${({ theme }) => theme.colors.grey[500]};
	font-size: 0.75rem;
`;

const CharacterItems = styled.div`
	margin-top: 24px;
	display: flex;
	flex-wrap: wrap;

	& > div {
		margin-left: calc((100% - 300px) / 2);
	}

	& > div:nth-of-type(3n + 1) {
		margin-left: 0;
	}

	& > div:nth-of-type(n + 4) {
		margin-top: 24px;
	}
`;
