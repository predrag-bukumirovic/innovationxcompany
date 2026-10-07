import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/footer/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { Collection } from "@/components/sections/Collection";
import { Custom } from "@/components/sections/Custom";
import { Hero } from "@/components/sections/Hero";
import { StyleComfort } from "@/components/sections/StyleComfort";
import { TopProducts } from "@/components/sections/TopProducts";
import { Trending } from "@/components/sections/Trending";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <main>
        <Hero />
        <Collection />
        <div className={styles.creamPanel}>
          <TopProducts />
          <StyleComfort />
        </div>
        <Trending />
        <Custom />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
