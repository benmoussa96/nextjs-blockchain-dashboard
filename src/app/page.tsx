import Component from '@/components/component';
import styles from './page.module.css';

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);
  return (
    <main className={styles.main}>
      <Component />
    </main>
  );
}
