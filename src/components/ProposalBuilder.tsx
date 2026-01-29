'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProposalForm } from './ProposalForm';
import { ProposalPreview } from './ProposalPreview';
import { ProposalFormState, ProgramType, CommitmentLength } from '@/lib/types';
import { FAT_LOSS_TIERS } from '@/lib/constants';
import { calculatePriceBreakdown } from '@/lib/calculations';
import { getNextInvoiceNumber } from '@/lib/actions';
import { Button } from '@/components/ui/button';

const getInitialFormState = (): ProposalFormState => ({
    clientName: '',
    clientEmail: '',
    proposalDate: new Date(),
    proposalNumber: '0000', // Will be updated from database
    programType: 'fat-loss' as ProgramType,
    selectedTierId: FAT_LOSS_TIERS[0].id,
    inPersonSessions: 0,
    commitmentLength: 3 as CommitmentLength,
    friendsAndFamily: false,
    paymentOption: '3-month',
    selectedAddOns: [],
});

export function ProposalBuilder() {
    const [formState, setFormState] = useState<ProposalFormState>(getInitialFormState);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Fetch the next invoice number from the database
        getNextInvoiceNumber().then((invoiceNumber) => {
            setFormState((prev) => ({ ...prev, proposalNumber: invoiceNumber }));
        });
    }, []);

    const priceBreakdown = calculatePriceBreakdown(formState);

    const updateFormState = (updates: Partial<ProposalFormState>) => {
        setFormState((prev) => ({ ...prev, ...updates }));
    };

    if (!mounted) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="animate-pulse text-neutral-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">IF</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-neutral-900">Irwin Fitness</h1>
                                <p className="text-sm text-neutral-500">Invoice Generator</p>
                            </div>
                        </div>
                        <Link href="/proposals">
                            <Button variant="outline">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Saved Invoices
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Panel - Form */}
                    <div className="space-y-6">
                        <ProposalForm
                            formState={formState}
                            onUpdate={updateFormState}
                        />
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <ProposalPreview
                            formState={formState}
                            priceBreakdown={priceBreakdown}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
