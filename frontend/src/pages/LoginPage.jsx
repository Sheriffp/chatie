import { useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import AnimatedBorder from "../components/AnimatedBorder";
import {
	MessageCircleIcon,
	LockIcon,
	MailIcon,
	LoaderIcon
} from "lucide-react";

const LoginPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});

	const { login, isLoggingIn } = useAuthStore();

	const handleSubmit = e => {
		e.preventDefault();
		login(formData);
	};

	return (
		<div className='w-full flex items-center justify-center p-4 bg-slate-900'>
			<div className='relative w-full max-w-6xl md-h-[800px] h-[650px]'>
				<AnimatedBorder>
					<div className='w-full flex flex-col md:flex-row'>
						{/*Form*/}
						<div className='md:w-1/2 p-8 flex flex items-center justify-center md:border-r border-slate-600/30'>
							<div className='w-full max-w-md'>
								<div className='text-center mb-8'>
									<MessageCircleIcon className='w-12 h-12 mx-auto text-slate-400 mb-4' />
									<h2 className='text-2xl font-bold text-slate-200 mb-2'>
										Welcome Back
									</h2>
									<p className='hidden:md text-slate-400'>
										Login now to chat with friends
									</p>
								</div>
								<form
									onSubmit={handleSubmit}
									className='space-y-6'
								>
									{/*email*/}
									<div>
										<label className='auth-input-label'>
											Email
										</label>
										<div className='relative'>
											<MailIcon className='auth-input-icon' />
											<input
												type='email'
												value={formData.email}
												onChange={e =>
													setFormData({
														...formData,
														email: e.target.value
													})
												}
												className='input'
												placeholder='johndoe@example.com'
											/>
										</div>
									</div>
									{/*password*/}
									<div>
										<label className='auth-input-label'>
											Password
										</label>
										<div className='relative'>
											<LockIcon className='auth-input-icon' />
											<input
												type='password'
												value={formData.password}
												onChange={e =>
													setFormData({
														...formData,
														password: e.target.value
													})
												}
												className='input'
												placeholder='Enter password'
											/>
										</div>
									</div>
									{/*submit btn*/}
									<button
										type='submit'
										className='auth-btn'
										disabled={isLoggingIn}
										onClick={handleSubmit}
									>
										{isLoggingIn ? (
											<LoaderIcon className='w-full h-5 animate-spin text-center' />
										) : (
											"Login"
										)}
									</button>
								</form>
								<div className='mt-6 text-center'>
									<Link to='/signup' className='auth-link'>
										Don't have an account? Sign Up
									</Link>
								</div>
							</div>
						</div>
						{/*illustration*/}
						<div className='hidden md:w-1/2 p-8 md:flex flex items-center justify-center bg-gradient-to-bl from-slate-800/20 to-transparent'>
							<div>
								<img
									src='/chatie.png'
									alt='chatie image'
									className='w-full h-auto object-contain'
								/>
								<div className='mt-2 text-center'>
									<h3 className='text-xl font-medium text-cyan-400'>
										Login now to chat with friends
									</h3>
									<div className='mt-4 flex justify-center gap-2'>
										<span className='auth-badge'>
											It's Free
										</span>
										<span className='auth-badge'>
											It's Easy
										</span>
										<span className='auth-badge'>
											It's Fast
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</AnimatedBorder>
			</div>
		</div>
	);
};

export default LoginPage;
