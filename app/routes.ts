import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/problem-with-overlay", "./routes/problem-with-overlay.tsx"),
] satisfies RouteConfig;
