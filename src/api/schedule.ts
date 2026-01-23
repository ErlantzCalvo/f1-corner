import type { MRData, RaceInfo, RaceTable } from "../types";
import { fetchWithTimeout } from "./fetchWithTimeout";

export const getNextRaceData = async (): Promise<RaceTable> => {
  const response = await fetchWithTimeout(
    "https://api.jolpi.ca/ergast/f1/current/next.json",
    { timeout: 10000 },
  );
  return response
    .json()
    .then((data) => data as Promise<RaceInfo>)
    .then((data) => data.MRData.RaceTable!);
};

export const getRoundData = async (round: number): Promise<RaceTable> => {
  const response = await fetchWithTimeout(
    `https://api.jolpi.ca/ergast/f1/current/${round}.json`,
    { timeout: 10000 },
  );
  return response
    .json()
    .then((data) => data as Promise<RaceInfo>)
    .then((data) => data.MRData.RaceTable!);
};
