import MenuBox from "@/component/more/MenuBox";
import styled, { css } from "styled-components";

import iconNotice from "@/style/icon/more/notice.png";
import iconDelete from "@/style/icon/more/delete.png";
import iconFolder from "@/style/icon/more/folder.png";
import iconMoon from "@/style/icon/more/moon.png";
import iconOut from "@/style/icon/more/out.png";
import iconPc from "@/style/icon/more/pc.png";
import iconTerms from "@/style/icon/more/terms.png";
import { useState } from "react";

function Setting() {
	const [darkMode, setDarkMode] = useState(false);

	return (
		<Container>
			<Header>
				<Title>설정</Title>
				<User>
					<PictureBox></PictureBox>
					<Nickname>태정태세비욘세</Nickname>
				</User>
				<MenuBox
					options={{
						title: "이용 안내",
					}}
					items={[
						<Item>
							<ItemIcon src={iconNotice} alt="notice" />
							공지사항
						</Item>,
						<Item>
							<ItemIcon src={iconTerms} alt="terms" />
							서비스 이용약관
						</Item>,
						<Item>
							<ItemIcon src={iconTerms} alt="info" />
							개인정보 처리방침
						</Item>,
					]}
				/>
				<MenuBox
					options={{
						title: "공지사항",
					}}
					items={[
						<Item>
							<ItemIcon src={iconMoon} alt="notice" />
							<ItemText>다크모드 설정</ItemText>
							<ItemContent>
								<SwitchBox onClick={() => setDarkMode((mode) => !mode)} isDark={darkMode}>
									<SwitchCircle isDark={darkMode} />
								</SwitchBox>
							</ItemContent>
						</Item>,
						<Item>
							<ItemIcon src={iconPc} alt="notice" />
							<ItemText>버전 정보</ItemText>
							<ItemContent style={{ marginRight: "5px" }}>1.0.0</ItemContent>
						</Item>,
						<Item>
							<ItemIcon src={iconFolder} alt="notice" />
							<ItemText>오픈소스 라이선스</ItemText>
						</Item>,
						<Item>
							<ItemIcon src={iconOut} alt="notice" />
							로그아웃
						</Item>,
						<Item>
							<ItemIcon src={iconDelete} alt="notice" />
							탈퇴하기
						</Item>,
					]}
				/>
			</Header>
		</Container>
	);
}
export default Setting;

const Container = styled.div`
	padding-bottom: 80px;
`;

const Header = styled.div`
	padding-top: 2rem;
	font-size: 1.25rem;
	font-weight: 500;
`;

const Title = styled.h2``;

const User = styled.div`
	display: flex;
	align-items: center;
	margin-top: 1.5rem;
`;

const PictureBox = styled.div`
	width: 4rem;
	height: 4rem;
	border-radius: 1.25rem;
	background-color: ${({ theme }) => theme.colors.bg.mint10};
`;

const Nickname = styled.div`
	margin-left: 0.5rem;
	font-family: "SpoqaMedium";
`;

const Item = styled.div`
	display: flex;
	align-items: center;
	gap: 11px;
	font-size: 1rem;
	color: ${({ theme }) => theme.colors.grey[600]};
	height: 30px;
	width: 100%;
	position: relative;
`;

const ItemIcon = styled.img`
	width: 14px;
	object-fit: contain;
	padding-bottom: 2px;
`;

const ItemText = styled.div`
	width: 100%;
`;
const ItemContent = styled.div``;

interface hasIsDark {
	isDark: boolean;
}

const SwitchBox = styled.div<hasIsDark>`
	width: 56px;
	height: 30px;
	flex-shrink: 0;
	background-color: ${({ theme }) => theme.colors.bg.line};
	border-radius: 15px;
	padding: 4px;
	position: relative;
	transition: background-color 0.3s;

	${({ isDark }) =>
		isDark &&
		css`
			background-color: ${({ theme }) => theme.colors.icon.orange50};
		`}
`;

const SwitchCircle = styled.div<hasIsDark>(({ isDark }) => [
	css`
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background-color: ${({ theme }) => theme.colors.icon.white};
		transition: left 0.3s;
		position: absolute;
		left: calc(0% + 4px);
	`,
	isDark &&
		css`
			left: calc(100% - 26px);
		`,
]);
