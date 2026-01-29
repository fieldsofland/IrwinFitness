'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateProposalStatus, deleteProposal } from '@/lib/actions';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface ProposalActionsProps {
    proposalId: string;
    currentStatus: string;
}

export function ProposalActions({ proposalId, currentStatus }: ProposalActionsProps) {
    const router = useRouter();
    const [status, setStatus] = useState(currentStatus);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleStatusChange = async (newStatus: string) => {
        setUpdating(true);
        const result = await updateProposalStatus(proposalId, newStatus);
        if (result.success) {
            setStatus(newStatus);
        }
        setUpdating(false);
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this proposal?')) return;

        setDeleting(true);
        const result = await deleteProposal(proposalId);
        if (result.success) {
            router.push('/proposals');
        }
        setDeleting(false);
    };

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <h4 className="font-medium">Actions</h4>

                <div className="space-y-2">
                    <label className="text-sm text-neutral-500">Status</label>
                    <Select value={status} onValueChange={handleStatusChange} disabled={updating}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="sent">Sent</SelectItem>
                            <SelectItem value="accepted">Accepted</SelectItem>
                            <SelectItem value="declined">Declined</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="pt-2 border-t space-y-2">
                    <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? 'Deleting...' : 'Delete Proposal'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
