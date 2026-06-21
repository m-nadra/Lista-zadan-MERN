import { useState } from "react";

const wrapperStyle = {
	position: "relative",
	display: "block",
	width: "80%",
	margin: "0 auto"
};

const inputStyle = {
	width: "100%",
	boxSizing: "border-box",
	paddingRight: "40px"
};

const eyeButtonStyle = {
	position: "absolute",
	right: "10px",
	top: "50%",
	transform: "translateY(-50%)",
	border: "none",
	background: "none",
	cursor: "pointer",
	padding: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: "var(--text)"
};

export default function PasswordInput({ name }) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<label htmlFor={name}>Hasło</label>

			<div style={wrapperStyle}>
				<input type={showPassword ? "text" : "password"} id={name} name={name} style={inputStyle} />

				<button
					type="button"
					aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
					style={eyeButtonStyle}
					onClick={() => setShowPassword(prev => !prev)}
				>
					{showPassword ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-eye-off-icon lucide-eye-off"
						>
							<title>Show password button</title>
							<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
							<path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
							<path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
							<path d="m2 2 20 20" />
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-eye-icon lucide-eye"
						>
							<title>Hide password button</title>
							<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
							<circle cx="12" cy="12" r="3" />
						</svg>
					)}
				</button>
			</div>
		</>
	);
}
