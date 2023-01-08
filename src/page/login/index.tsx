const Login = () => {
  const kakaoURL = process.env.REACT_APP_SOCIAL_URL;

  console.log(kakaoURL);

  return (
    <>
      <button>
        <a href="http://43.200.27.157/api/user/kakao">카카오로 시작하기</a>
      </button>
    </>
  );
};
export default Login;
