import style from "./[id].module.css";
import fetchOneMovie from "@/lib/fetch-one-movie";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) return { notFound: true };

  return { props: { movie } };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>ONEBITE CINEMA</title>
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
        <div>Loading...</div>;
      </>
    );
  }
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
    <>
      <Head>
        <title>{`${title} | ONEBITE CINEMA`}</title>
        <meta name="description" content={`${title} - ${description}`} />
        <meta property="og:title" content={`${title} | ONEBITE CINEMA`} />
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:description" content={description} />
      </Head>
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
    </>
  );
}
