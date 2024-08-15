// vite.config.ts
import { defineConfig } from "file:///home/jauger/school/kreative-club-inertia/node_modules/.pnpm/vite@5.2.6_@types+node@20.11.30_lightningcss@1.23.0/node_modules/vite/dist/node/index.js";
import { getDirname } from "file:///home/jauger/school/kreative-club-inertia/node_modules/.pnpm/@adonisjs+core@6.3.1_@adonisjs+assembler@7.2.3_typescript@5.4.3__@vinejs+vine@1.8.0_edge.js@6.0.2/node_modules/@adonisjs/core/build/src/helpers/main.js";
import inertia from "file:///home/jauger/school/kreative-club-inertia/node_modules/.pnpm/@adonisjs+inertia@1.0.0-19_@adonisjs+core@6.3.1_@adonisjs+assembler@7.2.3_typescript@5.4.3__@_yydgdthgagsqncasyd5jghsyfi/node_modules/@adonisjs/inertia/build/src/plugins/vite.js";
import react from "file:///home/jauger/school/kreative-club-inertia/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@5.2.6_@types+node@20.11.30_lightningcss@1.23.0_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import adonisjs from "file:///home/jauger/school/kreative-club-inertia/node_modules/.pnpm/@adonisjs+vite@3.0.0-9_@adonisjs+core@6.3.1_@adonisjs+assembler@7.2.3_typescript@5.4.3__@vine_5433awch4my2stdjh3hb6j2yce/node_modules/@adonisjs/vite/build/src/client/main.js";
import svgr from "file:///home/jauger/school/kreative-club-inertia/node_modules/.pnpm/vite-plugin-svgr@4.2.0_rollup@4.13.0_typescript@5.4.3_vite@5.2.6_@types+node@20.11.30_lightningcss@1.23.0_/node_modules/vite-plugin-svgr/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///home/jauger/school/kreative-club-inertia/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: "inertia/app/ssr.tsx" } }),
    react(),
    adonisjs({ entrypoints: ["inertia/app/app.tsx"], reload: ["resources/views/**/*.edge"] }),
    svgr()
  ],
  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      "~/": `${getDirname(__vite_injected_original_import_meta_url)}/inertia/`
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9qYXVnZXIvc2Nob29sL2tyZWF0aXZlLWNsdWItaW5lcnRpYVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvamF1Z2VyL3NjaG9vbC9rcmVhdGl2ZS1jbHViLWluZXJ0aWEvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvamF1Z2VyL3NjaG9vbC9rcmVhdGl2ZS1jbHViLWluZXJ0aWEvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgZ2V0RGlybmFtZSB9IGZyb20gJ0BhZG9uaXNqcy9jb3JlL2hlbHBlcnMnXG5pbXBvcnQgaW5lcnRpYSBmcm9tICdAYWRvbmlzanMvaW5lcnRpYS9jbGllbnQnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgYWRvbmlzanMgZnJvbSAnQGFkb25pc2pzL3ZpdGUvY2xpZW50J1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3ZncidcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIGluZXJ0aWEoeyBzc3I6IHsgZW5hYmxlZDogdHJ1ZSwgZW50cnlwb2ludDogJ2luZXJ0aWEvYXBwL3Nzci50c3gnIH0gfSksXG4gICAgcmVhY3QoKSxcbiAgICBhZG9uaXNqcyh7IGVudHJ5cG9pbnRzOiBbJ2luZXJ0aWEvYXBwL2FwcC50c3gnXSwgcmVsb2FkOiBbJ3Jlc291cmNlcy92aWV3cy8qKi8qLmVkZ2UnXSB9KSxcbiAgICBzdmdyKCksXG4gIF0sXG5cbiAgLyoqXG4gICAqIERlZmluZSBhbGlhc2VzIGZvciBpbXBvcnRpbmcgbW9kdWxlcyBmcm9tXG4gICAqIHlvdXIgZnJvbnRlbmQgY29kZVxuICAgKi9cbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnfi8nOiBgJHtnZXREaXJuYW1lKGltcG9ydC5tZXRhLnVybCl9L2luZXJ0aWEvYCxcbiAgICB9LFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlMsU0FBUyxvQkFBb0I7QUFDMVUsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sV0FBVztBQUNsQixPQUFPLGNBQWM7QUFDckIsT0FBTyxVQUFVO0FBTHlLLElBQU0sMkNBQTJDO0FBTzNPLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxNQUFNLFlBQVksc0JBQXNCLEVBQUUsQ0FBQztBQUFBLElBQ3JFLE1BQU07QUFBQSxJQUNOLFNBQVMsRUFBRSxhQUFhLENBQUMscUJBQXFCLEdBQUcsUUFBUSxDQUFDLDJCQUEyQixFQUFFLENBQUM7QUFBQSxJQUN4RixLQUFLO0FBQUEsRUFDUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxNQUFNLEdBQUcsV0FBVyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
