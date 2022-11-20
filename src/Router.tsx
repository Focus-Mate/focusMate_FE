import { Route, Routes } from "react-router-dom";
import Chart from "./Chart";
import Main from "./Main";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />;
      <Route path="/chart" element={<Chart />} />;
    </Routes>
  );
};

export default Router;
