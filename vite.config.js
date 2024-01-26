/* eslint-disable import/no-extraneous-dependencies */

import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), VitePWA({ registerType: "autoUpdate" })],
});
