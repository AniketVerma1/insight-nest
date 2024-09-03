import { useState } from 'react';
import { read, utils } from 'xlsx';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import path from 'path';
import fs from 'fs';

export default function Home({ initialData }) {
  const [data, setData] = useState(initialData);

  console.log("initialData",initialData);

  return (
    <div className={styles.container}>
      <NextSeo
        title="SEO Friendly Insight Nest"
        description="Your go-to platform for insightful knowledge and tips."
        canonical="https://www.yourwebsite.com/"
        openGraph={{
          url: 'https://www.yourwebsite.com/',
          title: 'SEO Friendly Insight Nest',
          description: 'Your go-to platform for insightful knowledge and tips.',
        }}
      />
      <header className={styles.header}>
        <h1>Insight Nest</h1>
      </header>
      <main className={styles.main}>
        {data.map((item, index) => (
          <div key={index} className={styles.card}>
            <h2>{item.title}</h2>
            <p>{item.description.slice(0, 100)}...</p>
            <Link href={`/details/${index}`} className={styles.readMore}>
              Read More
            </Link>
            <p className={styles.tags}>Tags: {item.tags}</p>
            <a href={item.reference} className={styles.referenceLink}>
              Reference
            </a>
          </div>
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  // Load Excel file and parse data
  const filePath = path.resolve('./public/data', 'data.xlsx');

  // Read the Excel file from the file system
  const fileBuffer = fs.readFileSync(filePath);

  // Parse the Excel data
  const workbook = read(fileBuffer, { type: 'buffer' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = utils.sheet_to_json(worksheet);

  return {
    props: {
      initialData: jsonData,
    },
  };
}
