import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(timezone);
dayjs.extend(utc);

dayjs.tz.setDefault("Asia/Ho_Chi_Minh");
