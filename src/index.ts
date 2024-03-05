import express, { NextFunction, Request } from "express";
import { Sequelize, connectDB } from "./config/dbconfig";
import routes from "./routes";
import cors from "cors";
import swaggerFile from "./utils/swagger-output.json";
import swaggerUi from "swagger-ui-express";
import Sentry from "./config/sentry";
import * as path from "path";

const app = express();

// EJS 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());

app.use(express.json());

// app.use(bodyParser({ extended: false }));

app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());

app.use("/api", routes);

app.use(Sentry.Handlers.errorHandler());

app.use((err: any, req: Request, res: any, next: NextFunction) => {
  let statusCode = err?.statusCode || 500;
  let message = err?.message || "unknown error";
  let errors = err?.errors;
  res.status(statusCode).json({
    statusCode: statusCode,
    message: message,
    errors: errors,
  });
});

app.listen(process.env.PORT || 3000, async () => {
  console.log(
    `🚀Server started Successfully at port http://localhost:${process.env.PORT}`
  );
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

  connectDB((sequelize: Sequelize) => {
    sequelize.sync({ force: false }).then(() => {
      console.log("✅Synced database successfully...");
    });
  });
});
