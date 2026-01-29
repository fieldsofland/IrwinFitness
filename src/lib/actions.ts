'use server';

import { getPrisma } from '@/lib/prisma';
import { ProposalFormState, PriceBreakdown } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export interface SavedProposal {
    id: string;
    proposalNumber: string;
    clientName: string;
    clientEmail: string | null;
    proposalDate: Date;
    programType: string;
    selectedTierId: string;
    inPersonSessions: number;
    commitmentLength: number;
    friendsAndFamily: boolean;
    selectedAddOns: string[];
    baseTierPrice: number;
    inPersonSessionsPrice: number;
    friendsAndFamilyDiscount: number;
    commitmentDiscount: number;
    monthlyTotal: number;
    fullCommitmentTotal: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function getNextInvoiceNumber(): Promise<string> {
    try {
        const prisma = getPrisma();
        const count = await prisma.proposal.count();
        return String(count).padStart(4, '0'); // Returns "0000", "0001", "0002", etc.
    } catch (error) {
        console.error('Error getting next invoice number:', error);
        return '0000';
    }
}

export async function saveProposal(
    formState: ProposalFormState,
    priceBreakdown: PriceBreakdown
): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
        const prisma = getPrisma();
        const proposal = await prisma.proposal.create({
            data: {
                proposalNumber: formState.proposalNumber,
                clientName: formState.clientName || 'Unnamed Client',
                clientEmail: formState.clientEmail || null,
                proposalDate: formState.proposalDate,
                programType: formState.programType,
                selectedTierId: formState.selectedTierId,
                inPersonSessions: formState.inPersonSessions || 0,
                commitmentLength: formState.commitmentLength,
                friendsAndFamily: formState.friendsAndFamily,
                selectedAddOns: formState.selectedAddOns,
                baseTierPrice: priceBreakdown.baseTierPrice,
                inPersonSessionsPrice: priceBreakdown.inPersonSessionsPrice || 0,
                friendsAndFamilyDiscount: priceBreakdown.friendsAndFamilyDiscount,
                commitmentDiscount: priceBreakdown.commitmentDiscount,
                monthlyTotal: priceBreakdown.monthlyTotal,
                fullCommitmentTotal: priceBreakdown.fullCommitmentTotal,
                status: 'draft',
            },
        });

        revalidatePath('/proposals');
        return { success: true, id: proposal.id };
    } catch (error) {
        console.error('Error saving proposal:', error);
        return { success: false, error: 'Failed to save proposal' };
    }
}

export async function getProposals(): Promise<SavedProposal[]> {
    try {
        const prisma = getPrisma();
        const proposals = await prisma.proposal.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return proposals;
    } catch (error) {
        console.error('Error fetching proposals:', error);
        return [];
    }
}

export async function getProposalById(id: string): Promise<SavedProposal | null> {
    try {
        const prisma = getPrisma();
        const proposal = await prisma.proposal.findUnique({
            where: { id },
        });
        return proposal;
    } catch (error) {
        console.error('Error fetching proposal:', error);
        return null;
    }
}

export async function updateProposalStatus(
    id: string,
    status: string
): Promise<{ success: boolean; error?: string }> {
    try {
        const prisma = getPrisma();
        await prisma.proposal.update({
            where: { id },
            data: { status },
        });

        revalidatePath('/proposals');
        revalidatePath(`/proposals/${id}`);
        return { success: true };
    } catch (error) {
        console.error('Error updating proposal status:', error);
        return { success: false, error: 'Failed to update status' };
    }
}

export async function deleteProposal(
    id: string
): Promise<{ success: boolean; error?: string }> {
    try {
        const prisma = getPrisma();
        await prisma.proposal.delete({
            where: { id },
        });

        revalidatePath('/proposals');
        return { success: true };
    } catch (error) {
        console.error('Error deleting proposal:', error);
        return { success: false, error: 'Failed to delete proposal' };
    }
}
