import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProposalById } from '@/lib/actions';
import { formatCurrency } from '@/lib/calculations';
import { PROGRAM_LABELS, ADD_ONS } from '@/lib/constants';
import { getTierById } from '@/lib/calculations';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProposalActions } from './ProposalActions';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ProposalDetailPage({ params }: Props) {
    const { id } = await params;
    const proposal = await getProposalById(id);

    if (!proposal) {
        notFound();
    }

    const tier = getTierById(
        proposal.programType as 'fat-loss' | 'muscle-building',
        proposal.selectedTierId
    );

    const selectedAddOns = ADD_ONS.filter((addon) =>
        proposal.selectedAddOns.includes(addon.id)
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'draft': return 'bg-neutral-100 text-neutral-700';
            case 'sent': return 'bg-blue-100 text-blue-700';
            case 'accepted': return 'bg-green-100 text-green-700';
            case 'declined': return 'bg-red-100 text-red-700';
            default: return 'bg-neutral-100 text-neutral-700';
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/proposals" className="text-neutral-500 hover:text-neutral-700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <div>
                                <h1 className="text-xl font-semibold text-neutral-900">{proposal.clientName}</h1>
                                <p className="text-sm text-neutral-500 font-mono">{proposal.proposalNumber}</p>
                            </div>
                        </div>
                        <Badge className={getStatusColor(proposal.status)}>{proposal.status}</Badge>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="overflow-hidden shadow-lg">
                            <CardContent className="p-0">
                                {/* Header */}
                                <div className="bg-neutral-900 text-white p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                            <span className="text-neutral-900 font-bold text-xl">IF</span>
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">Irwin Fitness</h2>
                                            <p className="text-neutral-300 text-sm">Personal Training & Coaching</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-neutral-400 text-xs uppercase tracking-wider">Prepared For</p>
                                            <p className="text-lg font-medium">{proposal.clientName}</p>
                                            {proposal.clientEmail && (
                                                <p className="text-neutral-300 text-sm">{proposal.clientEmail}</p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-neutral-400 text-xs uppercase tracking-wider">Proposal</p>
                                            <p className="font-mono text-sm">{proposal.proposalNumber}</p>
                                            <p className="text-neutral-300 text-sm">
                                                {new Date(proposal.proposalDate).toLocaleDateString('en-US', {
                                                    year: 'numeric', month: 'long', day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-6 space-y-6">
                                    {/* Program Info */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-lg font-semibold text-neutral-900">
                                                {PROGRAM_LABELS[proposal.programType as keyof typeof PROGRAM_LABELS]}
                                            </h3>
                                            {proposal.friendsAndFamily && (
                                                <Badge className="bg-green-500 text-white text-xs">F&F</Badge>
                                            )}
                                        </div>
                                        {tier && (
                                            <div className="bg-neutral-50 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-neutral-900">{tier.name}</span>
                                                    <span className="font-semibold">{formatCurrency(proposal.baseTierPrice)}/mo</span>
                                                </div>
                                                <p className="text-sm text-neutral-600">{tier.description}</p>
                                            </div>
                                        )}
                                    </div>

                                    <Separator />

                                    {/* Price Breakdown */}
                                    <div className="space-y-3">
                                        <h4 className="font-medium text-neutral-900">Price Breakdown</h4>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-neutral-600">Base Tier Price</span>
                                            <span>{formatCurrency(proposal.baseTierPrice)}/mo</span>
                                        </div>

                                        {proposal.friendsAndFamilyDiscount > 0 && (
                                            <div className="flex justify-between text-sm text-green-600">
                                                <span>Friends & Family Discount (30%)</span>
                                                <span>-{formatCurrency(proposal.friendsAndFamilyDiscount)}</span>
                                            </div>
                                        )}

                                        {proposal.commitmentDiscount > 0 && (
                                            <div className="flex justify-between text-sm text-green-600">
                                                <span>{proposal.commitmentLength}-Month Commitment Discount</span>
                                                <span>-{formatCurrency(proposal.commitmentDiscount)}</span>
                                            </div>
                                        )}

                                        {selectedAddOns.length > 0 && (
                                            <>
                                                <Separator className="my-2" />
                                                <p className="text-xs text-neutral-500 uppercase tracking-wider">Add-Ons</p>
                                                {selectedAddOns.map((addon) => (
                                                    <div key={addon.id} className="flex justify-between text-sm">
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

                                        <div className="flex justify-between font-medium">
                                            <span>Monthly Total</span>
                                            <span className="text-lg">{formatCurrency(proposal.monthlyTotal)}</span>
                                        </div>

                                        <div className="bg-neutral-900 text-white rounded-lg p-4 mt-4">
                                            <div>
                                                <p className="text-neutral-400 text-xs uppercase tracking-wider">
                                                    {proposal.commitmentLength}-Month Commitment Total
                                                </p>
                                                <p className="text-2xl font-bold">{formatCurrency(proposal.fullCommitmentTotal)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        <ProposalActions proposalId={proposal.id} currentStatus={proposal.status} />

                        <Card>
                            <CardContent className="p-4 space-y-3 text-sm">
                                <h4 className="font-medium">Details</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Created</span>
                                        <span>{new Date(proposal.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Updated</span>
                                        <span>{new Date(proposal.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Commitment</span>
                                        <span>{proposal.commitmentLength} months</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
