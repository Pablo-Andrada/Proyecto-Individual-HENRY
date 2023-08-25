import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = (props) => {
  return (
    <Link to={`/detail/${props.id}`} className={style.a}>
      <div className={style.card}>
        <img src={props.flags} alt={props.name} className={style.image} />
        <div className={style.textBox}>
          <h1 className={style.name}>{props.name}</h1>
          <p className={style.continents}>{props.continents}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;