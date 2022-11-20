import { Route, Routes } from "react-router-dom";
import Chart from "./Chart";
import Main from "./Main";
import MyStudy from "./MyStudy";
import Setting from "./Setting";
import Studies from "./Studies";
import Timer from "./Timer";

const Router = () => {
  return (
    <Routes>
      <Route path="/timer" element={<Timer />} />;
      <Route path="/chart" element={<Chart />} />;
      <Route path="/studies" element={<Studies />} />;
      <Route path="/mystudy" element={<MyStudy />} />;
      <Route path="/setting" element={<Setting />} />;
    </Routes>
  );
};

export default Router;
