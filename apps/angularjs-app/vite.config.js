import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
	// config options
	root: "./src",
	base: "./",
	build: {
		outDir: process.cwd() + "/dist",
		emptyOutDir: true,
		sourcemap: true,
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		open: true,
		proxy: {
			// string shorthand
			"/api": "http://localhost:8080",
		},
	},
});
