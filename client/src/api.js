async function apiFetch(endpoint, options = {}) {
	const config = {
		...options,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
	};
	try {
		const response = await fetch(endpoint, config);
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "API Error");
		}
		return await response;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

const api = {
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
export default api;
