import type { Race, RaceInfo } from "../types";
import { fetchWithTimeout } from "./fetchWithTimeout";

export const getRaceResults = async function (race: string): Promise<Race> {
  const response = await fetchWithTimeout(
    `https://api.jolpi.ca/ergast/f1/current/${race}/results.json`,
    { timeout: 10000 },
  );
  return response
    .json()
    .then((data) => data as Promise<RaceInfo>)
    .then((data) => data.MRData.RaceTable!.Races[0]);
};
