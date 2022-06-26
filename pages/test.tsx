import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>

    <img 
        src="http://localhost:3000/api/v1/raz"
        width={200} height={200}    
    />

    </div>
  );
};

export default Home;
