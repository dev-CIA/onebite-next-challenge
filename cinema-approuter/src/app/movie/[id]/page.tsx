import { ReviewEditor } from "@/components/review-editor";
import style from "./page.module.css";
import { MovieData, ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import Image from "next/image";
import { Metadata } from "next";

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/movie/${id}`,
    { cache: "force-cache" }
  );

  if (!response.ok) throw new Error(response.statusText);

  const movie: MovieData = await response.json();

  return {
    title: `${movie.title} - 한입시네마`,
    description: `${movie.description}`,
    openGraph: {
      title: `${movie.title} - 한입시네마`,
      description: `${movie.description}`,
      images: [movie.posterImgUrl],
    },
  };
}

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/movie`,
    { cache: "force-cache" }
  );
  if (!response.ok) return [];

  const movies: MovieData[] = await response.json();

  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

async function MovieDetail({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/movie/${movieId}`,
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
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <Image
          src={posterImgUrl}
          alt={`영화 ${title}의 포스터 이미지`}
          width={245}
          height={350}
        />
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
    </section>
  );
}

async function ReviewList({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/review/movie/${movieId}`,
    { next: { tags: [`review-${movieId}`] } }
  );
  if (!response.ok)
    throw new Error(`Review fetch failed: ${response.statusText}`);

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <MovieDetail movieId={id} />
      <ReviewEditor movieId={id} />
      <ReviewList movieId={id} />
    </div>
  );
}
