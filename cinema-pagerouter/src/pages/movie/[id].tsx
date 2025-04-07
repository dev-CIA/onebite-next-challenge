import { useRouter } from "next/router";
import style from "./[id].module.css";
import movies from "@/mock/dummy.json";
import { MovieData } from "@/types";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const {
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl,
  } = movies.find((movie: MovieData) => movie.id === Number(id)) || {};

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
