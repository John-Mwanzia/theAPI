import merge from "lodash/merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";
let envConfig;

if (stage === "testing") {
  envConfig = require("./testing").default;
} else if (stage === "production") {
  envConfig = require("./prod").default;
} else {
  envConfig = require("./local").default;
}

//coz its being merged undernaeth the envConfig we can override the properties according to the environment
export default merge({
    stage,
    env: process.env.NODE_ENV,
    port: 3000,

    secrets:{
        jwt: process.env.JWT_SECRET,
        dbUrl: process.env.DATABASE_URL
    },
}, envConfig);