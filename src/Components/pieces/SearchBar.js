import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = props.trips.filter((value) => {
      return value.triplocation
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const changeFormat = (isoDate) => {
    const regularDate = new Date(isoDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    return regularDate;
  };

  return (
    <div className={styles.search}>
      <div className={styles.searchInput}>
        <input
          type="text"
          onChange={(event) => {
            handleFilter(event);
          }}
          placeholder="Search"
          className={styles.input}
        />
        <div className={styles.searchIcon}></div>
      </div>
      {filteredData.length !== 0 && (
       
        <div className={`${styles.dataResult}`}>
          {filteredData.slice(0, 15).map((item, index) => {
            return (
              <a
                onClick={() => {
                  navigate("/trip/:id");
                }}
                className={styles.dataItem}
              >
                <p className={styles.location}>{item.triplocation}</p>
                <div className={styles.dateContainer}>
                  <p className={styles.date}>
                    {changeFormat(item.tripstartdate)}
                  </p>
                  <div>-</div>
                  <p className={styles.date}>
                    {changeFormat(item.tripenddate)}
                  </p>
                </div>
              </a>
            );
          })}
          
        </div>
        
      )}
    </div>
  );
}
