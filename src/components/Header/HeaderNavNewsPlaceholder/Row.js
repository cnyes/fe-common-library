import React from 'react';
import styles from './Row.scss';

const Row = () => {
  return (
    <div className={styles['multi-row']}>
      <article className={styles['news-row-placeholder']}>
        <div className={styles.wrapper} />
      </article>
      <article className={styles['news-row-placeholder']}>
        <div className={styles.wrapper} />
      </article>
      <article className={styles['news-row-placeholder']}>
        <div className={styles.wrapper} />
      </article>
    </div>
  );
};

export default Row;
