import Modal from "@/components/modal";
import MoviePage from "@/app/movie/[id]/page";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page(props: any) {
  return (
    <Modal>
      <MoviePage {...props} />
    </Modal>
  );
}
