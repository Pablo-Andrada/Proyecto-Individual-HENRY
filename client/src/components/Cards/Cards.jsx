import React from "react"
import Card from "../Card/Card"

import style from "./Cards.module.css"

const Cards = ({countries}) => {
    return(
        <div className={style.container}>
            {countries.map((country) => {
            return(
                <Card 
                    name={country.name}
                    flags={country.flags}
                    continents={country.continents}
                    key={country.id}
                    id={country.id}
                />
            )})}
        </div>
    )
}

export default Cards;