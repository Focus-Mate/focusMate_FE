import styled from "styled-components";
import rabbit from "@/style/icon/character/rabbit.svg";

interface CharacterItemProps {
	children?: string;
	onClick?: () => void;
	character: {
		id: number;
		src: string;
		title: string;
		description: string;
		tips: string;
		hasCharacter: boolean;
	};
}

const CharacterItem: React.FC<CharacterItemProps> = ({ children, onClick, character }) => {
	return (
		<Container onClick={onClick}>
			<ColorBox isActive={character?.hasCharacter}>
				{character.hasCharacter && character?.src && <img src={character?.src} alt="character" />}
				{!character.hasCharacter && <img src={rabbit} className="rabbit" alt="character" />}
			</ColorBox>
			<NameBox>{children}</NameBox>
		</Container>
	);
};

export default CharacterItem;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	align-items: center;
	float: left;
`;

const ColorBox = styled.div<{
	isActive: boolean | undefined;
}>`
	width: 100%;
	padding-top: 100%;
	border-radius: 20px;
	background-color: ${({ isActive }) => (isActive ? "#b3f0e8" : "#e8e8e8")};
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

	img {
		width: 80%;
		object-fit: cover;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.rabbit {
		width: 70%;
	}
`;

const NameBox = styled.div`
	color: ${({ theme }) => theme.colors.grey[700]};
	font-size: 0.875rem;
`;
