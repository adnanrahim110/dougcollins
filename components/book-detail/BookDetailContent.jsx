"use client";

import BookDetailHero from "@/components/book-detail/BookDetailHero";
import BookDetailRelated from "@/components/book-detail/BookDetailRelated";
import BookDetailReviews from "@/components/book-detail/BookDetailReviews";
import BookDetailSynopsis from "@/components/book-detail/BookDetailSynopsis";
import { getBookById, getBooksBySeries } from "@/lib/data";
import { getReviewsByBook } from "@/lib/reviews";
import { notFound } from "next/navigation";
import { use } from "react";
import ContactSection from "../home/ContactSection";

export default function BookDetailContent({ params }) {
  const { id } = use(params);
  const book = getBookById(id);

  if (!book) return notFound();

  const bookReviews = getReviewsByBook(book.id);
  const relatedBooks = getBooksBySeries(book.series).filter(
    (b) => b.id !== book.id,
  );

  return (
    <>
      <BookDetailHero book={book} />
      <BookDetailSynopsis book={book} />
      <BookDetailReviews reviews={bookReviews} />
      <BookDetailRelated books={relatedBooks} seriesName={book.series} />
      <ContactSection tone="light" />
    </>
  );
}
