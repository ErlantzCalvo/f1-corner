import type { RaceInfo, RaceTable } from "../types";

export const getAllSeasonRaces = function (): Promise<RaceTable | undefined> {
  return fetch(`https://api.jolpi.ca/ergast/f1/current.json`)
    .then((res) => res.json())
    .then((data) => data as Promise<RaceInfo>)
    .then((data) => data.MRData.RaceTable);
};
