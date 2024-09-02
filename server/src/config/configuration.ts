import { config as configDotenv } from "dotenv";

configDotenv();

export default () => ({
  port: process.env.PORT || 3000,
  database: {
    DB_CONNECTION: process.env.DB_CONNECTION || "mongodb",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || "27017",
    DB_DATABASE: process.env.DB_DATABASE || "TaskManagement",
    DB_USERNAME: process.env.DB_PASSWORD || "",
    DB_PASSWORD: process.env.DB_PASSWORD || "",
  },
  SECRET: process.env.SECRET || "myjwtsecret",
  EXPIRES_IN: process.env.EXPIRES_IN || "24h",
  MYCUSTOMLABELS: {
    totalDocs: "itemCount",
    docs: "data",
    limit: "perPage",
    page: "currentPage",
    nextPage: "next",
    prevPage: "prev",
    totalPages: "pageCount",
    pagingCounter: "slNo",
    meta: "paginator",
  },
});
