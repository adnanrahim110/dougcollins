import BookDetailContent from "@/components/book-detail/BookDetailContent";
import { getBookById } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = getBookById(id);

  if (!book) {
    return { title: "Book Not Found | Doug Collins" };
  }

  return {
    title: `${book.title} | Doug Collins`,
    description: book.description || book.synopsis,
  };
}

export default function BookDetailPage({ params }) {
  return <BookDetailContent params={params} />;
}
