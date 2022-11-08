import React from "react";
import styles from "../Styles/Pagination.module.css";

export default function Pagination({
  countriesPerPage,
  pagination,
  allCountries,
}) {
  const pageNumbers = [];

  for (let i = 0; i <= allCountries / countriesPerPage; i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav className={styles.nav}>
      <ul>
        {pageNumbers &&
          pageNumbers.map((n) => (
            <li key={n}>
              <a onClick={() => pagination(n)} className={styles.a}>
                {n}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
