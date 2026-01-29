import Link from 'next/link';
import { getProposals } from '@/lib/actions';
import { formatCurrency } from '@/lib/calculations';
import { PROGRAM_LABELS } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default async function ProposalsPage() {
    const proposals = await getProposals();

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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">IF</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold text-neutral-900">Irwin Fitness</h1>
                                    <p className="text-sm text-neutral-500">Saved Proposals</p>
                                </div>
                            </Link>
                        </div>
                        <Link href="/">
                            <Button className="bg-neutral-900 hover:bg-neutral-800">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                New Proposal
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {proposals.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <svg className="w-16 h-16 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="text-lg font-medium text-neutral-900 mb-2">No proposals yet</h3>
                            <p className="text-neutral-500 mb-4">Create your first proposal to get started.</p>
                            <Link href="/">
                                <Button className="bg-neutral-900 hover:bg-neutral-800">Create Proposal</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {proposals.map((proposal) => (
                            <Link key={proposal.id} href={`/proposals/${proposal.id}`}>
                                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-base font-medium truncate">
                                                {proposal.clientName}
                                            </CardTitle>
                                            <Badge className={getStatusColor(proposal.status)}>
                                                {proposal.status}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-neutral-500 font-mono">{proposal.proposalNumber}</p>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-neutral-500">Program</span>
                                                <span className="font-medium">
                                                    {PROGRAM_LABELS[proposal.programType as keyof typeof PROGRAM_LABELS] || proposal.programType}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-neutral-500">Monthly</span>
                                                <span className="font-medium">{formatCurrency(proposal.monthlyTotal)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-neutral-500">Commitment</span>
                                                <span className="font-semibold text-neutral-900">
                                                    {formatCurrency(proposal.fullCommitmentTotal)}
                                                </span>
                                            </div>
                                            {proposal.friendsAndFamily && (
                                                <Badge className="bg-green-100 text-green-700 text-xs">F&F Pricing</Badge>
                                            )}
                                        </div>
                                        <p className="text-xs text-neutral-400 mt-3">
                                            Created {new Date(proposal.createdAt).toLocaleDateString()}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
