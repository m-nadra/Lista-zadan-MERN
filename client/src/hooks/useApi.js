import { useAuthContext } from "../contexts/AuthContext";

export default function useApi() {
	const { accessToken } = useAuthContext();
	const apiFetch = async (url, options = {}) => {
		const config = {
			...options,
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				...(accessToken && { Authorization: `Bearer ${accessToken}` }),
				...options.headers,
			},
		};
		try {
			const response = await fetch(url, config);
			return response;
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	return {
		get: (url) => apiFetch(url),
		post: (url, body) =>
			apiFetch(url, {
				method: "POST",
				body: JSON.stringify(body),
			}),
		put: (url, body) =>
			apiFetch(url, {
				method: "PUT",
				body: JSON.stringify(body),
			}),
		delete: (url) =>
			apiFetch(url, {
				method: "DELETE",
			}),
	};
}
