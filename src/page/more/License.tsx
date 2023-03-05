import StackHeader from "@/component/common/StackHeader";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const License = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<StackHeader
				options={{
					line: true,
					before: {
						iconOptions: {
							onClick: () => navigate("/more"),
						},
					},
				}}
			>
				오픈소스 라이선스
			</StackHeader>
			<Content>오픈소스 정보가 없습니다.</Content>
		</Container>
	);
};

export default License;

const Container = styled.div``;

const Content = styled.div`
	padding: 20px;
	color: ${({ theme }) => theme.colors.grey[600]};
`;
