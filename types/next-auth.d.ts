import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "learner" | "editor" | "admin";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "learner" | "editor" | "admin";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "learner" | "editor" | "admin";
  }
}
