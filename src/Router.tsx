import { Route, Routes } from "react-router-dom";
import { Timer, Chart, AllStudies, MyStudy, More } from "./page";

const Router = () => {
  return (
    <Routes>
      <Route path="/timer" element={<Timer />} />;
      <Route path="/chart" element={<Chart />} />;
      <Route path="/allstudies" element={<AllStudies />} />;
      <Route path="/mystudy" element={<MyStudy />} />;
      <Route path="/more" element={<More />} />;
    </Routes>
  );
};

export default Router;
