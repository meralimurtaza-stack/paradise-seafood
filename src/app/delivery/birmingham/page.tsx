import type { Metadata } from "next";
import DeliveryAreaPage from "@/components/DeliveryAreaPage";

export const metadata: Metadata = {
  title: "Birmingham Seafood Delivery | Paradise Seafood",
  description:
    "Fresh and frozen seafood delivered to Birmingham. Tuesday, Thursday, and Saturday delivery. Same premium quality trusted by London's top restaurants. Paradise Seafood — Birmingham seafood supplier.",
};

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default function BirminghamPage() {
  return (
    <DeliveryAreaPage
      title="Birmingham"
      badge="NEW"
      badgeColor="bg-brand-teal/15 text-brand-teal"
      description="Now delivering fresh and frozen seafood to Birmingham. Tuesday, Thursday, and Saturday. Same premium quality trusted by London's top restaurants."
      details={[
        { icon: <CalendarIcon />, label: "Schedule", value: "Tuesday, Thursday, Saturday" },
        { icon: <MapPinIcon />, label: "Coverage", value: "B postcodes & surrounding" },
        { icon: <ClockIcon />, label: "Cutoff", value: "Order by 12pm day before" },
      ]}
      features={[
        "Full fresh fish range — whole, fillets, loins, supremes",
        "Frozen seafood and shellfish",
        "Smoked fish and deli products",
        "Temperature-controlled vehicles",
        "Same quality and selection as London",
        "Expanding coverage to surrounding areas",
      ]}
      whatsappMessage="Hi Paradise Seafood, I would like to enquire about delivery to Birmingham."
    />
  );
}
