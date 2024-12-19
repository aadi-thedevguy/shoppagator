import { Access } from "payload";

export const isAdmin: Access = ({ req }) => req?.user?.role === "admin"