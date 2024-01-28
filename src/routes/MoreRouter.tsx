import RootPage from '@/page/RootPage';
import License from '@/page/more/License';
import NicknameChange from '@/page/more/NicknameChange';
import Notice from '@/page/more/Notice';
import Personal from '@/page/more/Personal';
import Service from '@/page/more/Service';
import UserRemove from '@/page/more/UserRemove';
import { Route, Routes, useLocation } from 'react-router-dom';
import RouteTransition from './RouteTransition';
import RouteTransitionWrapper from './RouteTransitionWrapper';

export default function MoreRouter() {
  const location = useLocation();

  return (
    <RouteTransition location={location}>
      <Routes location={location}>
        <Route element={<RouteTransitionWrapper />}>
          {/* More Root Page */}
          <Route path="/" element={<RootPage page="more" />} />
          <Route path="/nick" element={<NicknameChange />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/service" element={<Service />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/license" element={<License />} />
          <Route path="/remove" element={<UserRemove />} />
        </Route>
      </Routes>
    </RouteTransition>
  );
}
