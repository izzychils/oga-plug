import { LegalPage, type LegalDocSection } from "@/components/layout/legal-page";
import { CONTACT } from "@/lib/site";

/**
 * The commercial terms. The plan table is part of clause 1, so it is rendered
 * inside that section rather than pushed to the end of the document.
 */

const PLANS = [
  {
    plan: "Free",
    price: "₦0",
    best: "Up to 100 products and basic sales recording, with no time limit",
  },
  {
    plan: "SME",
    price: "₦3,500 / month",
    best: "Single-location traders and shop owners: unlimited products, full POS, AI assistant, supplier linking, debt management and financial reports",
  },
  {
    plan: "Business",
    price: "₦9,000 / month",
    best: "Growing businesses: everything in SME plus multi-location management, full financial reporting, cash flow projections and loan readiness documents",
  },
  {
    plan: "Enterprise",
    price: "From ₦25,000 / month",
    best: "Pharmacies, healthcare, agriculture, distributors and microfinance banks: industry modules, priority support and custom integrations",
  },
];

function PlanTable() {
  return (
    <div className="not-prose mt-4 overflow-hidden rounded-2xl border border-white/12">
      {/*
        A real table on wide screens. On a phone it becomes a stack of cards via
        the `sm:` switch on each row, because a four-column price table at 320px
        is unreadable no matter how it is styled.
      */}
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">Oga Plug plans and monthly pricing in naira</caption>
        <thead className="hidden bg-white/[0.06] sm:table-header-group">
          <tr>
            <th scope="col" className="px-4 py-3 font-bold">Plan</th>
            <th scope="col" className="px-4 py-3 font-bold">Price (₦ per month)</th>
            <th scope="col" className="px-4 py-3 font-bold">Best for</th>
          </tr>
        </thead>
        <tbody>
          {PLANS.map(({ plan, price, best }) => (
            <tr
              key={plan}
              className="block border-t border-white/10 first:border-t-0 sm:table-row"
            >
              <th
                scope="row"
                className="block px-4 pb-0 pt-4 text-base font-extrabold sm:table-cell sm:py-3.5 sm:text-sm sm:font-bold sm:text-foreground"
              >
                {plan}
              </th>
              <td className="block px-4 py-1 font-semibold text-primary-ink sm:table-cell sm:py-3.5">
                {price}
              </td>
              <td className="block px-4 pb-4 text-foreground/70 sm:table-cell sm:py-3.5">
                {best}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const SECTIONS: LegalDocSection[] = [
  {
    title: "Plans and pricing",
    paras: [
      "Prices are in Nigerian naira and may be changed with at least 30 days' notice. Features marked as coming later, such as in-app payments, escrow and marketplace fees, are not part of your plan until we launch them.",
    ],
    extra: <PlanTable />,
  },
  {
    title: "Billing and renewal",
    paras: [
      "Paid plans are billed monthly in advance through a payment link or other method we provide, and renew automatically until cancelled. Taxes, including VAT where applicable, may be added.",
    ],
  },
  {
    title: "Cancellation and refunds",
    paras: [
      "You may cancel at any time and keep access until the end of the paid period. Fees already paid are not refundable, except where the law requires or where we agree in writing. If you downgrade, features and limits of the lower plan apply, and you may need to reduce your product count.",
    ],
  },
  {
    title: "Your data on cancellation",
    paras: [
      "You can export your records before closing your account. After closure, we delete or anonymise your data as described in the Privacy Policy, subject to legal retention rules.",
    ],
  },
  {
    title: "Institutional and B2B licences",
    paras: [
      "Microfinance banks, distributors and other institutions that license Oga Plug for their clients do so under a separate written agreement, which prevails if it conflicts with these terms.",
    ],
  },
  {
    title: "Marketplace and supplier dealings",
    paras: [
      "Transactions between businesses, including negotiated invoices, are contracts between those businesses. MecurixTech is not a party to them and is not responsible for the quality, delivery, price or payment of goods unless we expressly say otherwise for a specific paid service.",
    ],
  },
  {
    title: "Disclaimers",
    paras: [
      "Oga Plug is provided “as is” and “as available”. We do not promise that it will be error-free, that AI outputs will always be correct, or that any report will be accepted by a tax authority, bank or regulator.",
    ],
  },
  {
    title: "Limitation of liability",
    paras: [
      "To the extent the law allows, MecurixTech is not liable for indirect or consequential loss, lost profits, lost sales, stock loss or lost data arising from your use of Oga Plug. Our total liability for any claim is limited to the fees you paid us in the three months before the claim arose.",
    ],
  },
  {
    title: "Indemnity",
    paras: [
      "You agree to cover losses and claims that arise from your breach of these terms, your unlawful use of Oga Plug, or the records you submit.",
    ],
  },
  {
    title: "Force majeure",
    paras: [
      "We are not responsible for delays or failures caused by events beyond our reasonable control, such as network or power outages, third-party platform changes, strikes, or acts of government.",
    ],
  },
  {
    title: "Governing law and disputes",
    paras: [
      "These terms are governed by the laws of the Federal Republic of Nigeria. We will first try to resolve any dispute through good-faith discussion. If that fails, the courts of Rivers State, Nigeria, have jurisdiction.",
    ],
  },
  {
    title: "General",
    paras: [
      "If any part of these terms is found unenforceable, the rest stays in force. These terms and the documents they refer to are our whole agreement with you. You may not transfer your account without our written consent.",
    ],
  },
];

export function TermsAndConditionsPage() {
  return (
    <LegalPage
      badge="Legal"
      title="Terms and Conditions"
      lede="These Terms and Conditions form the commercial agreement between you and Oga Plug for the Oga Plug service. They apply together with the Terms of Use and Privacy Policy."
      sections={SECTIONS}
      contactEmail={CONTACT.billing}
    />
  );
}

export default TermsAndConditionsPage;
