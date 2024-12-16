export const IVA_RATE = 0.23;

export interface IVAPaymentDate {
  paymentMonth: number; // Mês do pagamento (0-based: 0 = Janeiro)
  paymentStartDay: number; // Dia da entrega
  paymentEndDay: number; // Dia limite pagamento
  periodStartMonth: number; // Mês de início do período fiscal (0-based)
  periodStartYearOffset: number; // Offset do ano para o início do período fiscal (0 = mesmo ano do pagamento, -1 = ano anterior)
  periodEndMonth: number; // Mês de fim do período fiscal (0-based)
  periodEndYearOffset: number; // Offset do ano para o fim do período fiscal
}

export const IVA_PAYMENT_DATES: IVAPaymentDate[] = [
  {
    paymentMonth: 1, // Fevereiro (0-based: 1 = Fevereiro)
    paymentStartDay: 20,
    paymentEndDay: 26,
    periodStartMonth: 9, // Outubro
    periodStartYearOffset: -1, // Ano anterior
    periodEndMonth: 11, // Dezembro
    periodEndYearOffset: -1, // Ano anterior
  },
  {
    paymentMonth: 4, // Maio
    paymentStartDay: 20,
    paymentEndDay: 27,
    periodStartMonth: 0, // Janeiro
    periodStartYearOffset: 0, // Mesmo ano
    periodEndMonth: 2, // Março
    periodEndYearOffset: 0, // Mesmo ano
  },
  {
    paymentMonth: 8, // Setembro
    paymentStartDay: 20,
    paymentEndDay: 25,
    periodStartMonth: 3, // Abril
    periodStartYearOffset: 0, // Mesmo ano
    periodEndMonth: 5, // Junho
    periodEndYearOffset: 0, // Mesmo ano
  },
  {
    paymentMonth: 10, // Novembro
    paymentStartDay: 20,
    paymentEndDay: 25,
    periodStartMonth: 6, // Julho
    periodStartYearOffset: 0, // Mesmo ano
    periodEndMonth: 8, // Setembro
    periodEndYearOffset: 0, // Mesmo ano
  },
];

interface FiscalPeriod {
  startDate: Date;
  endDate: Date;
}

export const getFiscalPeriod = (
  paymentDate: IVAPaymentDate,
  currentYear: number
): FiscalPeriod => {
  const startYear = currentYear + paymentDate.periodStartYearOffset;
  const endYear = currentYear + paymentDate.periodEndYearOffset;

  const startDate = new Date(startYear, paymentDate.periodStartMonth, 1);
  const endDate = new Date(endYear, paymentDate.periodEndMonth + 1, 0); // Último dia do mês

  return { startDate, endDate };
};
