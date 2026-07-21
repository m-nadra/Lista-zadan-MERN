import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import Signup from "@/components/Signup";
import { useAuth } from "@/hooks/useAuth";
import "@testing-library/jest-dom";

vi.mock("@/hooks/useAuth");

function renderSignup() {
	return render(
		<MemoryRouter>
			<Signup />
		</MemoryRouter>
	);
}

describe("Signup", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("render component", async () => {
		useAuth.mockReturnValue({ handleSignup: vi.fn() });
		renderSignup();

		expect(screen.getByLabelText(/nazwa użytkownika/i)).toBeInTheDocument();
		expect(screen.getAllByLabelText("Hasło")).toHaveLength(2);
		expect(screen.getByRole("button", { name: /załóż konto/i })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: /zaloguj się/i })).toBeInTheDocument();
	});

	it("validate empty form", async () => {
		const handleSignup = vi.fn();
		useAuth.mockReturnValue({ handleSignup });
		const user = userEvent.setup();
		renderSignup();

		await user.click(screen.getByRole("button", { name: /załóż konto/i }));

		expect(await screen.findByText(/podaj nazwę użytkownika/i)).toBeInTheDocument();
		expect(await screen.findAllByText(/podaj hasło/i)).toHaveLength(2);
		expect(handleSignup).not.toHaveBeenCalled();
	});

	it("signup with valid credentials", async () => {
		const handleSignup = vi.fn().mockResolvedValue(undefined);
		useAuth.mockReturnValue({ handleSignup });
		const user = userEvent.setup();
		renderSignup();

		await user.type(screen.getByLabelText(/nazwa użytkownika/i), "johndoe");
		await user.type(screen.getAllByLabelText("Hasło")[0], "pass");
		await user.type(screen.getAllByLabelText("Hasło")[1], "pass");
		await user.click(screen.getByRole("button", { name: /załóż konto/i }));

		expect(handleSignup).toHaveBeenCalledWith("johndoe", "pass");
	});

	it("signup with mismatched passwords", async () => {
		const handleSignup = vi.fn();
		useAuth.mockReturnValue({ handleSignup });
		const user = userEvent.setup();
		renderSignup();

		await user.type(screen.getByLabelText(/nazwa użytkownika/i), "johndoe");
		await user.type(screen.getAllByLabelText("Hasło")[0], "pass");
		await user.type(screen.getAllByLabelText("Hasło")[1], "different");
		await user.click(screen.getByRole("button", { name: /załóż konto/i }));

		expect(await screen.findByText(/hasła nie są takie same/i)).toBeInTheDocument();
		expect(handleSignup).not.toHaveBeenCalled();
	});

	it("signup with server error", async () => {
		const handleSignup = vi.fn().mockResolvedValue("Użytkownik już istnieje");
		useAuth.mockReturnValue({ handleSignup });
		const user = userEvent.setup();
		renderSignup();

		await user.type(screen.getByLabelText(/nazwa użytkownika/i), "existinguser");
		await user.type(screen.getAllByLabelText("Hasło")[0], "pass");
		await user.type(screen.getAllByLabelText("Hasło")[1], "pass");
		await user.click(screen.getByRole("button", { name: /załóż konto/i }));

		expect(await screen.findByText(/użytkownik już istnieje/i)).toBeInTheDocument();
	});
});
