import type { MRData, RaceInfo, RaceTable } from "../types";

export const getNextRaceData = (): Promise<RaceTable> => {
  return fetch("https://ergast.com/api/f1/current/next.json")
    .then((res) => res.json())
    .then((data) => data as Promise<RaceInfo>)
    .then((data) => data.MRData.RaceTable!);
};

export const getRoundData = (round: number): Promise<RaceTable> => {
  return fetch(`https://ergast.com/api/f1/current/${round}.json`)
    .then((res) => res.json())
    .then((data) => data as Promise<RaceInfo>)
    .then((data) => data.MRData.RaceTable!);
};
