import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import LandingGuide from "./layout/LandingGuide";
import { Timer, Chart, AllStudies, MyStudy, More } from "./page";
import MakeDday from "./page/chart/MakeDday";
import Login from "./page/login";
import SignIn from "./page/login/SignIn";

const Router = () => {
	return (
		<Routes>
			<Route element={<DefaultLayout />}>
				<Route path="timer" element={<Timer />} index />;
			</Route>
			{/* NOTE LandingGuide = 랜딩 분기점 (추후에 로그인/게스트 분기점) */}
			<Route path="/" element={<LandingGuide />}>
				{/* NOTE DefaultLayout = 하단에 Navigation 붙어있는 layout component */}
				<Route element={<DefaultLayout />}>
					<Route path="timer" element={<Timer />} index />;
					<Route path="chart" element={<Chart />} />
					<Route path="allstudies" element={<AllStudies />} />;
					<Route path="mystudy" element={<MyStudy />} />;
					<Route path="more" element={<More />} />;
				</Route>
				<Route path="login" element={<Login />} />
				<Route path="signin" element={<SignIn />} />

				<Route path="makedday" element={<MakeDday />} />
			</Route>
		</Routes>
	);
};

export default Router;
