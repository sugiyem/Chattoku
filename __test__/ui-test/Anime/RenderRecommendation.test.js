import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import RenderRecommendation from "../../../src/components/Anime/RenderRecommendation";
import { favoriteType } from "../../../src/constants/Favorite";

const mockSetState = jest.fn();
const mockBackNavigate = jest.fn();
const mockNavigation = {
  goBack: mockBackNavigate
};
const mockSource = {
  demographics: [],
  genres: ["Action", "Adventure", "Fantasy"],
  id: 23321,
  image: "https://cdn.myanimelist.net/images/anime/5/68097.jpg",
  themes: ["Adult Cast", "Video Game"],
  title: "Log Horizon 2nd Season",
  url: "https://myanimelist.net/anime/23321/Log_Horizon_2nd_Season"
};
const mockData = {
  aired: {
    from: "2013-10-05T00:00:00+00:00",
    prop: {
      from: {
        day: 5,
        month: 10,
        year: 2013
      },
      to: {
        day: 22,
        month: 3,
        year: 2014
      }
    },
    string: "Oct 5, 2013 to Mar 22, 2014",
    to: "2014-03-22T00:00:00+00:00"
  },
  airing: false,
  background:
    "Log Horizon adapts the first five volumes of Mamare Touno's novel series of the same title.",
  broadcast: {
    day: "Saturdays",
    string: "Saturdays at 17:30 (JST)",
    time: "17:30",
    timezone: "Asia/Tokyo"
  },
  demographics: [],
  duration: "25 min per ep",
  episodes: 25,
  explicit_genres: [],
  favorites: 9950,
  genres: [
    {
      mal_id: 1,
      name: "Action",
      type: "anime",
      url: "https://myanimelist.net/anime/genre/1/Action"
    },
    {
      mal_id: 2,
      name: "Adventure",
      type: "anime",
      url: "https://myanimelist.net/anime/genre/2/Adventure"
    },
    {
      mal_id: 10,
      name: "Fantasy",
      type: "anime",
      url: "https://myanimelist.net/anime/genre/10/Fantasy"
    }
  ],
  images: {
    jpg: {
      image_url: "https://cdn.myanimelist.net/images/anime/5/84004.jpg",
      large_image_url: "https://cdn.myanimelist.net/images/anime/5/84004l.jpg",
      small_image_url: "https://cdn.myanimelist.net/images/anime/5/84004t.jpg"
    },
    webp: {
      image_url: "https://cdn.myanimelist.net/images/anime/5/84004.webp",
      large_image_url: "https://cdn.myanimelist.net/images/anime/5/84004l.webp",
      small_image_url: "https://cdn.myanimelist.net/images/anime/5/84004t.webp"
    }
  },
  licensors: [
    {
      mal_id: 102,
      name: "Funimation",
      type: "anime",
      url: "https://myanimelist.net/anime/producer/102/Funimation"
    },
    {
      mal_id: 376,
      name: "Sentai Filmworks",
      type: "anime",
      url: "https://myanimelist.net/anime/producer/376/Sentai_Filmworks"
    }
  ],
  mal_id: 17265,
  members: 1027837,
  popularity: 117,
  producers: [
    {
      mal_id: 111,
      name: "NHK",
      type: "anime",
      url: "https://myanimelist.net/anime/producer/111/NHK"
    }
  ],
  rank: 662,
  rating: "PG-13 - Teens 13 or older",
  score: 7.94,
  scored_by: 539375,
  season: "fall",
  source: "Light novel",
  status: "Finished Airing",
  studios: [
    {
      mal_id: 41,
      name: "Satelight",
      type: "anime",
      url: "https://myanimelist.net/anime/producer/41/Satelight"
    }
  ],
  synopsis:
    'In the blink of an eye, thirty thousand bewildered Japanese gamers are whisked from their everyday lives into the world of the popular MMORPG, Elder Tale, after the game\'s latest update—unable to log out. Among them is the socially awkward college student Shiroe, whose confusion and shock lasts only a moment as, a veteran of the game, he immediately sets out to explore the limits of his new reality. Shiroe must learn to live in this new world, leading others and negotiating with the NPC "natives" in order to bring stability to the virtual city of Akihabara. He is joined by his unfortunate friend Naotsugu, having logged in for the first time in years only to find himself trapped, and Akatsuki, a petite but fierce assassin who labels Shiroe as her master. A tale of fantasy, adventure, and politics, Log Horizon explores the elements of gaming through the eyes of a master strategist who attempts to make the best of a puzzling situation. [Written by MAL Rewrite]',
  themes: [
    {
      mal_id: 50,
      name: "Adult Cast",
      type: "anime",
      url: "https://myanimelist.net/anime/genre/50/Adult_Cast"
    },
    {
      mal_id: 79,
      name: "Video Game",
      type: "anime",
      url: "https://myanimelist.net/anime/genre/79/Video_Game"
    }
  ],
  title: "Log Horizon",
  title_english: "Log Horizon",
  title_japanese: "ログ・ホライズン",
  title_synonyms: [],
  trailer: {
    embed_url:
      "https://www.youtube.com/embed/IG1VhJ75r8k?enablejsapi=1&wmode=opaque&autoplay=1",
    images: {
      image_url: "https://img.youtube.com/vi/IG1VhJ75r8k/default.jpg",
      large_image_url: "https://img.youtube.com/vi/IG1VhJ75r8k/hqdefault.jpg",
      maximum_image_url:
        "https://img.youtube.com/vi/IG1VhJ75r8k/maxresdefault.jpg",
      medium_image_url: "https://img.youtube.com/vi/IG1VhJ75r8k/mqdefault.jpg",
      small_image_url: "https://img.youtube.com/vi/IG1VhJ75r8k/sddefault.jpg"
    },
    url: "https://www.youtube.com/watch?v=IG1VhJ75r8k",
    youtube_id: "IG1VhJ75r8k"
  },
  type: "TV",
  url: "https://myanimelist.net/anime/17265/Log_Horizon",
  year: 2013
};
jest.mock("@react-navigation/core", () => ({
  useNavigation: () => mockNavigation
}));

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [
    initial === undefined
      ? 1
      : initial === null
      ? mockData
      : typeof initial === "boolean"
      ? true
      : [1, 2, 3],
    mockSetState
  ],
  useEffect: () => {}
}));

describe("RenderRecommendation UI test", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <RenderRecommendation
          type={favoriteType.ANIME}
          genreList={[]}
          sourceAnime={mockSource}
          navigation={mockNavigation}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Navigation Button Works", () => {
    const { getByTestId } = render(
      <RenderRecommendation
        type={favoriteType.ANIME}
        genreList={[]}
        sourceAnime={mockSource}
        navigation={mockNavigation}
      />
    );

    fireEvent.press(getByTestId("backButton"));
    expect(mockBackNavigate).toHaveBeenCalled();
  });

  it("Pagination Button Works", () => {
    const { getByTestId } = render(
      <RenderRecommendation
        type={favoriteType.ANIME}
        genreList={[]}
        sourceAnime={mockSource}
        navigation={mockNavigation}
      />
    );

    fireEvent.press(getByTestId("decreaseButton"));
    expect(mockSetState).toHaveBeenCalledWith(0);

    fireEvent.press(getByTestId("increaseButton"));
    expect(mockSetState).toHaveBeenCalledWith(2);
  });
});
