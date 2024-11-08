import { Client, Account, Databases } from "appwrite";

// Initialize Appwrite
const client = new Client()
  .setEndpoint("https://[APPWRITE_ENDPOINT]") // Your Appwrite endpoint
  .setProject("[PROJECT_ID]"); // Your Appwrite project ID

export const account = new Account(client);
export const databases = new Databases(client);
