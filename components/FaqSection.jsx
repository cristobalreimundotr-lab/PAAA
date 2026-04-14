"use client";

import { useState } from "react";
import styles from "./FaqSection.module.css";

export default function FaqSection({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.badge}>Ayuda</div>
        <h2 className={styles.title}>
          Preguntas <em>frecuentes</em>
        </h2>
      </div>

      <div className={styles.list}>
        {items.map((item, index) => {
          const open = index === openIndex;
          return (
            <div key={item.number} className={`${styles.item} ${open ? styles.itemOpen : ""}`}>
              <button className={styles.question} type="button" onClick={() => setOpenIndex(open ? -1 : index)}>
                <span className={`${styles.num} ${open ? styles.numOpen : ""}`}>{item.number}</span>
                <span className={`${styles.questionText} ${open ? styles.questionTextOpen : ""}`}>{item.question}</span>
                <span className={`${styles.icon} ${open ? styles.iconOpen : ""}`}>
                  <svg viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              <div className={`${styles.body} ${open ? styles.bodyOpen : ""}`}>
                <div className={styles.bodyInner}>{item.answer}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
