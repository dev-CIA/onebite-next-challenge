import { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-item.module.css";
import Image from "next/image";

export default function MovieItem({ id, title, posterImgUrl }: MovieData) {
  return (
    <Link href={`/movie/${id}`} className={style.container}>
      <div>
        <Image
          src={posterImgUrl}
          fill
          sizes="156px"
          alt={`영화 ${title} 포스터 이미지`}
        />
      </div>
    </Link>
  );
}
