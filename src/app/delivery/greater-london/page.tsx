import type { Metadata } from "next";
import DeliveryAreaPage from "@/components/DeliveryAreaPage";

export const metadata: Metadata = {
  title: "Greater London Seafood Delivery | Paradise Seafood",
  description:
    "Comprehensive fresh and frozen seafood delivery across Greater London. Monday to Saturday. Full product range from London's premium seafood supplier, Paradise Seafood.",
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

export default function GreaterLondonPage() {
  return (
    <DeliveryAreaPage
      title="Greater London"
      badge="CORE"
      description="Comprehensive coverage across Greater London. Monday to Saturday delivery. Full product range."
      details={[
        { icon: <CalendarIcon />, label: "Schedule", value: "Monday — Saturday" },
        { icon: <MapPinIcon />, label: "Coverage", value: "All London postcodes" },
        { icon: <ClockIcon />, label: "Cutoff", value: "Order by 2pm for next day" },
      ]}
      features={[
        "Full fresh fish range — whole, fillets, loins, supremes",
        "Frozen seafood and shellfish",
        "Smoked fish and deli products",
        "Temperature-controlled vehicles",
        "No minimum order requirement",
        "Reliable six-day-a-week service",
      ]}
      whatsappMessage="Hi Paradise Seafood, I'd like to enquire about delivery to Greater London."
    />
  );
}
