import { createLogger, transports } from "winston";

const logger = createLogger({
	level: process.env.LOG_LEVEL,
	transports: [new transports.Console()]
});

export default logger;
