import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { sentryReactRouter } from "@sentry/react-router";

export default defineConfig((config) => {
  return {
    plugins: [
      tailwindcss(),
      reactRouter(),
      sentryReactRouter({
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        authToken: process.env.SENTRY_AUTH_TOKEN,
      }, config),
    ],
    resolve: {
      tsconfigPaths: true,
    },
    ssr: {
      noExternal: [/@syncfusion/]
    }
  };
});

