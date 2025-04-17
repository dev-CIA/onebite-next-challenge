import MovieItemSkeleton from "./movie-item-skeleton";
import style from "./movie-list-skeleton.module.css";

export default function MovieListSkeleton({
  col,
  row = 1,
}: {
  col: number;
  row?: number;
}) {
  return (
    <div
      className={style.container}
      style={{ "--grid-col": col } as React.CSSProperties}
    >
      {Array.from({ length: col * row }, (_, idx) => (
        <MovieItemSkeleton key={`movie-item-skeleton-${idx}`} />
      ))}
    </div>
  );
}
