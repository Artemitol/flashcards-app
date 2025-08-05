import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@scss": path.resolve("src/shared/scss"),
            "@app": path.resolve("src/app"),
            "@pages": path.resolve("src/pages"),
            "@widgets": path.resolve("src/widgets"),
            "@entities": path.resolve("src/entities"),
            "@features": path.resolve("src/features"),
            "@shared": path.resolve("src/shared"),
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
