import { Routes, Route } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
	const { authUser,login } = useAuthStore();
	return (
		<div className='min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden'>
			<div className='absolute top-0 -left-4 size-96 bg-purple-500 opacity-20 blur-[100px]' />
			<div className='absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]' />
			<Routes>
				<Route path='/' element={<ChatPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignupPage />} />
			</Routes>
		</div>
	);
};

export default App;
