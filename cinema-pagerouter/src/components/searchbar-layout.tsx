import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "./searchbar-layout.module.css";

export default function SearchbarLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { q } = router.query;

  useEffect(() => {
    setSearch((q as string) || "");
  }, [q]);

  const [search, setSearch] = useState("");
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSubmit();
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <div className={style.searchbar}>
        <input
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력하세요..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
