"use client";

import BooksCTA from "@/components/books/BooksCTA";
import BooksFilter from "@/components/books/BooksFilter";
import BooksGrid from "@/components/books/BooksGrid";
import BooksHero from "@/components/books/BooksHero";
import BooksSeries from "@/components/books/BooksSeries";
import { books } from "@/lib/data";
import { useMemo, useState } from "react";

export default function BooksContent() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [seriesFilter, setSeriesFilter] = useState("All");
  const [view, setView] = useState("grid");

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchCategory =
        categoryFilter === "All" || b.category === categoryFilter;
      const matchSeries = seriesFilter === "All" || b.series === seriesFilter;
      const matchSearch =
        !search ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.description.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSeries && matchSearch;
    });
  }, [categoryFilter, seriesFilter, search]);

  return (
    <>
      <BooksHero />
      <BooksFilter
        search={search}
        setSearch={setSearch}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        seriesFilter={seriesFilter}
        setSeriesFilter={setSeriesFilter}
        view={view}
        setView={setView}
        resultCount={filtered.length}
      />
      <BooksGrid books={filtered} view={view} />
      <BooksSeries />
      <BooksCTA />
    </>
  );
}
