import type { Metadata } from "next";
import DeliveryAreaPage from "@/components/DeliveryAreaPage";

export const metadata: Metadata = {
  title: "Seafood Delivery Outside M25 | Paradise Seafood",
  description:
    "We're expanding our fresh and frozen seafood delivery beyond the M25. Contact Paradise Seafood to check if we deliver to your area. Premium quality seafood supplier.",
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

function PhoneCallIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function OutsideM25Page() {
  return (
    <DeliveryAreaPage
      title="Outside M25"
      badge="EXPANDING"
      badgeColor="bg-white/10 text-brand-cream"
      description="We're expanding our delivery coverage beyond the M25. Contact us to check if we deliver to your area."
      details={[
        { icon: <CalendarIcon />, label: "Schedule", value: "Varies by location" },
        { icon: <MapPinIcon />, label: "Coverage", value: "Selected routes beyond M25" },
        { icon: <PhoneCallIcon />, label: "Enquiries", value: "Call or WhatsApp us" },
      ]}
      features={[
        "Fresh fish available on selected routes",
        "Full frozen range available to all areas",
        "Smoked fish and deli products",
        "Temperature-controlled vehicles",
        "Growing route network — new areas added regularly",
        "Contact us to check your postcode",
      ]}
      whatsappMessage="Hi Paradise Seafood, I'd like to check if you deliver to my area outside the M25."
    />
  );
}
