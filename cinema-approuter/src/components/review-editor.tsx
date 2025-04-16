import style from "./review-editor.module.css";
import { createReviewAction } from "@/app/actions/create-review.action";

export function ReviewEditor({ movieId }: { movieId: string }) {
  return (
    <section className={style.form_container}>
      <form action={createReviewAction}>
        <input name="movieId" value={movieId} hidden readOnly />
        <textarea
          name="content"
          placeholder="리뷰 내용을 입력해주세요."
          required
        />
        <div className={style.submit_container}>
          <input name="author" placeholder="작성자" required />
          <button type="submit">리뷰 등록</button>
        </div>
      </form>
    </section>
  );
}
