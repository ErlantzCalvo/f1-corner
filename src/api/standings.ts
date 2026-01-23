import type { ConstructorStanding, DriverStanding, RaceInfo } from "../types";
import { fetchWithTimeout } from "./fetchWithTimeout";

export const getCurrentDriverStandings = function (): Promise<
  DriverStanding[]
> {
  return fetchWithTimeout(
    "https://api.jolpi.ca/ergast/f1/current/driverStandings.json",
    { timeout: 10000 },
  )
    .then((res) => res.json())
    .then((data) => data as Promise<RaceInfo>)
    .then(
      (data) => data.MRData.StandingsTable!.StandingsLists[0]?.DriverStandings! || [],
    );
};

export const getCurrentContructorStandings = function (): Promise<
  ConstructorStanding[]
> {
  return fetchWithTimeout(
    "https://api.jolpi.ca/ergast/f1/current/constructorStandings.json",
    { timeout: 10000 },
  )
    .then((res) => res.json())
    .then((data) => data as Promise<RaceInfo>)
    .then(
      (data) =>
        data.MRData.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ||
        [],
    );
};
