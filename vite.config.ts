import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: { open: true },
    base: isProd ? "/search-character/" : "/",
    resolve: {
        alias: {
            "@styles": path.resolve(process.cwd(), "src/styles/index.scss"),
            "@ui-kit": path.resolve(process.cwd(), "src/ui-kit/index.ts"),
            "@pages": path.resolve(process.cwd(), "src/pages/index.ts"),
            "@components": path.resolve(
                process.cwd(),
                "src/components/index.ts"
            ),

            "@constants": path.resolve(
                process.cwd(),
                "src/utils/constants/index.ts"
            ),
            "@api": path.resolve(process.cwd(), "src/utils/api/index.ts"),
        },
    },
    build: {
        outDir: "dist",
        assetsDir: "assets",
        rollupOptions: {
            input: path.resolve(__dirname, "index.html"),
        },
    },
});
