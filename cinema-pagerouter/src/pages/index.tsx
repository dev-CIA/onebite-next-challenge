import SearchbarLayout from "@/components/searchbar-layout";
import { ReactNode } from "react";
import movies from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";
import style from "./index.module.css";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recommend}>
          {movies.slice(0, 3).map((movie: MovieData) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.all}>
          {movies.map((movie: MovieData) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
};
