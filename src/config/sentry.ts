import * as Sentry from "@sentry/node";
import express from "express";
require("dotenv").config();
import { ProfilingIntegration } from "@sentry/profiling-node";
const app = express();
Sentry.init({
    dsn: process.env.SENTRY_LOCAL,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      new ProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });

export default Sentry;
