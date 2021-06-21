import { lazy, LazyExoticComponent } from "react";

const Home = lazy(() => import("@/pages/Home"));

export type IRouterConfig = (
  | {
      path: string;
      redirect: string;
    }
  | {
      path: string;
      component: LazyExoticComponent<() => JSX.Element>;
    }
)[];

const routerConfig: IRouterConfig = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
];

export default routerConfig;
