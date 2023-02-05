import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const navigate = useNavigate();
  const [data, setData] = useState([
    { name: "kale", location: "montana", date: "today" },
    { name: "james", location: "lexington", date: "today" },
    { name: "john", location: "cali", date: "today" },
    { name: "jake", location: "gflorida", date: "today" },
    { name: "ash", location: "utah", date: "today" },
    { name: "kam", location: "mexico", date: "today" },
  ]);
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = data.filter((value) => {
        console.log(value.location.toLowerCase().includes(searchWord.toLowerCase()))
      return value.location.toLowerCase().includes(searchWord.toLowerCase());
    });
    
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className={styles.search}>
      <div className={styles.searchInput}>
        <input
          type="text"
          onChange={(event) => {
            handleFilter(event);
          }}
        />
        <div className={styles.searchIcon}></div>
      </div>
      {filteredData.length !== 0 && (
        <div className={styles.dataResult}>
          {filteredData.slice(0, 15).map((item, index) => {
            return (
              <a className={styles.dataItem}>
                <p>{item.location}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
