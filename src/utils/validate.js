import { createDevParse } from "zod-dev";

// @ts-ignore
const isDev = import.meta.env.MODE !== "production";

export default createDevParse(isDev);
