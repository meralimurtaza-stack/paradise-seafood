import type { Metadata } from "next";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Name That Seafood — Visual Quiz | Paradise Seafood",
  description:
    "Can you identify 10 seafood species from photos alone? 90 seconds on the clock. Are you an Executive Chef or a Kitchen Porter? Challenge your kitchen team!",
  openGraph: {
    title: "Name That Seafood | Paradise Seafood",
    description:
      "Can you identify 10 seafood species from photos? 90 seconds. Take the quiz!",
  },
};

export default function QuizPage() {
  return <QuizClient />;
}
