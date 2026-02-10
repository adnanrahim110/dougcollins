import BooksContent from "@/components/books/BooksContent";

export const metadata = {
  title: "Books — Doug Collins",
  description:
    "Explore the complete collection of speculative fiction by Doug Collins. From quantum thrillers to philosophical sci-fi — browse by series, genre, or discover your next read.",
  openGraph: {
    title: "Books — Doug Collins",
    description:
      "Explore the complete collection of speculative fiction by Doug Collins.",
  },
};

export default function BooksPage() {
  return <BooksContent />;
}
