import type { Metadata } from "next";
import DeliveryAreaPage from "@/components/DeliveryAreaPage";

export const metadata: Metadata = {
  title: "Central London Seafood Delivery | Paradise Seafood",
  description:
    "Same day and next day fresh and frozen seafood delivery across Central London. Monday to Saturday. EC, WC, W, SW, SE, E, N, NW postcodes. Paradise Seafood — London's premium seafood supplier.",
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

export default function CentralLondonPage() {
  return (
    <DeliveryAreaPage
      title="Central London"
      badge="CORE"
      description="Same day and next day delivery across Central London. Monday to Saturday. Full fresh and frozen range available."
      details={[
        { icon: <CalendarIcon />, label: "Schedule", value: "Monday — Saturday" },
        { icon: <MapPinIcon />, label: "Postcodes", value: "EC, WC, W, SW, SE, E, N, NW" },
        { icon: <ClockIcon />, label: "Cutoff", value: "Order by 2pm for next day" },
      ]}
      features={[
        "Full fresh fish range — whole, fillets, loins, supremes",
        "Frozen seafood and shellfish",
        "Smoked fish and deli products",
        "Temperature-controlled vehicles",
        "No minimum order requirement",
        "Same day delivery available on request",
      ]}
      whatsappMessage="Hi Paradise Seafood, I'd like to enquire about delivery to Central London."
    />
  );
}
