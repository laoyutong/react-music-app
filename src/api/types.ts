export interface IBannerData {
  banners: {
    imageUrl: string;
  }[];
}

export interface IRecommandListData {
  result: {
    id: number;
    name: string;
    picUrl: string;
  }[];
}

export interface ISingerListParams {
  category: string;
  alpha: string;
}

export interface ISingerListData {
  artists: {
    id: number;
    picUrl: string;
    name: string;
  }[];
}

export interface IRankListData {
  list: {
    id: number;
    name: string;
    description: string;
    coverImgUrl: string;
  }[];
}

export interface ISearchHotListData {
  result: {
    hots: {
      first: string;
    }[];
  };
}

export interface ISearchSingersData {
  result: {
    artists: {
      id: number;
      name: string;
      picUrl: string;
    }[];
  };
}

export interface ISearchSongsData {
  result: {
    songs: {
      id: string;
      name: string;
    }[];
  };
}
