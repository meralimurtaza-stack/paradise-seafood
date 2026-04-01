import ScrollReveal, { StaggerItem } from "./ScrollReveal";

const REVIEWS = [
  {
    text: "The consistency of the sea bass we receive is unparalleled. In a high-volume Michelin kitchen, we need partners who understand that precision is non-negotiable. Paradise Seafood is that partner.",
    role: "Executive Chef",
    location: "Mayfair Fine Dining",
  },
  {
    text: "Finding a wholesaler that can scale for match-day hospitality while maintaining artisan quality is rare. Their logistics team is the best in the business.",
    role: "Head of Catering",
    location: "Premier League Training Ground",
  },
];

export default function Reviews() {
  return (
    <section className="bg-surface-container-highest py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <ScrollReveal className="text-center mb-20">
          <span className="text-primary font-label tracking-[0.2em] uppercase text-xs">Testimonials</span>
          <h2 className="text-5xl font-headline mt-4 italic">What our customers say</h2>
        </ScrollReveal>
        <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {REVIEWS.map((review, i) => (
            <StaggerItem key={i} className="space-y-6">
              <div className="text-primary text-4xl font-serif">&ldquo;</div>
              <p className="text-xl font-headline italic leading-relaxed text-on-surface">
                &ldquo;{review.text}&rdquo;
              </p>
              <div>
                <p className="font-bold uppercase text-xs tracking-widest">{review.role}</p>
                <p className="text-outline text-xs">{review.location}</p>
              </div>
            </StaggerItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
