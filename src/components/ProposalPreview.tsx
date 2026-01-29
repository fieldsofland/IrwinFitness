'use client';

import { useState } from 'react';
import { ProposalFormState, PriceBreakdown } from '@/lib/types';
import { PROGRAM_LABELS, SESSION_OPTIONS } from '@/lib/constants';
import { formatCurrency, formatDate, getTierById } from '@/lib/calculations';
import { saveProposal } from '@/lib/actions';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface ProposalPreviewProps {
    formState: ProposalFormState;
    priceBreakdown: PriceBreakdown;
}

export function ProposalPreview({ formState, priceBreakdown }: ProposalPreviewProps) {
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const tier = getTierById(formState.programType, formState.selectedTierId);

    const handleDownloadPDF = async () => {
        const { generatePDF } = await import('@/lib/pdf-generator');
        await generatePDF(formState, priceBreakdown);
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveStatus('idle');

        const result = await saveProposal(formState, priceBreakdown);

        if (result.success) {
            setSaveStatus('success');
            setTimeout(() => setSaveStatus('idle'), 3000);
        } else {
            setSaveStatus('error');
        }
        setSaving(false);
    };

    // Get session label for display
    const sessionOption = SESSION_OPTIONS.find(opt => opt.value === formState.inPersonSessions);
    const sessionLabel = sessionOption && sessionOption.value > 0
        ? `${sessionOption.value} sessions/mo ${sessionOption.perWeek}`
        : null;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
                <h2 className="text-base md:text-lg font-semibold text-neutral-900">Preview</h2>
                <div className="flex gap-2">
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        variant="outline"
                        size="sm"
                        className="border-green-500 text-green-600 hover:bg-green-50 text-xs md:text-sm"
                    >
                        {saving ? (
                            <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 animate-spin" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : saveStatus === 'success' ? (
                            <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                        )}
                        {saving ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : 'Save'}
                    </Button>
                    <Button onClick={handleDownloadPDF} size="sm" className="bg-neutral-900 hover:bg-neutral-800 text-xs md:text-sm">
                        <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download PDF
                    </Button>
                </div>
            </div>

            {saveStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
                    Failed to save proposal. Please try again.
                </div>
            )}

            <Card className="overflow-hidden shadow-lg py-0">
                <CardContent className="p-0">
                    {/* Header */}
                    <div className="bg-neutral-900 text-white p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-3 md:mb-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-neutral-900 font-bold text-lg md:text-xl">IF</span>
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold">Irwin Fitness</h1>
                                <p className="text-neutral-300 text-xs md:text-sm">Personal Training & Coaching</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-end gap-4">
                            <div className="min-w-0 flex-1">
                                <p className="text-neutral-400 text-xs uppercase tracking-wider">Prepared For</p>
                                <p className="text-base md:text-lg font-medium truncate">{formState.clientName || 'Client Name'}</p>
                                {formState.clientEmail && (
                                    <p className="text-neutral-300 text-xs md:text-sm truncate">{formState.clientEmail}</p>
                                )}
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-neutral-400 text-xs uppercase tracking-wider">Proposal</p>
                                <p className="font-mono text-xs md:text-sm">{formState.proposalNumber}</p>
                                <p className="text-neutral-300 text-xs md:text-sm">{formatDate(formState.proposalDate)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                        {/* Program Info */}
                        <div>
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <h3 className="text-base md:text-lg font-semibold text-neutral-900">
                                    {PROGRAM_LABELS[formState.programType]}
                                </h3>
                                {formState.friendsAndFamily && (
                                    <Badge className="bg-green-500 text-white text-xs">F&F</Badge>
                                )}
                            </div>
                            {tier && (
                                <div className="bg-neutral-50 rounded-lg p-3 md:p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-neutral-900 text-sm md:text-base">{tier.name}</span>
                                        <span className="font-semibold text-sm md:text-base">{formatCurrency(priceBreakdown.baseTierPrice)}/mo</span>
                                    </div>
                                    <p className="text-xs md:text-sm text-neutral-600">{tier.description}</p>
                                    {'features' in tier && tier.features && (
                                        <ul className="mt-2 md:mt-3 space-y-1">
                                            {tier.features.map((feature, i) => (
                                                <li key={i} className="text-xs md:text-sm text-neutral-600 flex items-center gap-2">
                                                    <svg className="w-3 h-3 md:w-4 md:h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* In-Person Sessions (if selected) */}
                        {priceBreakdown.inPersonSessions > 0 && (
                            <div className="bg-blue-50 rounded-lg p-3 md:p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-neutral-900 text-sm md:text-base">In-Person Training Sessions</p>
                                        <p className="text-xs md:text-sm text-neutral-600">{sessionLabel}</p>
                                    </div>
                                    <span className="font-semibold text-sm md:text-base">{formatCurrency(priceBreakdown.inPersonSessionsPrice)}/mo</span>
                                </div>
                            </div>
                        )}

                        <Separator />

                        {/* Price Breakdown */}
                        <div className="space-y-2 md:space-y-3">
                            <h4 className="font-medium text-neutral-900 text-sm md:text-base">Price Breakdown</h4>

                            <div className="flex justify-between text-xs md:text-sm">
                                <span className="text-neutral-600">{priceBreakdown.tierName} (Online Coaching)</span>
                                <span>{formatCurrency(priceBreakdown.baseTierPrice)}/mo</span>
                            </div>

                            {priceBreakdown.friendsAndFamilyDiscount > 0 && (
                                <div className="flex justify-between text-xs md:text-sm text-green-600">
                                    <span>Friends & Family Discount (30%)</span>
                                    <span>-{formatCurrency(priceBreakdown.friendsAndFamilyDiscount)}</span>
                                </div>
                            )}

                            {priceBreakdown.commitmentDiscount > 0 && (
                                <div className="flex justify-between text-xs md:text-sm text-green-600">
                                    <span>{formState.commitmentLength}-Month Commitment Discount</span>
                                    <span>-{formatCurrency(priceBreakdown.commitmentDiscount)}</span>
                                </div>
                            )}

                            {priceBreakdown.inPersonSessions > 0 && (
                                <div className="flex justify-between text-xs md:text-sm">
                                    <span className="text-neutral-600">In-Person Sessions ({priceBreakdown.inPersonSessions}/mo)</span>
                                    <span>{formatCurrency(priceBreakdown.inPersonSessionsPrice)}/mo</span>
                                </div>
                            )}

                            {priceBreakdown.addOns.length > 0 && (
                                <>
                                    <Separator className="my-2" />
                                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Add-Ons</p>
                                    {priceBreakdown.addOns.map((addon, i) => (
                                        <div key={i} className="flex justify-between text-xs md:text-sm">
                                            <span className="text-neutral-600">
                                                {addon.name}
                                                {addon.isOneTime && <span className="text-neutral-400 ml-1">(one-time)</span>}
                                            </span>
                                            <span>{formatCurrency(addon.price)}</span>
                                        </div>
                                    ))}
                                </>
                            )}

                            <Separator className="my-2" />

                            <div className="flex justify-between font-medium text-sm md:text-base">
                                <span>Monthly Total</span>
                                <span className="text-base md:text-lg">{formatCurrency(priceBreakdown.monthlyTotal)}</span>
                            </div>

                            <div className="flex justify-between font-semibold text-base md:text-lg mt-2">
                                <span>{formState.commitmentLength}-Month Commitment Total</span>
                                <span className="text-lg md:text-xl">{formatCurrency(priceBreakdown.fullCommitmentTotal)}</span>
                            </div>

                            <Separator className="my-3" />

                            <div className="flex justify-between font-bold text-base md:text-lg">
                                <span>Due on Signing (3-Month Minimum)</span>
                                <span className="text-lg md:text-xl">{formatCurrency(priceBreakdown.dueOnSigning)}</span>
                            </div>
                        </div>

                        <Separator />

                        <div className="text-center text-xs md:text-sm text-neutral-500 space-y-1 md:space-y-2">
                            <p><strong className="text-neutral-700">Irwin Fitness</strong></p>
                            <p>Payment details and terms will be provided upon acceptance.</p>
                            <p className="text-xs">Questions? Contact us at hello@irwinfitness.com</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
