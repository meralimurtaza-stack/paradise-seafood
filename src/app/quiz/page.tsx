import type { Metadata } from "next";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Seafood Quiz — How Well Do You Know Your Seafood? | Paradise Seafood",
  description:
    "Think you know seafood? Take our 10-question quiz in 90 seconds. Are you an Executive Chef or a Kitchen Porter? Challenge your kitchen team!",
  openGraph: {
    title: "How Well Do You Know Your Seafood?",
    description:
      "10 questions. 90 seconds. Are you an Executive Chef or a Kitchen Porter? Take the quiz!",
  },
};

export default function QuizPage() {
  return <QuizClient />;
}
