import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";
import { Suspense } from "react";
import delay from "../utils/delay";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";

async function AllMovies() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/movie`,
    { cache: "force-cache" }
  );
  if (!response.ok) return <div>오류가 발생했습니다.</div>;

  const movies: MovieData[] = await response.json();

  return (
    <div className={style.all}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

async function RecommendMovies() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/movie/random`,
    { next: { revalidate: 60 } }
  );
  if (!response.ok) return <div>오류가 발생했습니다.</div>;

  const recommendMovies: MovieData[] = await response.json();

  return (
    <div className={style.recommend}>
      {recommendMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <Suspense fallback={<MovieListSkeleton col={3} />}>
          <RecommendMovies />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <Suspense fallback={<MovieListSkeleton col={5} row={2} />}>
          <AllMovies />
        </Suspense>
      </section>
    </div>
  );
}
