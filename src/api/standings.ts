import type { DriverStanding, RaceInfo } from "../types";

export const getCurrentDriverStandings = function (): Promise<DriverStanding[]> {
    return fetch("https://ergast.com/api/f1/current/driverStandings.json")
      .then((res) => res.json())
      .then((data) => data as Promise<RaceInfo>)
      .then((data) => data.MRData.StandingsTable!.StandingsLists[0].DriverStandings);
  };