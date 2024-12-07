import devConfig from "./development.config";
import prodConfig from "./production.config";
import stagingConfig from "./staging.config";

// const env = process.env.REACT_APP_ENV || "development";
const env = "development";

interface Config {
  API: {
    BASE_URL: string;
  };
  CLIENT: {
    BASE_URL: string;
  };
  FIREBASE: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
}

const config: Record<string, Config> = {
  development: devConfig,
  staging: stagingConfig,
  production: prodConfig,
};

export default config[env];
