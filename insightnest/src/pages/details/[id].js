import { read, utils } from 'xlsx';
import { NextSeo } from 'next-seo';
import styles from '../../styles/Home.module.css';
import fs from 'fs';
import path from 'path';

export default function Details({ item }) {
  return (
    <div className={styles.container}>
      <NextSeo
        title={item.title}
        description={item.description}
      />
      <header className={styles.header}>
        <h1>{item.title}</h1>
      </header>
      <main className={styles.main}>
        <p>{item.description}</p>
        <p className={styles.tags}>Tags: {item.tags}</p>
        <a href={item.reference} className={styles.referenceLink}>
          Reference
        </a>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  // Load Excel file and parse data
  const filePath = path.resolve('./public/data', 'data.xlsx');
  
  // Read the Excel file from the file system
  const fileBuffer = fs.readFileSync(filePath);

  // Parse the Excel data
  const workbook = read(fileBuffer, { type: 'buffer' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = utils.sheet_to_json(worksheet);

  // Create paths for each item
  const paths = jsonData.map((_, index) => ({
    params: { id: index.toString() },
  }));

  return { paths, fallback: false };
}


export async function getStaticProps({ params }) {
  // Load Excel file and parse data
  const filePath = path.resolve('./public/data', 'data.xlsx');
  
  // Read the Excel file from the file system
  const fileBuffer = fs.readFileSync(filePath);

  // Parse the Excel data
  const workbook = read(fileBuffer, { type: 'buffer' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = utils.sheet_to_json(worksheet);
  const item = jsonData[parseInt(params.id)];

  return {
    props: {
      item,
    },
  };
}
