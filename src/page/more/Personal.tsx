import StackHeader from '@/component/common/StackHeader';
import useNavigatePop from '@/hooks/useNavigatePop';
import styled from 'styled-components';

const Personal = () => {
  const navigatePop = useNavigatePop();
  return (
    <Container>
      <StackHeader
        options={{
          line: true,
          before: {
            iconOptions: {
              onClick: () => navigatePop('/more'),
            },
          },
        }}
      >
        개인정보 처리방침
      </StackHeader>
      <Content>
        <pre>{`< 포커스메이트 >('임시'이하 '임시')은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
○ 이 개인정보처리방침은 2023년 2월 1부터 적용됩니다.

제1조(개인정보의 처리 목적)

< 포커스메이트 >('임시'이하 '임시')은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
1. 홈페이지 회원가입 및 관리
회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 만14세 미만 아동의 개인정보 처리 시 법정대리인의 동의여부 확인, 각종 고지·통지 목적으로 개인정보를 처리합니다.

2. 재화 또는 서비스 제공
서비스 제공, 콘텐츠 제공, 맞춤서비스 제공, 본인인증을 목적으로 개인정보를 처리합니다.

3. 마케팅 및 광고에의 활용
이벤트 및 광고성 정보 제공 및 참여기회 제공 , 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.



제2조(개인정보의 처리 및 보유 기간)

① < 포커스메이트 >은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.

② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
1.<홈페이지 회원가입 및 관리>
<홈페이지 회원가입 및 관리>와 관련한 개인정보는 수집.이용에 관한 동의일로부터<1년>까지 위 이용목적을 위하여 보유.이용됩니다.
보유근거 :
관련법령 :`}</pre>
      </Content>
    </Container>
  );
};

export default Personal;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg.base};
`;
const Content = styled.div`
  padding: 20px;
  font-size: 0.875rem;
  line-height: 25px;
  color: ${({ theme }) => theme.colors.grey[600]};

  pre {
    white-space: pre-wrap;
  }
`;
