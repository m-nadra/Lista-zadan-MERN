import jwt from "jsonwebtoken";
import { createClient } from "redis";

const redis = await createClient({ url: "redis://redis:6379" }).on(
	"error",
	(err) => logger.error(`[redis] ${err}`),
);

export const getAccessToken = async (userId) =>
	jwt.sign({ id: userId }, process.env.JWTPRIVATEKEY, {
		expiresIn: 60 * 15,
	});

export const getRefreshToken = async (userId) => {
	const jti = crypto.randomUUID();
	await redis.set(jti, userId.toString(), {
		EX: 60 * 60 * 24 * 7,
		NX: true,
	});
	return jwt.sign(
		{ id: userId.toString(), jti: jti, type: "refresh" },
		process.env.JWTPRIVATEKEY,
		{
			expiresIn: 60 * 24 * 7,
		},
	);
};

export const getPayloadfromToken = (token) => {
	try {
		return jwt.verify(token, process.env.JWTPRIVATEKEY);
	} catch (err) {
		throw new InvalidToken(err.message);
	}
};

export const deleteTokenfromRedis = async (token) => {
	const payload = getPayloadfromToken(token);
	await redis.del(payload.jti);
};

class InvalidToken extends Error {
	constructor(message) {
		super(message);
		this.name = "InvalidToken";
	}
}

export const verifyRefreshTokenPayload = async (payload) => {
	const userId = await redis.get(payload.jti);
	return payload.id === userId;
};

export default redis;
