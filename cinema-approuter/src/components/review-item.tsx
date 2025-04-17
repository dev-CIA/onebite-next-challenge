import { ReviewData } from "@/types";
import style from "./review-item.module.css";
import ReviewDeleteButton from "./review-delete-button";

export default function ReviewItem({
  id,
  author,
  content,
  createdAt,
  movieId,
}: ReviewData) {
  return (
    <div className={style.container}>
      <div className={style.top_container}>
        <div className={style.author}>{author}</div>
        <div className={style.created_at}>
          {new Date(createdAt).toLocaleDateString()}일 작성됨
        </div>
      </div>
      <div>{content}</div>
      <div className={style.delete_btn}>
        <ReviewDeleteButton reviewId={id} movieId={movieId} />
      </div>
    </div>
  );
}
