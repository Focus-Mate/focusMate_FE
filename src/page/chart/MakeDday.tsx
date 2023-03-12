import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Input, SignInStepButton, Title } from "../../style/globalStyle";
import { ReactComponent as BackArrow } from "../../style/icon/backArrow.svg";
import { DDayIcon } from "../../style/icon/chartPage";
import theme from "../../style/lightTheme";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import ko from "date-fns/locale/ko";
import React, { useState } from "react";

const MakeDday = () => {
	const navigate = useNavigate();
	const [startDate, setStartDate] = useState(new Date());

	return (
		<DdayContainer>
			<IconWrapper onClick={() => navigate(-1)}>
				<BackArrow />
			</IconWrapper>

			<DdayTitle>
				D-DAY 제목과 날짜를
				<br />
				입력해주세요
			</DdayTitle>
			<DdayInput maxLength={10} autoFocus />
			<SelectWrapper>
				<DDayIcon />
				<SelectArrow />
				<DdaySelect
					selected={startDate}
					onChange={(date: Date) => setStartDate(date)}
					dateFormat="MM/dd (eee)"
					locale={ko}
					showPopperArrow={false}
				/>
			</SelectWrapper>

			<SignInStepButton>확인</SignInStepButton>
		</DdayContainer>
	);
};
export default MakeDday;

const DdayContainer = styled.div`
	position: relative;
	width: 100%;
	min-height: 100vh;
`;

const DdayInput = styled(Input)`
	margin-bottom: 16px;
`;

const DdayTitle = styled(Title)`
	padding-top: 60px;
`;

const SelectWrapper = styled.div``;

const DdaySelect = styled(ReactDatePicker)`
	width: 100%;
	border-radius: 16px;
	border: 0px solid transparent;
	background-color: ${theme.colors.bg.grey};
	padding: 23px;
	display: flex;
	justify-content: space-between;
`;

const SelectArrow = styled(BackArrow)`
	fill: ${theme.colors.grey[700]};

	transform: rotate(-90deg);
`;

const IconWrapper = styled.div`
	width: 48px;
	height: 48px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	left: 0;
	top: 8px;
`;
