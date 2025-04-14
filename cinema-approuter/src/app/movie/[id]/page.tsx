import style from "./page.module.css";

import { MovieData } from "@/types";

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/movie/${params.id}`,
    { cache: "force-cache" }
  );
  if (!response.ok) return <div>오류가 발생했습니다.</div>;

  const movie: MovieData = await response.json();

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
