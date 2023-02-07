import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = props.trips.filter((value) => {
       
      return value.triplocation.toLowerCase().includes(searchWord.toLowerCase());
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
              <a onClick={() => {navigate("/trip/:id")}}  className={styles.dataItem}>
                <p  >{item.triplocation}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
