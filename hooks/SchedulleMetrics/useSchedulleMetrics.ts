import { useEffect } from "react";
import { useCars } from "../Cars/cars.hooks";
import { calculateIUC } from "../Cars/cars.utils";
import { useRealEstate } from "../RealEstate/realEstate.hooks";
import { MonthGroup } from "./SchedulleMetrics.types";
import {
  calculateIMI,
  IMICalculationInput,
} from "../RealEstate/realEstate.utils";
import useBusinesses from "../useBusinesses";
import { getFiscalPeriod, IVA_PAYMENT_DATES } from "@/constants/taxes";
import useIncomes from "../useIncomes";
import { useApp } from "@/providers/AppProvider";
import { singleMonth } from "@/utils/dateRange";

export const useSchedulleMetrics = () => {
  const cars = useCars();
  const realEstate = useRealEstate();
  const { dateRange } = useApp();
  const { getIncomesIVA } = useIncomes();
  const { getHasBusinessType } = useBusinesses();

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
        isInRuins: realEstate.isInRuins,
      };
      const imi = calculateIMI(imiInput);
      return {
        imiValue: imi,
        ...realEstate,
      };
    });

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
            const adjustedEventDate = new Date(eventYear, eventMonth, 1);
            const endPaymentDate = new Date(eventYear, eventMonth + 1, 0);
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
              endDate: endPaymentDate,
              value,
            });
          }
        }
      );
    }

    const imis = getIMIs();
    if (imis) {
      imis.forEach(({ imiValue, address }) => {
        if (imiValue <= 0) return;

        let paymentMonths: number[] = [];

        if (imiValue <= 100) {
          paymentMonths = [4];
        } else if (imiValue > 100 && imiValue <= 500) {
          paymentMonths = [4, 10];
        } else if (imiValue > 500) {
          paymentMonths = [4, 7, 10];
        }
        paymentMonths.forEach((paymentMonth) => {
          let paymentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth();

          if (paymentMonth < currentMonth) {
            paymentYear += 1;
          }

          const paymentDate = new Date(paymentYear, paymentMonth, 1);
          const endPaymentDate = new Date(paymentYear, paymentMonth + 1, 0);

          // Find the index of the payment month in monthEvents
          const monthIndex = monthEvents.findIndex(
            (group) =>
              group.month === paymentMonth && group.year === paymentYear
          );

          if (monthIndex !== -1) {
            let installmentAmount = 0;

            if (imiValue <= 100) {
              installmentAmount = imiValue;
            } else if (imiValue > 100 && imiValue <= 500) {
              installmentAmount = imiValue / 2;
            } else if (imiValue > 500) {
              installmentAmount = imiValue / 3;
            }

            installmentAmount = Math.round(installmentAmount * 10) / 10;

            // Add the IMI payment event
            monthEvents[monthIndex].events.push({
              title: address,
              category: "IMI",
              date: paymentDate,
              endDate: endPaymentDate,
              value: installmentAmount,
            });
          }
        });
      });
    }

    if (getHasBusinessType()) {
      IVA_PAYMENT_DATES.forEach(
        (
          {
            paymentMonth,
            paymentStartDay,
            paymentEndDay,
            periodEndMonth,
            periodEndYearOffset,
            periodStartMonth,
            periodStartYearOffset,
          },
          index
        ) => {
          let paymentYear = currentDate.getFullYear();
          if (paymentMonth < currentDate.getMonth()) {
            paymentYear += 1;
          }

          const paymentStartDate = new Date(
            paymentYear,
            paymentMonth,
            paymentStartDay
          );
          const paymentEndDate = new Date(
            paymentYear,
            paymentMonth,
            paymentEndDay
          );
          const diffInMonths =
            (paymentYear - currentDate.getFullYear()) * 12 +
            (paymentMonth - currentDate.getMonth());

          if (diffInMonths >= 0 && diffInMonths < monthsToShow) {
            // Encontrar o índice do mês no monthEvents
            const monthIndex = monthEvents.findIndex(
              (group) =>
                group.month === paymentMonth && group.year === paymentYear
            );

            let value = undefined;
            //needs better condition for know if can calculate the IVA
            if (index === 0 && !singleMonth(dateRange)) {
              const fiscalPeriod = getFiscalPeriod(
                {
                  paymentMonth,
                  paymentStartDay,
                  paymentEndDay,
                  periodStartMonth,
                  periodStartYearOffset,
                  periodEndMonth,
                  periodEndYearOffset,
                },
                paymentEndDate.getFullYear()
              );

              value = getIncomesIVA({
                dateStart: fiscalPeriod.startDate,
                dateEnd: fiscalPeriod.endDate,
              });
            }

            if (monthIndex !== -1) {
              monthEvents[monthIndex].events.push({
                title: "Pagamento IVA",
                category: "IVA",
                date: paymentStartDate,
                endDate: paymentEndDate,
                value,
              });
            }
          }
        }
      );
    }

    return monthEvents;
  };

  return { getMonthEvents };
};
