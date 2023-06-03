import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendData } from '../src/Service';
import { basicUrl } from '../src/config';

const Login = (navigate) => {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		// Here you can add your authentication logic
		console.log(`userName: ${email}, Password: ${password}`);
		const user = sendData(basicUrl + 'login', { email, password });
		console.log(user);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
                Email:
				<input type="email" value={email} onChange={handleEmailChange} />
			</label>
			<label>
                Password:
				<input type="password" value={password} onChange={handlePasswordChange} />
			</label>
			<button type="submit">Log in</button>

			{/* <Link
                onClick={() => navigate("/SignUp")}
                href="#"
                variant="body2"
            >
                {"עדיין לא יצרת חשבון?  הרשם כעת"}
            </Link>  */}

            ְְ
		</form>
	);
};
const SignUp = (navigate) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Here you can add your sign up logic
		console.log(`Email: ${email}, Password: ${password}`);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
                Email:
				<input type="email" value={email} onChange={handleEmailChange} />
			</label>
			<label>
                Password:
				<input type="password" value={password} onChange={handlePasswordChange} />
			</label>
			<button type="submit">Sign up</button>
			<Link
				onClick={() => navigate('/login')}
				href="#"
				variant="body2"
			>
                יש לך כבר חשבון? התחבר
			</Link>

		</form>
	);
};
export { Login, SignUp };
