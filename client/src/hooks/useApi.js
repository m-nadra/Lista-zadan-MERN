import { useCallback, useMemo } from "react";
import { useAuthContext } from "../contexts/AuthContext";

export default function useApi() {
	const { accessToken, setAccessToken, setStatus } = useAuthContext();
	const apiFetch = useCallback(
		async (url, options = {}) => {
			const config = {
				...options,
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					...(accessToken && { Authorization: `Bearer ${accessToken}` }),
					...options.headers
				}
			};
			try {
				const response = await fetch(url, config);
				if (response.status === 401) throw new Error("Access token expired");
				return response;
			} catch (err) {
				console.error(err);
				setStatus("unauthenticated");
				setAccessToken(null);
			}
		},
		[accessToken, setAccessToken, setStatus]
	);
	return useMemo(
		() => ({
			get: url => apiFetch(url),
			post: (url, body) =>
				apiFetch(url, {
					method: "POST",
					body: JSON.stringify(body)
				}),
			put: (url, body) =>
				apiFetch(url, {
					method: "PUT",
					body: JSON.stringify(body)
				}),
			delete: url =>
				apiFetch(url, {
					method: "DELETE"
				})
		}),
		[apiFetch]
	);
}
