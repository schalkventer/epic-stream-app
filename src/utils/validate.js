import { createDevParse } from "zod-dev";

// @ts-ignore
const isDev = import.meta.env.MODE !== "production";

const validate = createDevParse(isDev);
export default validate;
