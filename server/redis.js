import { createClient } from "redis";

const redis = await createClient({ url: "redis://redis:6379" }).on(
	"error",
	(err) => logger.error(`[redis] ${err}`),
);

export default redis;
