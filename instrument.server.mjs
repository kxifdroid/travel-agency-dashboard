import * as Sentry from "@sentry/react-router";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
Sentry.init({
    dsn: "https://bda5c654858a58eab0ac38b5e640347f@o4511474882838528.ingest.us.sentry.io/4511596296667136",
    dataCollection: {
        // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
        // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#dataCollection
        // userInfo: false,
        // httpBodies: [],
    },
    // Enable logs to be sent to Sentry
    enableLogs: true,
    // Add our Profiling integration
    integrations: [nodeProfilingIntegration()],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for tracing.
    // We recommend adjusting this value in production
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#tracesSampleRate
    tracesSampleRate: 1.0,
    // Enable profiling for a percentage of sessions
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/configuration/options/#profileSessionSampleRate
    profileSessionSampleRate: 1.0,
});
