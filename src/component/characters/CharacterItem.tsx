import styled from "styled-components";

interface CharacterItemProps {
	isActive?: boolean;
	children?: string;
	src?: string;
	onClick?: () => void;
}

const CharacterItem: React.FC<CharacterItemProps> = ({ isActive, children, src, onClick }) => {
	return (
		<Container onClick={onClick}>
			<ColorBox isActive={isActive}>{src && <img src={src} alt="character" />}</ColorBox>
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
`;

const ColorBox = styled.div<{
	isActive: boolean | undefined;
}>`
	width: 100px;
	height: 100px;
	border-radius: 20px;
	background-color: ${({ isActive }) => (isActive ? "#b3f0e8" : "#e8e8e8")};
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		width: 80px;
		height: 80px;
		object-fit: cover;
	}
`;

const NameBox = styled.div`
	color: ${({ theme }) => theme.colors.grey[700]};
	font-size: 0.875rem;
`;
