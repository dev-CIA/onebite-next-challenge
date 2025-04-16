import BookItemSkeleton from "./book-item-skeleton";
import style from "./book-list-skeleton.module.css";

export default function BookListSkeleton({
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
        <BookItemSkeleton key={`book-item-skeleton-${idx}`} />
      ))}
    </div>
  );
}
