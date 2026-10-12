import { LegalPage, type LegalDocSection } from "@/components/layout/legal-page";
import { CONTACT } from "@/lib/site";

const SECTIONS: LegalDocSection[] = [
  {
    title: "Who can use Oga Plug",
    paras: [
      "You must be 16 or older and legally able to run a business or act for one. If you use Oga Plug for a business, you confirm you are authorised to bind it.",
    ],
  },
  {
    title: "Your account",
    paras: [
      "Give accurate information and keep it current. You are responsible for all activity on your account, including activity by staff or agents you add. Keep your phone and any access links secure, and tell us at once if you suspect misuse.",
    ],
  },
  {
    title: "Acceptable use",
    paras: ["You agree not to:"],
    bullets: [
      "upload false, forged or altered receipts, invoices or records, or use Oga Plug to evade tax or hide unlawful income;",
      "record or sell prohibited, counterfeit, expired-but-relabelled or unregistered goods, including drugs without the required NAFDAC or PCN compliance;",
      "send spam, harassment or unlawful content through Oga Plug, including debt reminders that are threatening or abusive;",
      "upload personal data of others without a lawful basis;",
      "attempt to break, scrape, reverse-engineer or overload the service, or interfere with other users;",
      "resell or copy the platform, its AI models or its market price data without our written permission.",
    ],
  },
  {
    title: "AI features and accuracy",
    paras: [
      "Oga Plug uses AI to read documents, understand voice and text, forecast demand, estimate tax and flag possible theft or fraud. These outputs are aids, not guarantees. Always check extracted figures when we ask you to confirm them. Fraud and theft flags are signals to investigate, not proof of wrongdoing, and you must treat staff and customers fairly.",
    ],
  },
  {
    title: "Financial, tax and legal information",
    paras: [
      "Reports, tax estimates, loan eligibility scores and compliance documents are for guidance. They are not professional accounting, tax, legal or credit advice, and they do not guarantee approval by FIRS, a state revenue service or any lender. Consult a qualified professional for important decisions.",
    ],
  },
  {
    title: "Payments",
    paras: [
      "Oga Plug records payments that happen outside the platform, such as cash, transfer or POS. Unless we state otherwise for a specific feature, we do not hold, move or guarantee your money. Disputes between you and your customers or suppliers are between you and them.",
    ],
  },
  {
    title: "Linked businesses and marketplace",
    paras: [
      "When you link with suppliers or buyers, or use the marketplace, you agree that relevant transaction details will be visible to them. You are responsible for the accuracy of your listings, prices and invoices, and for honouring accepted invoices.",
    ],
  },
  {
    title: "Your content",
    paras: [
      "You keep ownership of the records, photos and messages you submit. You give us a limited licence to host, process and analyse them to provide and improve the service, and to create anonymised insights.",
    ],
  },
  {
    title: "Our property",
    paras: [
      "Oga Plug, its software, design, name and logo belong to MecurixTech. These terms give you a right to use the service, not to own any part of it.",
    ],
  },
  {
    title: "Availability",
    paras: [
      "We work to keep Oga Plug running but cannot promise uninterrupted service. Features depend on third parties such as WhatsApp and mobile networks. We may update, change or retire features with reasonable notice.",
    ],
  },
  {
    title: "Suspension and ending",
    paras: [
      "We may suspend or end accounts that break these terms or the law. You may stop using Oga Plug and close your account at any time.",
    ],
  },
  {
    title: "Changes",
    paras: ["We may update these terms and will notify you. Continued use means you accept the changes."],
  },
];

export function TermsOfUsePage() {
  return (
    <LegalPage
      badge="Legal"
      title="Terms of Use"
      lede="These Terms of Use govern how you access and use Oga Plug, including our WhatsApp number, web app, USSD service and any related tools. By using Oga Plug you agree to them."
      sections={SECTIONS}
      contactEmail={CONTACT.legal}
    />
  );
}

export default TermsOfUsePage;
