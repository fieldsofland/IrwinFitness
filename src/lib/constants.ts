import { Tier, AddOn, CommitmentLength, SessionCount } from './types';

// Fat Loss Track Tiers - Features are cumulative (higher tiers include all lower tier features)
export const FAT_LOSS_TIERS: Tier[] = [
    {
        id: 'fat-loss-kickstart',
        name: 'Kickstart',
        price: 250,
        description: 'Custom fat loss program, app access, bi-monthly check-in',
        features: [
            'Custom fat loss program',
            'Everfit app access',
            'Bi-monthly check-in call',
        ],
    },
    {
        id: 'fat-loss-accelerate',
        name: 'Accelerate',
        price: 350,
        description: 'Weekly check-in calls, nutrition guidelines, cardio protocols',
        features: [
            'Custom fat loss program',
            'Everfit app access',
            'Weekly check-in call (1x/week)',
            'Nutrition guidelines',
            'Cardio protocols',
        ],
    },
    {
        id: 'fat-loss-transformation',
        name: 'Total Transformation',
        price: 500,
        description: 'Premium coaching with 2x weekly calls, meal plans, unlimited support',
        features: [
            'Custom fat loss program',
            'Everfit app access',
            'Check-in calls (2x/week)',
            'Nutrition guidelines',
            'Cardio protocols',
            'Custom meal plans',
            'Unlimited messaging',
            'Bi-weekly form reviews',
        ],
    },
];

// Muscle Building Track Tiers - Features are cumulative (higher tiers include all lower tier features)
export const MUSCLE_BUILDING_TIERS: Tier[] = [
    {
        id: 'muscle-foundation',
        name: 'Foundation',
        price: 250,
        description: 'Custom hypertrophy program, app access, bi-monthly check-in',
        features: [
            'Custom hypertrophy program',
            'Everfit app access',
            'Bi-monthly check-in call',
        ],
    },
    {
        id: 'muscle-growth',
        name: 'Growth',
        price: 350,
        description: 'Weekly check-in calls, bulking nutrition guidelines, progressive overload tracking',
        features: [
            'Custom hypertrophy program',
            'Everfit app access',
            'Weekly check-in call (1x/week)',
            'Bulking nutrition guidelines',
            'Progressive overload tracking',
        ],
    },
    {
        id: 'muscle-maximum',
        name: 'Maximum Gains',
        price: 500,
        description: 'Premium coaching with 2x weekly calls, meal plans, unlimited support',
        features: [
            'Custom hypertrophy program',
            'Everfit app access',
            'Check-in calls (2x/week)',
            'Bulking nutrition guidelines',
            'Progressive overload tracking',
            'Custom meal plans',
            'Unlimited messaging',
            'Bi-weekly form reviews',
        ],
    },
];

// In-person session pricing
export const SESSION_PRICE = 60;
export const SESSION_OPTIONS: { value: SessionCount; label: string; perWeek: string }[] = [
    { value: 0, label: 'No in-person sessions', perWeek: '' },
    { value: 2, label: '2 sessions/month', perWeek: '(~1 per week)' },
    { value: 4, label: '4 sessions/month', perWeek: '(1 per week)' },
    { value: 6, label: '6 sessions/month', perWeek: '(~1.5 per week)' },
    { value: 8, label: '8 sessions/month', perWeek: '(2 per week)' },
    { value: 10, label: '10 sessions/month', perWeek: '(~2.5 per week)' },
    { value: 12, label: '12 sessions/month', perWeek: '(3 per week)' },
];

// Add-ons
export const ADD_ONS: AddOn[] = [
    {
        id: 'single-session',
        name: 'Single Training Session',
        price: 75,
        description: 'One additional in-person training session',
        isOneTime: true,
    },
    {
        id: 'nutrition-deep-dive',
        name: 'Nutrition Deep Dive',
        price: 150,
        description: '1-hour nutrition consultation',
        isOneTime: true,
    },
    {
        id: 'meal-prep-guide',
        name: 'Custom Meal Prep Guide',
        price: 100,
        description: 'AI-generated custom meal prep guide',
        isOneTime: true,
    },
];

// Commitment Discounts (applied to tier price only)
export const COMMITMENT_DISCOUNTS: Record<CommitmentLength, number> = {
    3: 0,
    6: 25,
    12: 50,
};

// Friends & Family discount percentage (applied to tier price only)
export const FRIENDS_FAMILY_DISCOUNT = 0.30; // 30%

// Minimum billing months (always bill at least 3 months upfront)
export const MINIMUM_BILLING_MONTHS = 3;

// Commitment length options
export const COMMITMENT_OPTIONS: { value: CommitmentLength; label: string }[] = [
    { value: 3, label: '3 months' },
    { value: 6, label: '6 months' },
    { value: 12, label: '12 months' },
];

// Program type labels
export const PROGRAM_LABELS = {
    'fat-loss': 'Fat Loss Track',
    'muscle-building': 'Muscle Building Track',
};
