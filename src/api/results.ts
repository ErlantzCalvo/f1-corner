import type { Race, RaceInfo } from "../types";
import { fetchTimeout } from "./utils";

export const getRaceResults = async function (race: string): Promise<Race> {
  await fetchTimeout();
  return fetch(`https://api.jolpi.ca/ergast/f1/current/${race}/results.json`)
    .then((res) => res.json())
    .then((data) => data as Promise<RaceInfo>)
    .then((data) => data.MRData.RaceTable!.Races[0]);
};
