import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Inner Circle | Ishaan Live",
  description: "Join the most exclusive life & relationship community on WhatsApp.",
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
