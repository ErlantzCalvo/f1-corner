import type { RaceInfo, RaceTable } from "../types";
import { fetchTimeout } from "./utils";

export const getAllSeasonRaces = async function (): Promise<
  RaceTable | undefined
> {
  await fetchTimeout();
  return fetch(`https://api.jolpi.ca/ergast/f1/current.json`)
    .then((res) => res.json())
    .then((data) => data as Promise<RaceInfo>)
    .then((data) => data.MRData.RaceTable);
};
