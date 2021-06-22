export const navigationHeaderConfig = [
  { label: "首页", path: "/home" },
  { label: "排行", path: "/rank" },
  { label: "歌手", path: "/singer" },
];

export const classListConfig = ["first", "middle", "last"] as const;

export const transformDisConfig = {
  first: -82,
  middle: 0,
  last: 74,
};
