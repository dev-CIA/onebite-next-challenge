import MovieItem from "@/components/movie-item";
import SearchbarLayout from "@/components/searchbar-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import style from "./index.module.css";
import movies from "@/mock/dummy.json";
import { MovieData } from "@/types";

export default function Page() {
  const router = useRouter();
  const q = router.query.q as string;

  const results = movies.filter((movie: MovieData) =>
    new RegExp(q, "i").test(movie.title)
  );

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

Page.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
};
