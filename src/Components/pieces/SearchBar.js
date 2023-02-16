import { HideImage } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [hidden, setHidden] = useState("hide");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = props.trips.filter((value) => {
      return value.triplocation
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
      setHidden("hide");
    } else {
      setFilteredData(newFilter);
      setHidden("");
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
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setIsDropdownOpen(false)}
        />
        <div className={styles.searchIcon}></div>
      </div>

      <div className={styles.dataContainer}>
        <div className={`${styles.dataResult} ${!hidden && styles.show}`}>
          {filteredData.slice(0, 15).map((item, index) => {
            return (
              <a
                onClick={() => {
                  navigate("/trip/:id");
                }}
                className={styles.dataItem}
              >
                <p className={styles.location}>
                  {item.tripstate}, {item.triplocation}
                </p>
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
      </div>
    </div>
  );
}
