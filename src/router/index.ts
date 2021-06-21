import Home from "@/pages/Home";

export type IRouterConfig = {
  path: string;
  redirect?: string;
  component?: () => JSX.Element;
}[];

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
