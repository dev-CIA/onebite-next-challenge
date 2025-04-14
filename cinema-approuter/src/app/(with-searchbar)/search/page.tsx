"use client";

import { useSearchParams } from "next/navigation";
import style from "./page.module.css";
import movies from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";

export default function Page() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const results = movies.filter((movie: MovieData) => {
    return movie.title.includes(q as string);
  });

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
