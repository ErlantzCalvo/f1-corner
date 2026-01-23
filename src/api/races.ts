import type { RaceInfo, RaceTable } from "../types";
import { fetchWithTimeout } from "./fetchWithTimeout";

export const getAllSeasonRaces = async function (): Promise<
  RaceTable | undefined
> {
  const response = await fetchWithTimeout(
    "https://api.jolpi.ca/ergast/f1/current.json",
    { timeout: 10000 },
  );
  return response
    .json()
    .then((data) => data as Promise<RaceInfo>)
    .then((data) => data.MRData.RaceTable);
};
