'use client';

import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    pdf,
} from '@react-pdf/renderer';
import { ProposalFormState, PriceBreakdown } from './types';
import { PROGRAM_LABELS } from './constants';
import { formatCurrency, formatDate, getTierById } from './calculations';

// Register fonts (using system fonts fallback)
Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'Helvetica' },
        { src: 'Helvetica-Bold', fontWeight: 'bold' },
    ],
});

// Styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#171717',
    },
    header: {
        backgroundColor: '#171717',
        padding: 24,
        marginBottom: 24,
        marginHorizontal: -40,
        marginTop: -40,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    logo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    logoBox: {
        width: 36,
        height: 36,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    logoText: {
        color: '#171717',
        fontWeight: 'bold',
        fontSize: 16,
    },
    companyName: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    companyTagline: {
        color: '#a3a3a3',
        fontSize: 10,
    },
    clientInfo: {
        color: '#ffffff',
    },
    clientLabel: {
        color: '#737373',
        fontSize: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    clientName: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 2,
    },
    clientEmail: {
        color: '#a3a3a3',
        fontSize: 10,
        marginTop: 2,
    },
    proposalInfo: {
        textAlign: 'right',
    },
    proposalNumber: {
        color: '#ffffff',
        fontSize: 10,
        fontFamily: 'Courier',
        marginTop: 2,
    },
    proposalDate: {
        color: '#a3a3a3',
        fontSize: 10,
        marginTop: 2,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#171717',
    },
    tierBox: {
        backgroundColor: '#fafafa',
        padding: 16,
        borderRadius: 8,
    },
    tierHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    tierName: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    tierPrice: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    tierDescription: {
        fontSize: 10,
        color: '#525252',
        marginBottom: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    featureCheck: {
        color: '#22c55e',
        marginRight: 8,
        fontSize: 10,
    },
    featureText: {
        fontSize: 9,
        color: '#525252',
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: '#e5e5e5',
        marginVertical: 16,
    },
    lineItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    lineItemLabel: {
        fontSize: 10,
        color: '#525252',
    },
    lineItemValue: {
        fontSize: 10,
        color: '#171717',
    },
    discountValue: {
        fontSize: 10,
        color: '#22c55e',
    },
    addOnLabel: {
        fontSize: 8,
        color: '#737373',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    totalBox: {
        backgroundColor: '#171717',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
    },
    totalLabel: {
        color: '#737373',
        fontSize: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    totalValue: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 4,
    },
    monthlyTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
        marginTop: 8,
    },
    monthlyLabel: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    monthlyValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 'auto',
        textAlign: 'center',
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
    },
    footerText: {
        fontSize: 9,
        color: '#737373',
        marginBottom: 4,
    },
    footerCompany: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#171717',
        marginBottom: 4,
    },
    badge: {
        backgroundColor: '#22c55e',
        color: '#ffffff',
        fontSize: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 8,
    },
    programHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
});

interface PDFDocumentProps {
    formState: ProposalFormState;
    priceBreakdown: PriceBreakdown;
}

function ProposalPDFDocument({ formState, priceBreakdown }: PDFDocumentProps) {
    const tier = getTierById(formState.programType, formState.selectedTierId);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <View style={styles.logoBox}>
                            <Text style={styles.logoText}>IF</Text>
                        </View>
                        <View>
                            <Text style={styles.companyName}>Irwin Fitness</Text>
                            <Text style={styles.companyTagline}>Personal Training & Coaching</Text>
                        </View>
                    </View>
                    <View style={styles.headerContent}>
                        <View style={styles.clientInfo}>
                            <Text style={styles.clientLabel}>Prepared For</Text>
                            <Text style={styles.clientName}>
                                {formState.clientName || 'Client Name'}
                            </Text>
                            {formState.clientEmail && (
                                <Text style={styles.clientEmail}>{formState.clientEmail}</Text>
                            )}
                        </View>
                        <View style={styles.proposalInfo}>
                            <Text style={styles.clientLabel}>Proposal</Text>
                            <Text style={styles.proposalNumber}>{formState.proposalNumber}</Text>
                            <Text style={styles.proposalDate}>
                                {formatDate(formState.proposalDate)}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Program Section */}
                <View style={styles.section}>
                    <View style={styles.programHeader}>
                        <Text style={styles.sectionTitle}>
                            {PROGRAM_LABELS[formState.programType]}
                        </Text>
                        {formState.friendsAndFamily && (
                            <Text style={styles.badge}>F&F</Text>
                        )}
                    </View>

                    {tier && (
                        <View style={styles.tierBox}>
                            <View style={styles.tierHeader}>
                                <Text style={styles.tierName}>{tier.name}</Text>
                                <Text style={styles.tierPrice}>
                                    {formatCurrency(priceBreakdown.baseTierPrice)}/mo
                                </Text>
                            </View>
                            <Text style={styles.tierDescription}>{tier.description}</Text>
                            {'features' in tier && tier.features && tier.features.map((feature, i) => (
                                <View key={i} style={styles.featureItem}>
                                    <Text style={styles.featureCheck}>✓</Text>
                                    <Text style={styles.featureText}>{feature}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* In-Person Sessions Section (if any) */}
                {priceBreakdown.inPersonSessions > 0 && (
                    <View style={styles.section}>
                        <View style={[styles.tierBox, { backgroundColor: '#eff6ff' }]}>
                            <View style={styles.tierHeader}>
                                <Text style={styles.tierName}>In-Person Training Sessions</Text>
                                <Text style={styles.tierPrice}>
                                    {formatCurrency(priceBreakdown.inPersonSessionsPrice)}/mo
                                </Text>
                            </View>
                            <Text style={styles.tierDescription}>
                                {priceBreakdown.inPersonSessions} sessions/month (~{Math.round(priceBreakdown.inPersonSessions / 4 * 10) / 10} per week)
                            </Text>
                        </View>
                    </View>
                )}

                <View style={styles.divider} />

                {/* Price Breakdown */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Price Breakdown</Text>

                    <View style={styles.lineItem}>
                        <Text style={styles.lineItemLabel}>{priceBreakdown.tierName} (Online Coaching)</Text>
                        <Text style={styles.lineItemValue}>
                            {formatCurrency(priceBreakdown.baseTierPrice)}/mo
                        </Text>
                    </View>

                    {priceBreakdown.friendsAndFamilyDiscount > 0 && (
                        <View style={styles.lineItem}>
                            <Text style={styles.discountValue}>Friends & Family Discount (30%)</Text>
                            <Text style={styles.discountValue}>
                                -{formatCurrency(priceBreakdown.friendsAndFamilyDiscount)}
                            </Text>
                        </View>
                    )}

                    {priceBreakdown.commitmentDiscount > 0 && (
                        <View style={styles.lineItem}>
                            <Text style={styles.discountValue}>
                                {formState.commitmentLength}-Month Commitment Discount
                            </Text>
                            <Text style={styles.discountValue}>
                                -{formatCurrency(priceBreakdown.commitmentDiscount)}
                            </Text>
                        </View>
                    )}

                    {priceBreakdown.inPersonSessions > 0 && (
                        <View style={styles.lineItem}>
                            <Text style={styles.lineItemLabel}>
                                In-Person Sessions ({priceBreakdown.inPersonSessions}/mo)
                            </Text>
                            <Text style={styles.lineItemValue}>
                                {formatCurrency(priceBreakdown.inPersonSessionsPrice)}/mo
                            </Text>
                        </View>
                    )}

                    {priceBreakdown.addOns.length > 0 && (
                        <>
                            <View style={styles.divider} />
                            <Text style={styles.addOnLabel}>Add-Ons</Text>
                            {priceBreakdown.addOns.map((addon, i) => (
                                <View key={i} style={styles.lineItem}>
                                    <Text style={styles.lineItemLabel}>
                                        {addon.name} {addon.isOneTime ? '(one-time)' : ''}
                                    </Text>
                                    <Text style={styles.lineItemValue}>
                                        {formatCurrency(addon.price)}
                                    </Text>
                                </View>
                            ))}
                        </>
                    )}

                    <View style={styles.monthlyTotal}>
                        <Text style={styles.monthlyLabel}>Monthly Total</Text>
                        <Text style={styles.monthlyValue}>
                            {formatCurrency(priceBreakdown.monthlyTotal)}
                        </Text>
                    </View>

                    <View style={styles.totalBox}>
                        {/* Grand Total */}
                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#525252', paddingBottom: 8, marginBottom: 8 }}>
                            <Text style={styles.totalLabel}>
                                {formState.commitmentLength}-Month Commitment Total
                            </Text>
                            <Text style={styles.totalValue}>
                                {formatCurrency(priceBreakdown.fullCommitmentTotal)}
                            </Text>
                        </View>
                        {/* Due on Signing */}
                        <View>
                            <Text style={{ color: '#4ade80', fontSize: 8, textTransform: 'uppercase', marginBottom: 4 }}>
                                Due on Signing (3-Month Minimum)
                            </Text>
                            <Text style={{ color: '#4ade80', fontSize: 18, fontWeight: 'bold' }}>
                                {formatCurrency(priceBreakdown.dueOnSigning)}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerCompany}>Irwin Fitness</Text>
                    <Text style={styles.footerText}>
                        Payment details and terms will be provided upon acceptance.
                    </Text>
                    <Text style={styles.footerText}>
                        Questions? Contact us at hello@irwinfitness.com
                    </Text>
                </View>
            </Page>
        </Document>
    );
}

export async function generatePDF(
    formState: ProposalFormState,
    priceBreakdown: PriceBreakdown
): Promise<void> {
    const pdfBlob = await pdf(
        <ProposalPDFDocument formState={formState} priceBreakdown={priceBreakdown} />
    ).toBlob();

    // Create a new blob with explicit PDF MIME type
    const blob = new Blob([pdfBlob], { type: 'application/pdf' });

    // Create filename: ClientName_InvoiceNumber.pdf
    const clientName = formState.clientName
        ? formState.clientName.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_')
        : 'Client';
    const invoiceNumber = formState.proposalNumber;
    const filename = `${clientName}_${invoiceNumber}.pdf`;

    // Use a more robust download method
    const url = URL.createObjectURL(blob);

    // Create and configure the download link
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.download = filename;
    link.type = 'application/pdf';

    // Append to body, click, then cleanup
    document.body.appendChild(link);

    // Use a small timeout to ensure the link is in the DOM
    await new Promise(resolve => setTimeout(resolve, 100));

    link.click();

    // Cleanup after a delay to ensure download starts
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 1000);
}
