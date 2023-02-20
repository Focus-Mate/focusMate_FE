import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import LandingGuide from "./layout/LandingGuide";
import NavLayout from "./layout/NavLayout";
import SignInLayout from "./layout/NavLayout";
import { Timer, Chart, AllStudies, MyStudy, More } from "./page";
import CharactorList from "./page/CharactorList";
import MakeDday from "./page/chart/MakeDday";
import Login from "./page/login";
import SignIn from "./page/login/SignIn";

const Router = () => {
  return (
    <Routes>
      {/* NOTE LandingGuide = 랜딩 분기점 (추후에 로그인/게스트 분기점) */}
      <Route path="/" element={<LandingGuide />}>
        {/* NOTE DefaultLayout = 하단에 Navigation 붙어있는 layout component */}
        <Route element={<DefaultLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="makedday" element={<MakeDday />} />
          <Route path="charactor" element={<CharactorList />} />
        </Route>
        <Route element={<NavLayout />}>
          <Route path="timer" element={<Timer />} index />;
          <Route path="chart" element={<Chart />} />
          <Route path="allstudies" element={<AllStudies />} />;
          <Route path="mystudy" element={<MyStudy />} />;
          <Route path="more" element={<More />} />;
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
