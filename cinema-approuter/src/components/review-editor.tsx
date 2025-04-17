"use client";

import { useActionState, useEffect } from "react";
import style from "./review-editor.module.css";
import { createReviewAction } from "@/app/actions/create-review.action";

export function ReviewEditor({ movieId }: { movieId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) alert(state.error);
  }, [state]);

  return (
    <section className={style.form_container}>
      <form action={formAction}>
        <input name="movieId" value={movieId} hidden readOnly />
        <textarea
          name="content"
          placeholder="리뷰 내용을 입력해주세요."
          required
          disabled={isPending}
        />
        <div className={style.submit_container}>
          <input
            name="author"
            placeholder="작성자"
            required
            disabled={isPending}
          />
          {isPending ? (
            <div>...</div>
          ) : (
            <button type="submit" disabled={isPending}>
              리뷰 등록
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
