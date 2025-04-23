import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";
import { Suspense } from "react";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;

  return {
    title: `${q} : 한입시네마 검색`,
    description: `${q}에 대한 검색 결과입니다.`,
    openGraph: {
      title: `${q} : 한입시네마 검색`,
      description: `${q}에 대한 검색 결과입니다.`,
      images: ["/thumbnail.png"],
    },
  };
}

async function SearchResult({ q }: { q: string }) {
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
    <Suspense key={q || ""} fallback={<MovieListSkeleton col={3} row={2} />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
