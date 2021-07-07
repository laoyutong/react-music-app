import Home from "@/pages/Home";
import Rank from "@/pages/Rank";
import Singer from "@/pages/Singer";
import Search from "@/pages/Search";
import SingerDetail from "@/pages/SingerDetail";
import AlbumDetail from "@/pages/AlbumDetail";

// import { lazy, LazyExoticComponent } from "react";

// const Home = lazy(() => import("@/pages/Home"));
// const Rank = lazy(() => import("@/pages/Rank"));
// const Singer = lazy(() => import("@/pages/Singer"));

export interface IRouterComponentProps {
  changeRouter: (path: string, index?: number) => void;
  onRouterBack: () => void;
}

export type IRouterConfig = {
  path: string;
  component: (props: IRouterComponentProps) => JSX.Element;
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
  {
    path: "/search",
    component: Search,
  },
  {
    path: "/singerDetail",
    component: SingerDetail,
  },
  {
    path: "/albumDetail",
    component: AlbumDetail,
  },
];

export default routerConfig;
