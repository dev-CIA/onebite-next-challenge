"use client";

import { useParams } from "next/navigation";
import style from "./page.module.css";
import movies from "@/mock/dummy.json";
import { MovieData } from "@/types";

export default function Page() {
  const params = useParams();
  const { id } = params;

  const movie = movies.find((movie: MovieData) => movie.id === Number(id));

  if (!movie) return <div>문제가 발생했습니다. 다시 시도해주세요</div>;

  const {
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.info}>
        <div>
          {releaseDate} | {genres} | {runtime}분
        </div>
        <div>{company}</div>
      </div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
