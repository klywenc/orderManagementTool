import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <div className={styles.ctas}>
              <h1 className="text-3xl font-bold underline">
                  Hello world!
              </h1>
          </div>
      </main>
    </div>
  );
}
