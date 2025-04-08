import MovieItem from "@/components/movie-item";
import SearchbarLayout from "@/components/searchbar-layout";
import { ReactNode, useEffect, useState } from "react";
import style from "./index.module.css";
import fetchMovies from "@/lib/fetch-movies";
import { MovieData } from "@/types";
import { useRouter } from "next/router";
import Head from "next/head";

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
      <Head>
        <title>검색결과 | ONEBITE CINEMA</title>
        <meta
          name="description"
          content="ONEBITE CINEMA의 다양한 영화를 만나보세요."
        />
        <meta property="og:title" content="ONEBITE CINEMA" />
        <meta property="og:image" content="/thumbnail.png" />
        <meta
          property="og:description"
          content="ONEBITE CINEMA의 다양한 영화를 만나보세요."
        />
      </Head>
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
