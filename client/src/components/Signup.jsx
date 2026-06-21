import { useActionState } from "react";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import styles from "@/styles/authPages.module.css";
import PasswordInput from "./ui/PasswordInput";

export default function Signup() {
	const { handleSignup } = useAuth();
	const [errors, formAction] = useActionState(async (_, formData) => {
		const username = formData.get("username");
		const password = formData.get("password");
		const password2 = formData.get("password2");
		const formErrors = {};

		if (!username) formErrors.username = "Podaj nazwę użytkownika";
		if (!password) formErrors.password = "Podaj hasło";
		if (!password2) formErrors.password2 = "Podaj hasło";
		if (password !== password2) formErrors.password2 = "Hasła nie są takie same";

		if (Object.keys(formErrors).length === 0)
			formErrors.serverResponse = await handleSignup(username, password);
		return formErrors;
	}, {});

	return (
		<main className={styles.main}>
			<h1>Zarejestruj się</h1>
			{errors.serverResponse && <p className={styles.p}>{errors.serverResponse}</p>}

			<form action={formAction} className={styles.form}>
				<label htmlFor="username">Nazwa użytkownika</label>
				<input type="text" id="username" name="username" placeholder=" " />
				{errors.username && <p className={styles.p}>{errors.username}</p>}

				<PasswordInput name="password" />
				{errors.password && <p className={styles.p}>{errors.password}</p>}

				<PasswordInput name="password2" />
				{errors.password2 && <p className={styles.p}>{errors.password2}</p>}

				<input type="submit" value="Załóż konto" />
			</form>

			<Link className={styles.link} to="/login">
				Posiadasz konto? Zaloguj się
			</Link>
		</main>
	);
}
