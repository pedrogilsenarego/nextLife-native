// Import necessary types and data
import municipalityIMIRates from "./municipalityIMIRates.json"; // Ensure you have this JSON file

// Enums for Property and Ownership Types
export enum PropertyType {
  Urban = "urban",
  Rustic = "rustic",
}

export enum OwnershipType {
  Individual = "individual",
  Corporate = "corporate",
}

// Interface for Municipality IMI Rates
interface MunicipalityIMIRate {
  municipality: string;
  urbanRate: number; // e.g., 0.3 for 0.3%
  rusticRate: number; // e.g., 0.8 for 0.8%
  taxHavenRate?: number; // e.g., 7.5 for 7.5%, optional
}

// Interface for IMI Calculation Input
export interface IMICalculationInput {
  vpt: number; // Valor Patrimonial Tributário
  propertyType: PropertyType;
  ownershipType: OwnershipType;
  municipality: string;
  isInTaxHaven?: boolean; // Optional, defaults to false
  hasDependents?: boolean;
  isUsedForEnergyProduction?: boolean;
  hasEnergyEfficiency?: boolean;
  isEligibleForReductions?: boolean;
  isDevolved?: boolean;
  isInRuins?: boolean;
  isPartiallyDevolved?: boolean;
  isEligibleForExemptions?: boolean;
}

// Interface for AIMI Calculation Input
interface AIMICalculationInput {
  totalVPT: number; // Total Valor Patrimonial Tributário
  ownershipType: OwnershipType;
  isInTaxHaven?: boolean; // Optional, defaults to false
  isMarriedOrInUnion: boolean;
}

// Helper Functions

/**
 * Retrieves the IMI rate based on the input parameters.
 * @param input - The IMI calculation input.
 * @returns The applicable IMI rate.
 */
function getIMIRate(input: IMICalculationInput): number {
  const {
    municipality,
    propertyType,
    ownershipType,
    isInTaxHaven = false, // Defaults to false if undefined
  } = input;

  const rateData = municipalityIMIRates.find(
    (rate: MunicipalityIMIRate) =>
      rate.municipality.toLowerCase() === municipality.toLowerCase()
  );

  if (!rateData) {
    throw new Error(`IMI rates for municipality "${municipality}" not found.`);
  }

  // Check for Tax Haven rate
  if (
    isInTaxHaven &&
    ownershipType === OwnershipType.Corporate &&
    rateData.taxHavenRate !== undefined
  ) {
    return rateData.taxHavenRate;
  }

  // Return base rate based on property type
  return propertyType === PropertyType.Urban
    ? rateData.urbanRate
    : rateData.rusticRate;
}

/**
 * Determines if the property is exempt from IMI.
 * @param input - The IMI calculation input.
 * @returns True if exempt, otherwise false.
 */
function isIMIExempt(input: IMICalculationInput): boolean {
  // Implement all specific exemption rules here based on the tax regulations
  // Example placeholder logic:

  // Exemption for rustic properties that correspond to forested areas
  if (
    input.propertyType === PropertyType.Rustic &&
    input.isEligibleForExemptions
    // Add additional specific conditions here
  ) {
    return true;
  }

  // Exemption for urban properties used for own and permanent habitation with VPT up to €125,000
  if (
    input.propertyType === PropertyType.Urban &&
    input.vpt <= 125000 &&
    input.ownershipType === OwnershipType.Individual &&
    input.isEligibleForExemptions
    // Add additional specific conditions here (e.g., total household income)
  ) {
    return true;
  }

  // Add other specific exemption conditions as per the tax rules
  return false;
}

/**
 * Calculates the total reduction percentage for IMI based on input conditions.
 * @param input - The IMI calculation input.
 * @returns The total reduction percentage.
 */
function calculateIMIReduction(input: IMICalculationInput): number {
  let reduction = 0;

  // Reduction for urban properties with dependents
  if (input.propertyType === PropertyType.Urban && input.hasDependents) {
    reduction += 0.05; // 5% reduction
  }

  // Reduction for properties used for energy production
  if (input.isUsedForEnergyProduction) {
    reduction += 0.05; // 5% reduction
  }

  // Reduction for properties with energy efficiency improvements
  if (input.hasEnergyEfficiency) {
    reduction += 0.05; // 5% reduction
  }

  // Additional reductions based on eligibility
  if (input.isEligibleForReductions) {
    reduction += 0.05; // 5% reduction
  }

  return reduction;
}

/**
 * Calculates the IMI based on the provided input.
 * @param input - The IMI calculation input.
 * @returns The calculated IMI value.
 */
export function calculateIMI(input: IMICalculationInput): number {
  if (isIMIExempt(input)) {
    return 0;
  }

  let rate = getIMIRate(input);

  // Apply reductions
  const reduction = calculateIMIReduction(input);
  rate -= reduction;

  // Ensure rate is not negative
  rate = Math.max(rate, 0);

  // Calculate base IMI
  let imi = (input.vpt * rate) / 100;

  // Apply aggravated rates based on specific conditions
  if (input.isDevolved) {
    imi += imi * 0.1; // 10% increase for devoluted properties
  }

  if (input.isInRuins) {
    imi += imi * 0.15; // 15% increase for properties in ruins
  }

  if (input.isPartiallyDevolved) {
    imi += imi * 0.05; // 5% increase for partially devoluted properties
  }

  return imi;
}

/**
 * Determines the AIMI rate based on input parameters.
 * @param input - The AIMI calculation input.
 * @returns The applicable AIMI rate.
 */
function getAIMIRate(input: AIMICalculationInput): number {
  const { ownershipType, isInTaxHaven = false } = input;

  if (isInTaxHaven) {
    return 7.5;
  }

  return ownershipType === OwnershipType.Individual ? 0.7 : 0.4;
}

/**
 * Calculates the AIMI based on the provided input.
 * @param input - The AIMI calculation input.
 * @returns The calculated AIMI value.
 */
function calculateAIMI(input: AIMICalculationInput): number {
  let taxableVPT = input.totalVPT;

  // Apply deductions
  if (input.ownershipType === OwnershipType.Individual) {
    taxableVPT -= 600000;
  } else if (
    input.ownershipType === OwnershipType.Corporate &&
    input.isMarriedOrInUnion
  ) {
    taxableVPT -= 1200000;
  }

  // Ensure taxable VPT doesn't go below 0
  taxableVPT = Math.max(taxableVPT, 0);

  const rate = getAIMIRate(input);
  const aimi = (taxableVPT * rate) / 100;

  return aimi;
}
