import React from "react";
import renderer from "react-test-renderer";
import PastPostList from "../../../src/components/Profile/PastPostList";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn()
  })
}));

describe("Test Past Post List UI", () => {
  it("Renders correctly", () => {
    const tree = renderer
      .create(
        <PastPostList
          postsData={[
            {
              forumData: { img: "forum-img", title: "First Forum" },
              postData: {
                timestamp: new Date(2022, 4, 8),
                lastEdited: new Date(2022, 5, 5),
                title: "Post Title",
                content: "Post Content"
              }
            }
          ]}
          Header={() => <></>}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
