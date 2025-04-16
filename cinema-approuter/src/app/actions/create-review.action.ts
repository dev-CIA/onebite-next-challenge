"use server";

import { revalidateTag } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!movieId || !content || !author)
    throw new Error("모든 필드를 입력해주세요.");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({
          movieId,
          content,
          author,
        }),
      }
    );

    console.log(response.status);

    revalidateTag(`review-${movieId}`);
  } catch (error) {
    console.error("Error creating review:", error);
    return;
  }
}
