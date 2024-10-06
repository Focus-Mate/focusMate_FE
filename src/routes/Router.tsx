import { Route, Routes, useLocation } from 'react-router-dom';
import DefaultLayout from '../components/layout/DefaultLayout';
import LandingGuide from '../components/layout/LandingGuide';
import Characters from '../pages/Characters';
import MakeDday from '../pages/chart/MakeDday';
import Login from '../pages/Login';
import SignIn from '../pages/signIn';
import Alarm from '../pages/Alarm';
import AgreementsDetail from '../pages/signIn/AgreementsDetail';
import RootPage from '../pages/RootPage';
import MoreRouter from './MoreRouter';

const Router = () => {
  const location = useLocation();
  // RouteChangeTracker();

  return (
    <Routes location={location}>
      {/* NOTE LandingGuide = 랜딩 분기점 (추후에 로그인/게스트 분기점) */}
      <Route path="signin" element={<SignIn />} />
      <Route path="signin/:title" element={<AgreementsDetail />} />
      <Route path="/" element={<LandingGuide />}>
        {/* NOTE DefaultLayout = 하단에 Navigation 붙어있는 layout component */}
        <Route element={<DefaultLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="makedday" element={<MakeDday />}>
            <Route path=":exam/:dday" />
          </Route>
        </Route>
        <Route path="characters" element={<Characters />} />
        <Route path="alarm" element={<Alarm />} />

        {/* MORE PAGE */}
        <Route path={'/more/*'} element={<MoreRouter />} />

        {/* Root Page */}
        <Route path="/timer" element={<RootPage page="timer" />} index />
        <Route path="/chart" element={<RootPage page="chart" />} />
        <Route path="/mystudy" element={<RootPage page="mystudy" />} />
        <Route path="/allstudies" element={<RootPage page="allstudies" />} />
      </Route>
    </Routes>
  );
};

export default Router;
