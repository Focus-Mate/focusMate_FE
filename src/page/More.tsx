import styled from "styled-components";

function More() {
	return (
		<Container>
			<Header>
				<Title>설정</Title>
				<Profile>
					<ImageWrap></ImageWrap>
					<UserNickname></UserNickname>
				</Profile>
			</Header>
		</Container>
	);
}
export default More;

const Container = styled.div``;

const Header = styled.div`
	padding-top: 2.7rem;
	font-size: 1.25rem;
	font-weight: 500;
`;
const Title = styled.h2``;
const Profile = styled.div``;

const ImageWrap = styled.div`
	width: 4rem;
	height: 4rem;
	background-color: ${({ theme }) => theme.colors.bg.mint10};
`;
const UserNickname = styled.div``;
