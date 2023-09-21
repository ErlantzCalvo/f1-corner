import type { Race, RaceInfo, } from "../types";

export const getLastRaceResults = function(): Promise<Race> {
    return fetch("http://ergast.com/api/f1/current/last/results.json")
    .then((res) => res.json())
    .then((data) => data as Promise<RaceInfo>)
    .then((data) => data.MRData.RaceTable.Races[0]);
}