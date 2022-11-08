import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterCountriesByRegion,
  orderByName,
  orderByPopulation,
} from "../Actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";
import styles from "../Styles/Home.module.css";
import PaginationSearch from "./PaginationSearch";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  //----------------------------------Pagination----------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);
  const lastCountry = currentPage * countriesPerPage;
  const firtsCountry = lastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(firtsCountry, lastCountry);

  function pagination(pageNumber) {
    setCurrentPage(pageNumber);
  }

  //----------------------------------------Use Effect------------------------------------------------------
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleOnClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }
  //-------------------------------Seccion Input de busqueda------------------------------------------------
  const [search, setSearch] = useState("");

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const countrySearch = !search
    ? currentCountries
    : allCountries.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase())
      );

  const countrySearch2 = countrySearch.slice(firtsCountry, lastCountry);
  //------------------------------------------Filtros------------------------------------------------------------
  function handleFilterByRegion(e) {
    dispatch(filterCountriesByRegion(e.target.value));
  }
  //------------------------------------------Ordenamientos--------------------------------------------------------
  const [orden, setOrden] = useState("");

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleOrderByPopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  //------------------------------------------------------------------------------------------------------
  return (
    <>
      <div className={styles.home}>
        <h1>COUNTRIES</h1>
        <Link to="/activities" className={styles.createAct}>
          Crear Actividad
        </Link>
      </div>
      <div className={styles.inputWrapper}>
        <input
          name="text"
          placeholder="      Search Country By Name"
          type="text"
          value={search}
          onChange={searcher}
        />
      </div>
      <div className={styles.home2}>
        <select onChange={(e) => handleOrderByName(e)}>
          <option value="All">All</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select onChange={(e) => handleOrderByPopulation(e)}>
          <option value="All">All</option>
          <option value="bts">Biggers to Smallers</option>
          <option value="stb">Smallers to Biggers</option>
        </select>
        <select>
          <option value="act">Activities</option>
        </select>
        <select onChange={(e) => handleFilterByRegion(e)}>
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Antarctic">Antarctic</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Americas">America</option>
          <option value="Oceania">Oceania</option>
        </select>
        <button
          onClick={(e) => {
            handleOnClick(e);
          }}
        >
          Recargar pagina
        </button>
      </div>
      {search.length == 0 ? (
        <div>
          <Pagination
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            pagination={pagination}
          />
        </div>
      ) : (
        <div>
          <PaginationSearch
            countriesPerPage={countriesPerPage}
            allCountries={countrySearch.length}
            pagination={pagination}
          />
        </div>
      )}
      {search.length
        ? countrySearch2.map((c) => {
            return (
              <div>
                <div>
                  <Card
                    name={c.name}
                    flag={c.flag}
                    region={c.region}
                    population={c.population}
                    area={c.area}
                    id={c.id}
                  />
                </div>
              </div>
            );
          })
        : currentCountries &&
          currentCountries.map((c) => {
            return (
              <div>
                <div>
                  <Card
                    name={c.name}
                    flag={c.flag}
                    region={c.region}
                    population={c.population}
                    area={c.area}
                    id={c.id}
                  />
                </div>
              </div>
            );
          })}
    </>
  );
}
