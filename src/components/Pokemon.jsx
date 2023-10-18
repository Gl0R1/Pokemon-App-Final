

import { useEffect, useState } from 'react'


const Pokemon = () => {
  const [pokemon, setPokemon] = useState ([])
  buscarPokemons()
  useEffect(() => {
    buscarPokemons().then((data) => {
      setPokemon(data)})
  
  },[]);

  console.log(pokemon)
  return (
    <div>
      {pokemon.map((poke) => (
      <p>{poke.name}</p>
      ))}
    </div>

  )
}

export default Pokemon
