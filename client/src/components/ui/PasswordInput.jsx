import { useState } from "react";

const inputWrapperStyle = {
	display: "flex",
	alignItems: "center",
	gap: "0.5rem"
};

const toggleButtonStyle = {
	cursor: "pointer"
};

export default function PasswordInput() {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<label htmlFor="password">Hasło</label>
			<div style={inputWrapperStyle}>
				<input type={showPassword ? "text" : "password"} id="password" name="password" />
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
