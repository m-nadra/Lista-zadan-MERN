import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import Login from "@/components/Login";
import { useAuth } from "@/hooks/useAuth";
import "@testing-library/jest-dom";

vi.mock("@/hooks/useAuth");

function renderLogin() {
	return render(
		<MemoryRouter>
			<Login />
		</MemoryRouter>
	);
}

describe("Login", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("render component", async () => {
		useAuth.mockReturnValue({ handleLogin: vi.fn() });
		renderLogin();

		expect(screen.getByLabelText(/nazwa użytkownika/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /zaloguj się/i })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: /załóż konto/i })).toBeInTheDocument();
	});

	it("validate empty form", async () => {
		const handleLogin = vi.fn();
		useAuth.mockReturnValue({ handleLogin: vi.fn() });
		const user = userEvent.setup();
		renderLogin();

		await user.click(screen.getByRole("button", { name: /zaloguj się/i }));

		expect(await screen.findByText(/podaj nazwę użytkownika/i)).toBeInTheDocument();
		expect(await screen.findByText(/podaj hasło/i)).toBeInTheDocument();
		expect(handleLogin).not.toHaveBeenCalled();
	});

	it("login with valid credentials", async () => {
		const handleLogin = vi.fn().mockResolvedValue(undefined);
		useAuth.mockReturnValue({ handleLogin });
		const user = userEvent.setup();
		renderLogin();

		await user.type(screen.getByLabelText(/nazwa użytkownika/i), "johndoe");
		await user.type(screen.getByLabelText("Hasło"), "pass");
		await user.click(screen.getByRole("button", { name: /zaloguj się/i }));

		expect(handleLogin).toHaveBeenCalledWith("johndoe", "pass");
	});

	test("login with invalid credentials", async () => {
		const handleLogin = vi.fn().mockResolvedValue("Nieprawidłowy login lub hasło");
		useAuth.mockReturnValue({ handleLogin });
		const user = userEvent.setup();
		renderLogin();

		await user.type(screen.getByLabelText(/nazwa użytkownika/i), "johndoe");
		await user.type(screen.getByLabelText("Hasło"), "notpass");
		await user.click(screen.getByRole("button", { name: /zaloguj się/i }));

		expect(await screen.findByText(/nieprawidłowy login lub hasło/i)).toBeInTheDocument();
	});
});
