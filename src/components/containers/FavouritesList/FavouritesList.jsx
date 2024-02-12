import { useEffect } from "react";
import episodes from "../../../data/episodes";
import favourites from "../../../data/favourites";
import { Component as PageSection } from "../../presentation/PageSection";
import { Component as EpisodePreview } from "../../presentation/EpisodePreview";

export const Component = () => {
  const favList = favourites.hooks.useList();
  // const { result: list, change } = episodes.hooks.useList();

  // useEffect(() => {
  //   if (!favList) return;
  //   const inner = Object.keys(favList);
  //   change(inner);
  // }, [favList, change]);

  // console.log(list);

  console.log(favList);

  // if (!list) return null;

  return (
    <div>
      <PageSection title="Favourites">
        <EpisodePreview
          image=""
          percentage={30}
          title="123"
          onClick={console.log}
          subtitle="asd"
        />
      </PageSection>
    </div>
  );
};
