"use client";

import BooksCTA from "@/components/books/BooksCTA";
import BooksFilter from "@/components/books/BooksFilter";
import BooksGrid from "@/components/books/BooksGrid";
import BooksHero from "@/components/books/BooksHero";
import BooksSeries from "@/components/books/BooksSeries";
import { books, series } from "@/lib/data";
import { useMemo, useState } from "react";

export default function BooksContent() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [selectedSeries, setSelectedSeries] = useState("all");

  const seriesOptions = useMemo(
    () => [
      { label: "All Series", value: "all" },
      ...series.map((s) => ({ label: s.name, value: s.name })),
    ],
    [],
  );

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchSearch =
        !search ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.description.toLowerCase().includes(search.toLowerCase());
      const matchSeries =
        selectedSeries === "all" || b.series === selectedSeries;
      return matchSearch && matchSeries;
    });
  }, [search, selectedSeries]);

  return (
    <>
      <BooksHero />
      <BooksFilter
        search={search}
        setSearch={setSearch}
        view={view}
        setView={setView}
        selectedSeries={selectedSeries}
        setSelectedSeries={setSelectedSeries}
        seriesOptions={seriesOptions}
        resultCount={filtered.length}
      />
      <BooksGrid books={filtered} view={view} />
      <BooksSeries />
      <BooksCTA />
    </>
  );
}
