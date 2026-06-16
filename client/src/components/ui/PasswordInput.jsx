import { useState } from "react";

const inputWrapperStyle = {
	display: "flex",
	alignItems: "center",
	gap: "0.5rem"
};

const toggleButtonStyle = {
	cursor: "pointer"
};

export default function PasswordInput({ name }) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<label htmlFor={name}>Hasło</label>
			<div style={inputWrapperStyle}>
				<input type={showPassword ? "text" : "password"} id={name} name={name} />
				<button
					type="button"
					style={toggleButtonStyle}
					onClick={() => setShowPassword(prevShowPassword => !prevShowPassword)}
				>
					{showPassword ? "Ukryj" : "Pokaż"}
				</button>
			</div>
		</>
	);
}
