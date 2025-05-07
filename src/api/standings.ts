import type { ConstructorStanding, DriverStanding, RaceInfo } from "../types";

export const getCurrentDriverStandings = function (): Promise<
  DriverStanding[]
> {
  return fetch("https://api.jolpi.ca/ergast/f1/current/driverStandings.json")
    .then((res) => res.json())
    .then((data) => data as Promise<RaceInfo>)
    .then(
      (data) => data.MRData.StandingsTable!.StandingsLists[0].DriverStandings!,
    );
};

export const getCurrentContructorStandings = function (): Promise<
  ConstructorStanding[]
> {
  return fetch(
    "https://api.jolpi.ca/ergast/f1/current/constructorStandings.json",
  )
    .then((res) => res.json())
    .then((data) => data as Promise<RaceInfo>)
    .then(
      (data) =>
        data.MRData.StandingsTable!.StandingsLists[0].ConstructorStandings!,
    );
};
