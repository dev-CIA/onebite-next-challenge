import MovieItem from "@/components/movie-item";
import SearchbarLayout from "@/components/searchbar-layout";
import { ReactNode, useEffect, useState } from "react";
import style from "./index.module.css";
import fetchMovies from "@/lib/fetch-movies";
import { MovieData } from "@/types";
import { useRouter } from "next/router";

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);

  const router = useRouter();
  const { q } = router.query;

  const fetchSearchMovie = async () => {
    const data = await fetchMovies(q as string);
    setMovies(data);
  };

  useEffect(() => {
    fetchSearchMovie();
  }, [q]);

  return (
    <>
      {movies.length !== 0 ? (
        <div className={style.container}>
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
};
