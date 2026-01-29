'use client';

import { ProposalFormState, ProgramType, CommitmentLength, SessionCount } from '@/lib/types';
import {
    FAT_LOSS_TIERS,
    MUSCLE_BUILDING_TIERS,
    ADD_ONS,
    COMMITMENT_OPTIONS,
    SESSION_PRICE,
    SESSION_OPTIONS,
} from '@/lib/constants';
import { getTiersForProgram, formatCurrency } from '@/lib/calculations';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface ProposalFormProps {
    formState: ProposalFormState;
    onUpdate: (updates: Partial<ProposalFormState>) => void;
}

export function ProposalForm({ formState, onUpdate }: ProposalFormProps) {
    const currentTiers = getTiersForProgram(formState.programType);

    const handleProgramChange = (programType: ProgramType) => {
        const tiers = getTiersForProgram(programType);
        onUpdate({
            programType,
            selectedTierId: tiers[0].id,
        });
    };

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Client Information */}
            <Card>
                <CardHeader className="pb-3 md:pb-4">
                    <CardTitle className="text-base md:text-lg">Client Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="clientName" className="text-sm">Client Name</Label>
                            <Input
                                id="clientName"
                                placeholder="John Smith"
                                value={formState.clientName}
                                onChange={(e) => onUpdate({ clientName: e.target.value })}
                                className="h-9 md:h-10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clientEmail" className="text-sm">Client Email</Label>
                            <Input
                                id="clientEmail"
                                type="email"
                                placeholder="john@example.com"
                                value={formState.clientEmail}
                                onChange={(e) => onUpdate({ clientEmail: e.target.value })}
                                className="h-9 md:h-10"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="proposalDate" className="text-sm">Proposal Date</Label>
                            <Input
                                id="proposalDate"
                                type="date"
                                value={formState.proposalDate.toISOString().split('T')[0]}
                                onChange={(e) =>
                                    onUpdate({ proposalDate: new Date(e.target.value) })
                                }
                                className="h-9 md:h-10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm">Proposal Number</Label>
                            <div className="h-9 md:h-10 px-3 flex items-center bg-neutral-100 rounded-md text-sm font-mono">
                                {formState.proposalNumber}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Program Selection */}
            <Card>
                <CardHeader className="pb-3 md:pb-4">
                    <CardTitle className="text-base md:text-lg">Online Coaching Program</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                    <Tabs
                        value={formState.programType}
                        onValueChange={(value) => handleProgramChange(value as ProgramType)}
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="fat-loss" className="text-xs sm:text-sm">
                                Fat Loss
                            </TabsTrigger>
                            <TabsTrigger value="muscle-building" className="text-xs sm:text-sm">
                                Muscle Building
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="fat-loss" className="space-y-4 mt-4">
                            <Select
                                value={formState.selectedTierId}
                                onValueChange={(value) => onUpdate({ selectedTierId: value })}
                            >
                                <SelectTrigger className="h-10 md:h-11">
                                    <SelectValue placeholder="Select a tier" />
                                </SelectTrigger>
                                <SelectContent>
                                    {FAT_LOSS_TIERS.map((tier) => (
                                        <SelectItem key={tier.id} value={tier.id}>
                                            <span className="flex items-center gap-2">
                                                {tier.name}
                                                <span className="text-neutral-500">
                                                    — {formatCurrency(tier.price)}/mo
                                                </span>
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </TabsContent>

                        <TabsContent value="muscle-building" className="space-y-4 mt-4">
                            <Select
                                value={formState.selectedTierId}
                                onValueChange={(value) => onUpdate({ selectedTierId: value })}
                            >
                                <SelectTrigger className="h-10 md:h-11">
                                    <SelectValue placeholder="Select a tier" />
                                </SelectTrigger>
                                <SelectContent>
                                    {MUSCLE_BUILDING_TIERS.map((tier) => (
                                        <SelectItem key={tier.id} value={tier.id}>
                                            <span className="flex items-center gap-2">
                                                {tier.name}
                                                <span className="text-neutral-500">
                                                    — {formatCurrency(tier.price)}/mo
                                                </span>
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </TabsContent>
                    </Tabs>

                    {/* Current tier description */}
                    {currentTiers.find((t) => t.id === formState.selectedTierId) && (
                        <div className="bg-neutral-50 rounded-lg p-3 md:p-4">
                            <p className="text-sm text-neutral-600">
                                {currentTiers.find((t) => t.id === formState.selectedTierId)?.description}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* In-Person Training Sessions */}
            <Card>
                <CardHeader className="pb-3 md:pb-4">
                    <CardTitle className="text-base md:text-lg">In-Person Training Sessions</CardTitle>
                    <p className="text-sm text-neutral-500 mt-1">Optional: Add personal training sessions at {formatCurrency(SESSION_PRICE)}/session</p>
                </CardHeader>
                <CardContent>
                    <Select
                        value={formState.inPersonSessions.toString()}
                        onValueChange={(value) => onUpdate({ inPersonSessions: parseInt(value) as SessionCount })}
                    >
                        <SelectTrigger className="h-10 md:h-11">
                            <SelectValue placeholder="Select sessions" />
                        </SelectTrigger>
                        <SelectContent>
                            {SESSION_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value.toString()}>
                                    <span className="flex items-center gap-2">
                                        {option.label}
                                        {option.perWeek && (
                                            <span className="text-neutral-500">{option.perWeek}</span>
                                        )}
                                        {option.value > 0 && (
                                            <span className="text-neutral-500">
                                                — {formatCurrency(option.value * SESSION_PRICE)}/mo
                                            </span>
                                        )}
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Commitment Length */}
            <Card>
                <CardHeader className="pb-3 md:pb-4">
                    <CardTitle className="text-base md:text-lg">Commitment Length</CardTitle>
                </CardHeader>
                <CardContent>
                    <Select
                        value={formState.commitmentLength.toString()}
                        onValueChange={(value) =>
                            onUpdate({ commitmentLength: parseInt(value) as CommitmentLength })
                        }
                    >
                        <SelectTrigger className="h-10 md:h-11">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {COMMITMENT_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value.toString()}>
                                    {option.label}
                                    {option.value > 3 && (
                                        <span className="text-green-600 ml-2">
                                            (Save {option.value === 6 ? '$25' : '$50'}/mo on tier)
                                        </span>
                                    )}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Payment Option */}
            <Card>
                <CardHeader className="pb-3 md:pb-4">
                    <CardTitle className="text-base md:text-lg">Due on Signing</CardTitle>
                </CardHeader>
                <CardContent>
                    <Select
                        value={formState.paymentOption}
                        onValueChange={(value) =>
                            onUpdate({ paymentOption: value as '50-percent' | '3-month' })
                        }
                    >
                        <SelectTrigger className="h-10 md:h-11">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="3-month">
                                3-Month Minimum Upfront
                            </SelectItem>
                            <SelectItem value="50-percent">
                                50% of Commitment Upfront
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Add-Ons */}
            <Card>
                <CardHeader className="pb-3 md:pb-4">
                    <CardTitle className="text-base md:text-lg">Add-Ons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                    {ADD_ONS.map((addon) => (
                        <label
                            key={addon.id}
                            className="flex items-start gap-3 cursor-pointer group"
                        >
                            <input
                                type="checkbox"
                                className="mt-1 w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-500"
                                checked={formState.selectedAddOns.includes(addon.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        onUpdate({
                                            selectedAddOns: [...formState.selectedAddOns, addon.id],
                                        });
                                    } else {
                                        onUpdate({
                                            selectedAddOns: formState.selectedAddOns.filter(
                                                (id) => id !== addon.id
                                            ),
                                        });
                                    }
                                }}
                            />
                            <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-medium text-neutral-900 group-hover:text-neutral-700 text-sm md:text-base">
                                        {addon.name}
                                    </span>
                                    <Badge variant="secondary" className="text-xs">
                                        {formatCurrency(addon.price)}
                                    </Badge>
                                </div>
                                <p className="text-xs md:text-sm text-neutral-500">{addon.description}</p>
                            </div>
                        </label>
                    ))}
                </CardContent>
            </Card>

            {/* Friends & Family */}
            <Card className={formState.friendsAndFamily ? 'ring-2 ring-green-500' : ''}>
                <CardContent className="pt-4 md:pt-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <Label htmlFor="friends-family" className="text-sm md:text-base font-medium">
                                    Friends & Family Pricing
                                </Label>
                                {formState.friendsAndFamily && (
                                    <Badge className="bg-green-500 text-white text-xs">Active</Badge>
                                )}
                            </div>
                            <p className="text-xs md:text-sm text-neutral-500">
                                Applies 30% discount to the tier price
                            </p>
                        </div>
                        <Switch
                            id="friends-family"
                            checked={formState.friendsAndFamily}
                            onCheckedChange={(checked) => onUpdate({ friendsAndFamily: checked })}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
