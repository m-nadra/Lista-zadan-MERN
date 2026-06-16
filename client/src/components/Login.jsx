import { useActionState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/authPages.module.css";
import PasswordInput from "./ui/PasswordInput";

export default function Login() {
	const { handleLogin } = useAuth();
	const [errors, formAction] = useActionState(async (_, formData) => {
		const login = formData.get("login");
		const password = formData.get("password");
		const formErrors = {};

		if (!login) formErrors.login = "Podaj nazwę użytkownika";
		if (!password) formErrors.password = "Podaj hasło";

		if (Object.keys(formErrors).length === 0)
			formErrors.serverResponse = await handleLogin(login, password);
		return formErrors;
	}, {});

	return (
		<main className={styles.main}>
			<form action={formAction} className={styles.form}>
				<h1>Zaloguj się</h1>
				{errors.serverResponse && <p className={styles.p}>{errors.serverResponse}</p>}

				<label htmlFor="login">Nazwa użytkownika</label>
				<input type="text" id="login" name="login" />
				{errors.login && <p className={styles.p}>{errors.login}</p>}

				<PasswordInput name="password" />
				{errors.password && <p className={styles.p}>{errors.password}</p>}

				<input type="submit" value="Zaloguj się" />
			</form>
			<Link className={styles.link} to="/signup">
				Załóż konto
			</Link>
		</main>
	);
}
