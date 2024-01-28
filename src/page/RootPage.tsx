import Navigation from '@/component/Navigation';
import styled from 'styled-components';
import { AllStudies, Chart, More, MyStudy, TimerPage } from '.';

interface Props {
  page: string;
}

export default function RootPage(props: Props) {
  return (
    <Container>
      <Content>
        {props.page === 'timer' && <TimerPage />}
        {props.page === 'chart' && <Chart />}
        {props.page === 'mystudy' && <MyStudy />}
        {props.page === 'allstudies' && <AllStudies />}
        {props.page === 'more' && <More />}
      </Content>
      <Footer>
        <Navigation />
      </Footer>
    </Container>
  );
}

const Container = styled.div``;

const Content = styled.div``;
const Footer = styled.div``;
