import Home from "@/pages/Home";
import Rank from "@/pages/Rank";
import Singer from "@/pages/Singer";

// import { lazy, LazyExoticComponent } from "react";

// const Home = lazy(() => import("@/pages/Home"));
// const Rank = lazy(() => import("@/pages/Rank"));
// const Singer = lazy(() => import("@/pages/Singer"));

export type IRouterConfig = {
  path: string;
  component: () => JSX.Element;
  // LazyExoticComponent<() => JSX.Element>;
}[];

const routerConfig: IRouterConfig = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/rank",
    component: Rank,
  },
  {
    path: "/singer",
    component: Singer,
  },
];

export default routerConfig;
