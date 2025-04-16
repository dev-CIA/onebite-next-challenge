import { ReviewData } from "@/types";
import style from "./review-item.module.css";

export default function ReviewItem({ author, createdAt, content }: ReviewData) {
  return (
    <div className={style.container}>
      <div className={style.top_container}>
        <div className={style.author}>{author}</div>
        <div className={style.created_at}>
          {new Date(createdAt).toLocaleDateString()}일 작성됨
        </div>
      </div>
      <div>{content}</div>
      <div className={style.delete_btn}>리뷰 삭제하기</div>
    </div>
  );
}
