import app from "./app";
import { env } from "./config/env";

const server = () => {
  app.listen(env.port, () => {
    console.log(`Server is Running at: http://localhost:${env.port}`);
  });
};

server();
