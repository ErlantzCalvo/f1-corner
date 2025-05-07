import type { MRData, RaceInfo, RaceTable } from "../types";
import { fetchTimeout } from "./utils";

export const getNextRaceData = async (): Promise<RaceTable> => {
  await fetchTimeout();
  return fetch("https://api.jolpi.ca/ergast/f1/current/next.json")
    .then((res) => res.json())
    .then((data) => data as Promise<RaceInfo>)
    .then((data) => data.MRData.RaceTable!);
};

export const getRoundData = async (round: number): Promise<RaceTable> => {
  await fetchTimeout();
  return fetch(`https://api.jolpi.ca/ergast/f1/current/${round}.json`)
    .then((res) => res.json())
    .then((data) => data as Promise<RaceInfo>)
    .then((data) => data.MRData.RaceTable!);
};
