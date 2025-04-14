import Link from "next/link";
import style from "./header.module.css";

export default function Header() {
  return (
    <header className={style.container}>
      <Link href={"/"}>ONEBITE CINEMA</Link>
    </header>
  );
}
