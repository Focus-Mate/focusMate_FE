import StackHeader from "@/component/common/StackHeader";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Service = () => {
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
				서비스 이용약관
			</StackHeader>
			<Content>서비스 이용약관</Content>
		</Container>
	);
};

export default Service;

const Container = styled.div``;
const Content = styled.div``;
