import { useEffect } from "react";
import { useCars } from "../Cars/cars.hooks";
import { calculateIUC } from "../Cars/cars.utils";
import { useRealEstate } from "../RealEstate/realEstate.hooks";
import { MonthGroup } from "./SchedulleMetrics.types";
import {
  calculateIMI,
  IMICalculationInput,
  OwnershipType,
  PropertyType,
} from "../RealEstate/realEstate.utils";

export const useSchedulleMetrics = () => {
  const cars = useCars();
  const realEstate = useRealEstate();

  const getIUCs = () =>
    cars.data?.map((car) => ({
      iucPayment: new Date(car.licenseDate),
      ...car,
    }));

  const getIMIs = () =>
    realEstate.data?.map((realEstate) => {
      const imiInput: IMICalculationInput = {
        vpt: realEstate.vpt,
        propertyType: realEstate.propertyType,
        ownershipType: realEstate.ownershipType,
        municipality: realEstate.municipality,
      };
      console.log(calculateIMI(imiInput));
    });

  useEffect(() => {
    getIMIs();
  }, []);

  const getMonthEvents = () => {
    const monthsToShow = 12;
    const currentDate = new Date();

    const monthEvents: MonthGroup[] = [];

    for (let i = 0; i < monthsToShow; i++) {
      const futureDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + i,
        1
      );

      const monthName = futureDate.toLocaleString("default", { month: "long" });
      const monthGroup: MonthGroup = {
        monthLabel: monthName,
        events: [],
        year: futureDate.getFullYear(),
        month: futureDate.getMonth(),
      };
      monthEvents.push(monthGroup);
    }

    const iucs = getIUCs();
    if (iucs) {
      iucs.forEach(
        ({ iucPayment, brand, model, licenseDate, cc, typeFuel, co2 }) => {
          const eventMonth = iucPayment.getMonth();
          const currentMonth = currentDate.getMonth();
          const currentYear = currentDate.getFullYear();
          const eventDay = iucPayment.getDate();

          let monthDiff = eventMonth - currentMonth;
          let eventYear = currentYear;

          if (monthDiff < 0) {
            monthDiff += 12;
            eventYear += 1;
          }

          if (monthDiff >= 0 && monthDiff < monthsToShow) {
            const adjustedEventDate = new Date(eventYear, eventMonth, eventDay);
            const value = calculateIUC(
              {
                firstLicense: new Date(licenseDate),
                cc,
                typeFuel,
                co2,
                emissionStandard: "WLTP",
              },
              eventYear
            );

            monthEvents[monthDiff].events.push({
              title: `${brand} - ${model}`,
              category: "IUC",
              date: adjustedEventDate,
              value,
            });
          }
        }
      );
    }
    return monthEvents;
  };

  return { getMonthEvents };
};
