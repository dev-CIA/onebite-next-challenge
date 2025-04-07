import MovieItem from "@/components/movie-item";
import SearchbarLayout from "@/components/searchbar-layout";
import { ReactNode } from "react";
import style from "./index.module.css";
import fetchMovies from "@/lib/fetch-movies";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q as string;
  const movies = await fetchMovies(q);

  return { props: { movies } };
};
export default function Page({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
