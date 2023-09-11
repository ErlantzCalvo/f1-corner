import type { MRData, RaceInfo, RaceTable } from "../types";

const toJson = (res: Response) => {
  if (res.status === 404) {
    return undefined;
  }

  return res.json();
};

export const getNextRaceData = (): Promise<RaceTable> => {
  return fetch("https://ergast.com/api/f1/current/next.json")
    .then((res) => res.json())
    .then((data) => data as Promise<RaceInfo>)
    .then((data) => data.MRData.RaceTable);
};
