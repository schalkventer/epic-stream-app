import { createDevParse } from "zod-dev";

// @ts-ignore
const isDev = import.meta.env.MODE !== "production";

/**
 * Think wrapper over the `zod-dev` NPM package to ensure that type-checking
 * does not happen in production.
 */
export const check = createDevParse(isDev);
