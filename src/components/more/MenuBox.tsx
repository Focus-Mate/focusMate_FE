import styled from "styled-components";

interface MenuBoxProps {
	options: {
		title: string;
	};
	items: React.ReactNode[];
}

const MenuBox: React.FC<MenuBoxProps> = ({ options, items }): React.ReactElement => {
	return (
		<BoxContainer>
			<BoxTitle>{options?.title}</BoxTitle>
			<BoxContent>
				{items.map((item, idx) => (
					<BoxItem key={idx}>{item}</BoxItem>
				))}
			</BoxContent>
		</BoxContainer>
	);
};

export default MenuBox;

const BoxItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	height: 2.25rem;
	padding-left: 24px;
	padding-right: 24px;
	font-size: 16px;
`;

const BoxContainer = styled.div`
	margin-top: 40px;
`;

const BoxTitle = styled.div`
	font-weight: 700;
	font-size: 1rem;
	line-height: 1;
`;

const BoxContent = styled.div`
	margin-top: 10px;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.bg.grey};
	padding-top: 13px;
	padding-bottom: 13px;
	border-radius: 16px;
`;
