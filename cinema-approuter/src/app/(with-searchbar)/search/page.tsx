import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/movie/search?q=${searchParams.q}`,
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
