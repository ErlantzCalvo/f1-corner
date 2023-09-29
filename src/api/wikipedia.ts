export interface wikiImage {
  batchcomplete: string;
  query: Query;
}

export interface Query {
  pages: Pages;
}

export interface Pages {
  [code: string]: pagenumber;
}

export interface pagenumber {
  original?: Original;
}

export interface Original {
  source: string;
  width: number;
  height: number;
}

export const getArticleImage = (
  articleName: string,
): Promise<string | null> => {
  return fetch(
    `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${articleName}`,
  )
    .then((res) => res.json())
    .then((data) => data as Promise<wikiImage>)
    .then((data) => {
      const pageKeys = Object.keys(data.query.pages);
      if (
        pageKeys.length > 0 &&
        pageKeys[0] !== "-1" &&
        data.query.pages[pageKeys[0]].original
      ) {
        return data.query.pages[pageKeys[0]].original!.source;
      } else {
        return null;
      }
    });
};
