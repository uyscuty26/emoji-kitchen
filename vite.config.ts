import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    base: "/emoji-kitchen/", // <--- این خط جدید برای حل مشکل آدرس‌دهی است
    build: {
      outDir: "build",
    },
    plugins: [react(), viteTsconfigPaths()],
    server: {
      host: "127.0.0.1",
    },
  };
});
