import { Route, Routes } from "react-router-dom";
import NicknameChange from "./page/more/NicknameChange";
import DefaultLayout from "./layout/DefaultLayout";
import LandingGuide from "./layout/LandingGuide";
import NavLayout from "./layout/NavLayout";
import { Timer, Chart, AllStudies, MyStudy, More } from "./page";
import Characters from "./page/Characters";
import MakeDday from "./page/chart/MakeDday";
import Login from "./page/login";
import SignIn from "./page/login/SignIn";
import License from "./page/more/License";
import Notice from "./page/more/Notice";
import Personal from "./page/more/Personal";
import Service from "./page/more/Service";
import UserRemove from "./page/more/UserRemove";

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
				</Route>
				<Route element={<NavLayout />}>
					<Route path="timer" element={<Timer />} index />;
					<Route path="chart" element={<Chart />} />
					<Route path="allstudies" element={<AllStudies />} />;
					<Route path="mystudy" element={<MyStudy />} />;
					<Route path="more" element={<More />} />;
				</Route>
				<Route path="characters" element={<Characters />} />
				<Route path="more/nick" element={<NicknameChange />} />
				<Route path="more/notice" element={<Notice />} />
				<Route path="more/service" element={<Service />} />
				<Route path="more/personal" element={<Personal />} />
				<Route path="more/license" element={<License />} />
				<Route path="more/remove" element={<UserRemove />} />;
			</Route>
		</Routes>
	);
};

export default Router;
