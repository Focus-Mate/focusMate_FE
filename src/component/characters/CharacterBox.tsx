import styled from "styled-components";

interface CharacterBoxProps {
	type?: string;
	src?: string;
	alt?: string;
}

const CharacterBox: React.FC<CharacterBoxProps> = ({ type, src, alt }): React.ReactElement => {
	if (type === "small") return <div></div>;
	return (
		<Container>
			<img src={src} alt={alt} />
		</Container>
	);
};

export default CharacterBox;

const Container = styled.div`
	width: 140px;
	height: 140px;
	background-color: #e9faf7;
	border-radius: 50px;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		width: 100px;
		height: 100px;
		object-fit: contain;
	}
`;
