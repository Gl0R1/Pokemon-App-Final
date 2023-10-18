const url = "https://pokeapi.co/api/v2/pokemon/"

const searchPokemon = async () => {
  const response = await fetch(url)
  const data = await response.json();

  return data.results
}
