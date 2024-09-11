import dayjs from "dayjs";

const customLogger = {
  base: undefined,
  timestamp: () => `,"time":"${dayjs().format("YYYY-MM-DD HH:mm:ss.SSSZ")}"`,
};
export default customLogger;
