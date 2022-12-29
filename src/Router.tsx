import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import LandingGuide from "./layout/LandingGuide";
import { Timer, Chart, AllStudies, MyStudy, More } from "./page";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingGuide />}>
        <Route element={<DefaultLayout />}>
          <Route path="timer" element={<Timer />} index />;
          <Route path="chart" element={<Chart />} />;
          <Route path="allstudies" element={<AllStudies />} />;
          <Route path="mystudy" element={<MyStudy />} />;
          <Route path="more" element={<More />} />;
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
