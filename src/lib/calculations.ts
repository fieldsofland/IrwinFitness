import {
    ProposalFormState,
    PriceBreakdown,
    ProgramType,
    Tier,
} from './types';
import {
    FAT_LOSS_TIERS,
    MUSCLE_BUILDING_TIERS,
    ADD_ONS,
    FRIENDS_FAMILY_DISCOUNT,
    COMMITMENT_DISCOUNTS,
    SESSION_PRICE,
    SESSION_OPTIONS,
    MINIMUM_BILLING_MONTHS,
} from './constants';

export function getTiersForProgram(programType: ProgramType): Tier[] {
    switch (programType) {
        case 'fat-loss':
            return FAT_LOSS_TIERS;
        case 'muscle-building':
            return MUSCLE_BUILDING_TIERS;
        default:
            return FAT_LOSS_TIERS;
    }
}

export function getTierById(programType: ProgramType, tierId: string): Tier | undefined {
    const tiers = getTiersForProgram(programType);
    return tiers.find((tier) => tier.id === tierId);
}

export function getSessionsPerWeek(sessionsPerMonth: number): number {
    // Approximate sessions per week (month = ~4 weeks)
    return sessionsPerMonth / 4;
}

export function getSessionLabel(sessionsPerMonth: number): string {
    const option = SESSION_OPTIONS.find(opt => opt.value === sessionsPerMonth);
    if (option && option.perWeek) {
        return `${sessionsPerMonth} sessions/mo ${option.perWeek}`;
    }
    return `${sessionsPerMonth} sessions/month`;
}

export function calculatePriceBreakdown(formState: ProposalFormState): PriceBreakdown {
    const tier = getTierById(formState.programType, formState.selectedTierId);

    if (!tier) {
        return {
            baseTierPrice: 0,
            tierName: '',
            tierDescription: '',
            inPersonSessions: 0,
            inPersonSessionsPrice: 0,
            sessionsPerWeek: 0,
            friendsAndFamilyDiscount: 0,
            commitmentDiscount: 0,
            discountedTierPrice: 0,
            addOns: [],
            monthlyAddOnsTotal: 0,
            oneTimeAddOnsTotal: 0,
            monthlyTotal: 0,
            commitmentMonths: formState.commitmentLength,
            fullCommitmentTotal: 0,
            dueOnSigning: 0,
        };
    }

    // Base tier price
    const baseTierPrice = tier.price;

    // In-person sessions price (separate line item, NOT discounted)
    const inPersonSessions = formState.inPersonSessions || 0;
    const inPersonSessionsPrice = inPersonSessions * SESSION_PRICE;
    const sessionsPerWeek = getSessionsPerWeek(inPersonSessions);

    // Friends & Family discount (applied to tier price ONLY, not sessions)
    const friendsAndFamilyDiscount = formState.friendsAndFamily
        ? baseTierPrice * FRIENDS_FAMILY_DISCOUNT
        : 0;

    const afterFamilyDiscount = baseTierPrice - friendsAndFamilyDiscount;

    // Commitment discount (applied to tier price ONLY)
    const commitmentDiscount = COMMITMENT_DISCOUNTS[formState.commitmentLength];
    const discountedTierPrice = Math.max(0, afterFamilyDiscount - commitmentDiscount);

    // Add-ons
    const selectedAddOns = ADD_ONS.filter((addon) =>
        formState.selectedAddOns.includes(addon.id)
    );

    const addOns = selectedAddOns.map((addon) => ({
        name: addon.name,
        price: addon.price,
        isOneTime: addon.isOneTime,
    }));

    const monthlyAddOnsTotal = addOns
        .filter((addon) => !addon.isOneTime)
        .reduce((sum, addon) => sum + addon.price, 0);

    const oneTimeAddOnsTotal = addOns
        .filter((addon) => addon.isOneTime)
        .reduce((sum, addon) => sum + addon.price, 0);

    // Monthly total (tier + sessions + monthly add-ons)
    const monthlyTotal = discountedTierPrice + inPersonSessionsPrice + monthlyAddOnsTotal;

    // Full commitment total
    const fullCommitmentTotal =
        monthlyTotal * formState.commitmentLength + oneTimeAddOnsTotal;

    // Due on signing (always 3 months minimum)
    const dueOnSigning = monthlyTotal * MINIMUM_BILLING_MONTHS + oneTimeAddOnsTotal;

    return {
        baseTierPrice,
        tierName: tier.name,
        tierDescription: tier.description,
        inPersonSessions,
        inPersonSessionsPrice,
        sessionsPerWeek,
        friendsAndFamilyDiscount,
        commitmentDiscount,
        discountedTierPrice,
        addOns,
        monthlyAddOnsTotal,
        oneTimeAddOnsTotal,
        monthlyTotal,
        commitmentMonths: formState.commitmentLength,
        fullCommitmentTotal,
        dueOnSigning,
    };
}

export function generateProposalNumber(): string {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `IRW-${randomNum}`;
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}
