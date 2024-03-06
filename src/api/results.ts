import type { Race, RaceInfo } from "../types";

export const getRaceResults = function (race: string): Promise<Race> {
  return fetch(`https://ergast.com/api/f1/current/${race}/results.json`)
    .then((res) => res.json())
    .then((data) => data as Promise<RaceInfo>)
    .then((data) => data.MRData.RaceTable!.Races[0]);
};
