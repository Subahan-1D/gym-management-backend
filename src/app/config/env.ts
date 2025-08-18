import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  port: string;
  mongodb_uri: string;
  node_env: "development" | "production";
  BCRYPT_SALT_ROUND: string;
  JWT_ACCESS_SECRET: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = [
    "MONGODB_URI",
    "node_env",
    "BCRYPT_SALT_ROUND",
    "JWT_ACCESS_SECRET",
  ]; // port removed

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable ${key}`);
    }
  });

  return {
    port: process.env.PORT || "8000", // fallback for Vercel
    mongodb_uri: process.env.MONGODB_URI as string,
    node_env: process.env.NODE_ENV as "development" | "production",
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
  };
};

export const envVars = loadEnvVariables();
