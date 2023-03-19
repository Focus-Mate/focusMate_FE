import styled from "styled-components";
import CharacterItem from "./CharacterItem";
import characterSizeArea from "@/style/charactor/character_size_area.png";
import BottomSlideBox, { bottomSlider } from "./BottomSlideBox";
import { useRecoilState, useSetRecoilState } from "recoil";

const characters = [
	{
		id: 1,
		src: characterSizeArea,
		title: "첫걸음 시작!",
		description: "처음 시작하면 주는 프로필이에요.",
		tips: "TIPS: 10일 연속 출석 달성 시 캐릭터 부여",
		hasCharacter: true,
	},
	{
		id: 2,
		src: characterSizeArea,
		title: "타이머 사용",
		description: "타이머를 처음으로 사용하면 주는 프로필이에요.",
		tips: "TIPS: 10일 연속 출석 달성 시 캐릭터 부여",
		hasCharacter: true,
	},
	{
		id: 3,
		src: characterSizeArea,
		title: "출석 10일차",
		description: "현재 연속 출석 3일째",
		tips: "TIPS: 10일 연속 출석 달성 시 캐릭터 부여",
		hasCharacter: false,
	},
];

const mainId = 1;

const CharacterGroup = () => {
	const [slider, setSlider] = useRecoilState(bottomSlider);

	return (
		<Container>
			<BottomSlideBox />
			<CharacterGroupHeader>
				<Subject>시작이 반! 기능 써보기</Subject>
				<Count>1/5</Count>
			</CharacterGroupHeader>
			<CharacterGroupComment>
				매일 타이머 작동 시마다 출석으로 자동 체크됩니다
			</CharacterGroupComment>
			<CharacterItems>
				{characters.map((character) => {
					return (
						<CharacterItem
							character={character}
							key={character.id}
							onClick={() =>
								setSlider({
									icon: character.src,
									isActive: true,
									hasCharacter: character.hasCharacter,
									isRepresentative: mainId === character.id,
									title: character.title,
									description: character.description,
									tips: character.tips,
								})
							}
						>
							{character.title}
						</CharacterItem>
					);
				})}
			</CharacterItems>
		</Container>
	);
};

export default CharacterGroup;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 340px;
	margin: 0 auto;
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

	& > div {
		width: 100px;
		margin-left: calc((100% - 300px) / 2);
	}

	@media screen and (max-width: 400px) {
		& > div {
			margin-left: 5%;
			width: 30%;
		}
	}

	& > div:nth-of-type(3n + 1) {
		margin-left: 0;
	}

	& > div:nth-of-type(n + 4) {
		margin-top: 24px;
	}
`;
