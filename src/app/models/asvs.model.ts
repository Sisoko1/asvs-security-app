/**
 * OWASP ASVS Data Models
 * Defines interfaces for ASVS verification requirements and results
 */

/**
 * Represents a single ASVS verification requirement
 */
export interface VerificationRequirement {
  '#': string;                         // Requirement ID (e.g., "1.1.1")
  'Area': string;                      // Sub-area name (e.g., "Authentication Architecture")
  'ASVS Level': string;                // Minimum applicable level ("1", "2", or "3")
  'Verification Requirement': string;  // Full verification requirement text
  'CWE'?: string;                      // Optional CWE reference
}

/**
 * Represents aggregated ASVS results for a category
 */
export interface AsvsResult {
  'Category': string; // Category name (e.g., "Architecture")
  'Total': number; // Total requirements in category
  'Valid': number; // Number of requirements addressed
  'Validity Percentage': string; // Percentage (0-100)
}

/**
 * Main ASVS data structure
 */
export interface AsvsData {
  'Architecture': VerificationRequirement[];
  'Authentication': VerificationRequirement[];
  'Session Management': VerificationRequirement[];
  'Access Control': VerificationRequirement[];
  'Input Validation': VerificationRequirement[];
  'Cryptography at Rest': VerificationRequirement[];
  'Error Handling and Logging': VerificationRequirement[];
  'Data Protection': VerificationRequirement[];
  'Communication Security': VerificationRequirement[];
  'Malicious Code': VerificationRequirement[];
  'Business Logic': VerificationRequirement[];
  'Files and Resources': VerificationRequirement[];
  'API and Web Service': VerificationRequirement[];
  'Configuration': VerificationRequirement[];
  'ASVS Results': AsvsResult[];
}

/**
 * Type for ASVS category keys
 */
export type AsvsCategory = Exclude<keyof AsvsData, 'ASVS Results'>;

/**
 * Verification levels in ASVS
 */
export enum VerificationLevel {
  LEVEL_1 = 'L1',
  LEVEL_2 = 'L2',
  LEVEL_3 = 'L3'
}

/**
 * Filter options for browsing requirements
 */
export interface FilterOptions {
  category?: AsvsCategory;
  level?: VerificationLevel;
  searchTerm?: string;
}

/**
 * Enhanced requirement with computed properties
 */
export interface EnhancedRequirement extends VerificationRequirement {
  category: AsvsCategory;
  levels: VerificationLevel[];
  isCritical?: boolean;
}

export type RequirementStatus = 'pass' | 'fail' | 'not-applicable' | null;

export interface RequirementAssessment {
  requirementId: string;
  status: RequirementStatus;
  note?: string;
}

export type AssessmentMap = Record<string, RequirementAssessment>;
