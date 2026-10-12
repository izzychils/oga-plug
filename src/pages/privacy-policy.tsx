import { LegalPage, type LegalDocSection } from "@/components/layout/legal-page";
import { Callout } from "@/components/layout/page-shell";
import { CONTACT } from "@/lib/site";

const SECTIONS: LegalDocSection[] = [
  {
    title: "Information we collect",
    bullets: [
      "Account details: your name, phone number (including your WhatsApp number), business name, business type, location and, where you provide them, email address and TIN.",
      "Business records you send us: photos of receipts, invoices, waybills, POS slips and transfer-alert screenshots; voice notes and text messages; product, stock, sales, purchase, expense, payroll and customer debt records.",
      "Customer and supplier details you enter: names, phone numbers and transaction history of your customers, suppliers and staff. You are responsible for having a lawful basis to share these with us.",
      "Usage and device data: message timestamps, language preference, device type, app or browser information and error logs.",
      "Payment data: subscription payment status. Card and bank details are handled by our payment processor, not stored by us.",
    ],
  },
  {
    title: "How we use your information",
    bullets: [
      "To read your documents and messages, update your inventory and books, and send you reports, alerts and invoices.",
      "To power AI features such as the assistant, demand forecasting, price intelligence and theft and fraud flags.",
      "To provide support, secure your account, prevent fraud and improve accuracy, including for Nigerian languages and Pidgin.",
      "To produce anonymised and aggregated insights, such as market price indices. These never identify you or your business.",
      "To meet legal and tax obligations.",
    ],
  },
  {
    title: "Lawful basis",
    paras: [
      "We process data to perform our contract with you, to comply with the law, for our legitimate interests in running and securing the service, and, where required, with your consent (for example, voice recordings or sharing business data with a lender). You can withdraw consent at any time.",
    ],
  },
  {
    title: "Who we share information with",
    bullets: [
      "Linked businesses: if you link with a supplier or buyer, they see the invoices, delivery notes and balances that relate to your dealings with them, and nothing else.",
      "Service providers: cloud hosting, AI and document-recognition services, WhatsApp (Meta) messaging, SMS/USSD providers and payment processors, each bound to protect your data.",
      "Financial institutions: only when you ask us to, for example to send a loan-ready financial pack to a bank or microfinance institution.",
      "Authorities: when the law requires it.",
    ],
    note: "We do not sell your personal data. Anonymised, aggregated market data may be shared with partners such as researchers or brands, and never in a form that identifies you.",
  },
  {
    title: "WhatsApp and third-party platforms",
    paras: [
      "Oga Plug runs on WhatsApp. Messages you send are also handled by WhatsApp under its own terms and privacy policy. We do not control those, and we recommend you review them.",
    ],
  },
  {
    title: "Storage, security and transfers",
    paras: [
      "We use encryption in transit, access controls and regular backups. Data may be processed on servers outside Nigeria; where that happens we require protection equal to the NDPA standard. No system is perfectly secure, so please protect your phone and report any suspected misuse of your account.",
    ],
  },
  {
    title: "Retention",
    paras: [
      "We keep your records while your account is active and for as long as the law requires for business and tax records. When you close your account, we delete or anonymise your data within a reasonable period, except where we must keep it by law.",
    ],
  },
  {
    title: "Your rights",
    paras: [
      "You may ask us to access, correct, delete, restrict or export your data, to object to certain processing, and to withdraw consent. You also have the right to complain to the Nigeria Data Protection Commission. To exercise any right, contact us using the details on the Contact Us page.",
    ],
  },
  {
    title: "Children",
    paras: [
      "Oga Plug is for business use by adults. We do not knowingly collect data from anyone under 18.",
    ],
  },
  {
    title: "Changes to this policy",
    paras: [
      "We may update this policy and will tell you through WhatsApp or our website. Continued use after an update means you accept the new version.",
    ],
  },
];

export function PrivacyPolicyPage() {
  return (
    <LegalPage
      badge="Legal"
      title="Privacy Policy"
      lede={`Oga Plug, “we”, “us”, “our”, collects and uses your information only to run the service you asked for. This policy explains what we collect, why, who sees it and what control you have, in line with the Nigeria Data Protection Act 2023 (NDPA).`}
      sections={SECTIONS}
      contactEmail={CONTACT.privacy}
    >
      <Callout title="Your business records belong to you">
        You can export your records at any time, and you can ask us to delete them.
        Nothing here changes that.
      </Callout>
    </LegalPage>
  );
}

export default PrivacyPolicyPage;
