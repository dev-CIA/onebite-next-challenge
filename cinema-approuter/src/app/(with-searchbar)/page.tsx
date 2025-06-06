import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";
import { Metadata } from "next";

async function AllMovies() {
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

export const metadata: Metadata = {
  title: "한입 시네마",
  description: "한입 북스에 등록된 도서를 만나보세요.",
  openGraph: {
    title: "한입 북스",
    description: "한입 북스에 등록된 도서를 만나보세요.",
    images: ["/thumbnail.png"],
  },
};

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <RecommendMovies />
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <AllMovies />
      </section>
    </div>
  );
}
