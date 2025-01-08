// routes.ts
export enum Routes {
    LOGIN = "/login",
    CADASTRO = "/login/cadastro",
    HOME = "/home",
    PERFIL = "/profile",
    DASHBOARD = "/dashboard",
  }
export type RoutePaths = keyof typeof Routes;