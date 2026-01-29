// Program Types - simplified to just coaching tracks
export type ProgramType = 'fat-loss' | 'muscle-building';

// Tier definitions
export interface Tier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

// Add-on definition
export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  isOneTime: boolean;
}

// Commitment length
export type CommitmentLength = 3 | 6 | 12;

// In-person session count options (multiples of 2)
export type SessionCount = 0 | 2 | 4 | 6 | 8 | 10 | 12;

// Form state
export interface ProposalFormState {
  // Client info
  clientName: string;
  clientEmail: string;
  proposalDate: Date;
  proposalNumber: string;

  // Program selection
  programType: ProgramType;
  selectedTierId: string;

  // In-person sessions (optional add-on)
  inPersonSessions: SessionCount;

  // Commitment
  commitmentLength: CommitmentLength;

  // Discounts
  friendsAndFamily: boolean;

  // Add-ons
  selectedAddOns: string[];
}

// Price calculation result
export interface PriceBreakdown {
  // Base tier
  baseTierPrice: number;
  tierName: string;
  tierDescription: string;

  // In-person sessions
  inPersonSessions: number;
  inPersonSessionsPrice: number; // monthly cost for sessions
  sessionsPerWeek: number; // for display

  // Discounts (applied to tier only)
  friendsAndFamilyDiscount: number;
  commitmentDiscount: number;
  discountedTierPrice: number;

  // Add-ons
  addOns: { name: string; price: number; isOneTime: boolean }[];
  monthlyAddOnsTotal: number;
  oneTimeAddOnsTotal: number;

  // Totals
  monthlyTotal: number;
  commitmentMonths: number;
  fullCommitmentTotal: number;
  dueOnSigning: number; // Always 3 months minimum
}
