import delay from "@/app/utils/delay";
import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/movie/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) return <div>오류가 발생했습니다.</div>;

  const results: MovieData[] = await response.json();

  return (
    <>
      {results.length !== 0 ? (
        <div className={style.container}>
          {results.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <Suspense key={q || ""} fallback={<BookListSkeleton col={3} row={2} />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
