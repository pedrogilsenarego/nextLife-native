import { FuelType } from "@/types/carsTypes";

type EmissionStandard = "NEDC" | "WLTP";

interface VehicleData {
  firstLicense?: Date;
  cc?: number;
  co2?: number;
  typeFuel?: FuelType;
  emissionStandard?: EmissionStandard;
}

interface TableAGasRow {
  limit: number;
  post1995: number;
  y1990to1995: number;
  y1981to1989: number;
}

interface TableADieselRow {
  limit: number;
  post1995: number;
  y1990to1995: number;
  y1981to1989: number;
}

interface TableBCylinderRow {
  limit: number;
  value: number;
}

interface TableBCO2Row {
  limit: number;
  value: number;
}

const tablesForA: Record<
  number | "default",
  { gas: TableAGasRow[]; diesel: TableADieselRow[] }
> = {
  default: {
    gas: [
      { limit: 1000, post1995: 19.9, y1990to1995: 12.55, y1981to1989: 8.8 },
      { limit: 1300, post1995: 39.95, y1990to1995: 22.45, y1981to1989: 12.55 },
      { limit: 1750, post1995: 62.4, y1990to1995: 34.87, y1981to1989: 17.49 },
      { limit: 2600, post1995: 158.31, y1990to1995: 83.49, y1981to1989: 36.09 },
      {
        limit: 3500,
        post1995: 287.49,
        y1990to1995: 156.54,
        y1981to1989: 79.72,
      },
      {
        limit: Infinity,
        post1995: 512.23,
        y1990to1995: 263.11,
        y1981to1989: 120.9,
      },
    ],
    diesel: [
      { limit: 1500, post1995: 3.14, y1990to1995: 1.98, y1981to1989: 1.39 },
      { limit: 2000, post1995: 6.31, y1990to1995: 3.55, y1981to1989: 1.98 },
      { limit: 3000, post1995: 9.86, y1990to1995: 5.51, y1981to1989: 2.76 },
      {
        limit: Infinity,
        post1995: 25.01,
        y1990to1995: 13.19,
        y1981to1989: 5.7,
      },
    ],
  },
  2025: {
    gas: [
      // Updated 2025 values for Gasoline (as provided)
      { limit: 1000, post1995: 19.9, y1990to1995: 12.2, y1981to1989: 8.8 },
      { limit: 1300, post1995: 39.95, y1990to1995: 22.45, y1981to1989: 12.55 },
      { limit: 1750, post1995: 62.4, y1990to1995: 34.87, y1981to1989: 17.49 },
      { limit: 2600, post1995: 158.31, y1990to1995: 83.49, y1981to1989: 36.09 },
      {
        limit: 3500,
        post1995: 287.49,
        y1990to1995: 156.54,
        y1981to1989: 79.72,
      },
      {
        limit: Infinity,
        post1995: 512.23,
        y1990to1995: 263.11,
        y1981to1989: 120.9,
      },
    ],
    diesel: [
      // Updated 2025 values for Diesel (as provided)
      { limit: 1500, post1995: 22.48, y1990to1995: 14.18, y1981to1989: 10.19 }, // (includes diesel surcharge now)
      { limit: 2000, post1995: 45.13, y1990to1995: 25.37, y1981to1989: 14.18 },
      { limit: 3000, post1995: 70.5, y1990to1995: 39.4, y1981to1989: 19.76 },
      {
        limit: Infinity,
        post1995: 178.86,
        y1990to1995: 94.33,
        y1981to1989: 40.77,
      },
    ],
  },
};

const tablesForB: Record<
  number | "default",
  {
    cylinder: TableBCylinderRow[];
    co2NEDC: TableBCO2Row[];
    co2WLTP: TableBCO2Row[];
    dieselSurcharge: TableBCylinderRow[];
  }
> = {
  default: {
    cylinder: [
      { limit: 1250, value: 31.77 },
      { limit: 1750, value: 63.74 },
      { limit: 2500, value: 127.35 },
      { limit: Infinity, value: 435.84 },
    ],
    co2NEDC: [
      { limit: 120, value: 65.15 },
      { limit: 180, value: 97.63 },
      { limit: 250, value: 212.04 },
      { limit: Infinity, value: 363.25 },
    ],
    co2WLTP: [
      { limit: 140, value: 65.15 },
      { limit: 205, value: 97.63 },
      { limit: 260, value: 212.04 },
      { limit: Infinity, value: 363.25 },
    ],
    dieselSurcharge: [
      { limit: 1250, value: 5.02 },
      { limit: 1750, value: 10.07 },
      { limit: 2500, value: 20.12 },
      { limit: Infinity, value: 68.85 },
    ],
  },
  2025: {
    cylinder: [
      { limit: 1250, value: 31.77 },
      { limit: 1750, value: 63.74 },
      { limit: 2500, value: 127.35 },
      { limit: Infinity, value: 435.84 },
    ],
    co2NEDC: [
      { limit: 120, value: 65.15 },
      { limit: 180, value: 97.63 },
      { limit: 250, value: 212.04 },
      { limit: Infinity, value: 363.25 },
    ],
    co2WLTP: [
      { limit: 140, value: 65.15 },
      { limit: 205, value: 97.63 },
      { limit: 260, value: 212.04 },
      { limit: Infinity, value: 363.25 },
    ],
    dieselSurcharge: [
      { limit: 1250, value: 5.02 },
      { limit: 1750, value: 10.07 },
      { limit: 2500, value: 20.12 },
      { limit: Infinity, value: 68.85 },
    ],
  },
};

function getYearAcquisitionCoefficient(year: number): number {
  if (year < 2008) return 1.0;
  if (year === 2008) return 1.05;
  if (year === 2009) return 1.1;
  if (year >= 2010) return 1.15;
  return 1.0;
}

export function calculateIUC(
  data: VehicleData,
  fiscalYear?: number
): number | null {
  if (
    !data ||
    !data.firstLicense ||
    data.cc == null ||
    !data.typeFuel ||
    fiscalYear == null ||
    !data.co2 ||
    !data.emissionStandard
  ) {
    return null;
  }

  const { firstLicense, cc, co2, typeFuel, emissionStandard } = data;

  if (typeFuel === "electric") {
    return 0;
  }

  const firstYear = firstLicense.getFullYear();
  const cutoffDate = new Date(2007, 6, 1);
  const isPost2007 = firstLicense >= cutoffDate;

  const tableA = tablesForA[fiscalYear] || tablesForA["default"];
  const tableB = tablesForB[fiscalYear] || tablesForB["default"];

  let yearCategoryA: "post1995" | "1990to1995" | "1981to1989" | null = null;
  if (!isPost2007) {
    if (firstYear > 1995) {
      yearCategoryA = "post1995";
    } else if (firstYear >= 1990 && firstYear <= 1995) {
      yearCategoryA = "1990to1995";
    } else if (firstYear >= 1981 && firstYear <= 1989) {
      yearCategoryA = "1981to1989";
    } else {
      return null;
    }
  }

  let iucBase = 0;

  if (!isPost2007) {
    const bracketA = tableA.gas.find((b) => cc <= b.limit);
    if (!bracketA) return null;

    let baseValueA = 0;
    switch (yearCategoryA) {
      case "post1995":
        baseValueA = bracketA.post1995;
        break;
      case "1990to1995":
        baseValueA = bracketA.y1990to1995;
        break;
      case "1981to1989":
        baseValueA = bracketA.y1981to1989;
        break;
    }

    if (typeFuel === "diesel") {
      const dieselBracket = tableA.diesel.find((b) => cc <= b.limit);
      if (!dieselBracket) return null;

      let dieselExtra = 0;
      switch (yearCategoryA) {
        case "post1995":
          dieselExtra = dieselBracket.post1995;
          break;
        case "1990to1995":
          dieselExtra = dieselBracket.y1990to1995;
          break;
        case "1981to1989":
          dieselExtra = dieselBracket.y1981to1989;
          break;
      }
      baseValueA += dieselExtra;
    }

    iucBase = baseValueA;
  } else {
    const cylinderBracketB = tableB.cylinder.find((b) => cc <= b.limit);
    if (!cylinderBracketB) return null;
    const cylinderValueB = cylinderBracketB.value;

    const co2Table =
      emissionStandard === "NEDC" ? tableB.co2NEDC : tableB.co2WLTP;
    const co2BracketFound = co2Table.find((b) => co2 <= b.limit);
    if (!co2BracketFound) return null;
    let co2ValueB = co2BracketFound.value;

    let baseValueB = cylinderValueB + co2ValueB;

    const licenseDate = firstLicense;
    const post2017 = licenseDate > new Date(2017, 0, 1);
    if (post2017) {
      let additionalCO2 = 0;
      if (emissionStandard === "NEDC") {
        if (co2 > 180 && co2 <= 250) additionalCO2 = 31.77;
        else if (co2 > 250) additionalCO2 = 63.74;
      } else {
        if (co2 > 205 && co2 <= 260) additionalCO2 = 31.77;
        else if (co2 > 260) additionalCO2 = 63.74;
      }
      baseValueB += additionalCO2;
    }

    if (typeFuel === "diesel") {
      const dieselB = tableB.dieselSurcharge.find((b) => cc <= b.limit);
      if (!dieselB) return null;
      baseValueB += dieselB.value;
    }

    iucBase = baseValueB;
  }

  const acquisitionYear = firstLicense.getFullYear();
  const acquisitionCoef = getYearAcquisitionCoefficient(acquisitionYear);
  iucBase *= acquisitionCoef;

  if (iucBase < 10) {
    return 0;
  }

  return parseFloat(iucBase.toFixed(1));
}
