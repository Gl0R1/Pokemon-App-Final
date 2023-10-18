import Button from "./components/Button";
import { Cards } from "./components/Cards";
import "./sass/App.scss";
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";
import { useEffect, useState } from "react";

function App() {
  const [pokemonId, setPokemonId] = useState(1);
  //creo una nueva variable de estado para poder utilizar la data de la funcion async
  const [pokemonEvoluciones, setPokemonEvoluciones] = useState([]);
  //creo una variable de estado para poder sacarlo de la funcion async

  function lastClick() {
    pokemonId === 1 ? setPokemonId(1) : setPokemonId(pokemonId - 1);
  }

  function nextClick() {
    setPokemonId(pokemonId + 1);
  }
  //aqui vamos a consumir una API con .then o con el async await(es una forma simplificada donde podemos usar las promesas, con las promesas hacemos peticiones a una http de un servidor y conseguimos informacion),
  useEffect(() => {
    //llamo a esta funcion para actualizarlo
    getPokemonName(pokemonId);
    //console.log("desde el useEffect");
    //paso pokemonId en el array para que el useEffect se actualice una sola vez
  }, [pokemonId]);

  async function getPokemonName(id) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain/${id}/`
    );
    const data = await response.json();
    //console.log(data)
    //creo un array para guaradar las evoluciones de mis pokemons
    const pokemonArray = [];

    //creo un array para guardar mis resultados
    let evolucion1 = data.chain.species.name;

    //guardo en una variable la imagen
    let evolucion1Img = await getPokemonImg(evolucion1);
    //guardo
    pokemonArray.push([evolucion1, evolucion1Img]);
    //busco la 2 evolucion
    if (data.chain.evolves_to.length !== 0) {
      let evolucion2 = data.chain.evolves_to[0].species.name;
      let evolucion2Img = await getPokemonImg(evolucion2);
      pokemonArray.push([evolucion2, evolucion2Img]);
      console.log(pokemonArray);
      //busco la 3ra evolucion
      if (data.chain.evolves_to[0].evolves_to.length !== 0) {
        let evolucion3 = data.chain.evolves_to[0].evolves_to[0].species.name;
        let evolucion3Img = await getPokemonImg(evolucion3);
        pokemonArray.push([evolucion3, evolucion3Img]);
      }
    }

    setPokemonEvoluciones(pokemonArray);
  }

  //creo otra funcion async para obtener los nombre
  async function getPokemonImg(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const data = await response.json();
    //console.log(data.sprites.other['official-artwork'].front_default)
    return data.sprites.other["official-artwork"].front_default;
  }

  //(.map)me va a servir para iterar cada elemento de mi arreglo //cada vez que se itera con un map o foreach hay que pasarle un key
  return (
    <div className="app">
      
      <div className={`card-container card${pokemonEvoluciones.length}`}>
        {pokemonEvoluciones.map((pokemon) => (
          <Cards key={pokemon[0]} name={pokemon[0]} img={pokemon[1]} />
        ))}
      </div>

      <div className="buttons-container">
        <Button icon={<TiArrowLeftOutline />} handleClick={lastClick} />
        <Button icon={<TiArrowRightOutline />} handleClick={nextClick} />
      </div>
    </div>
  );
}

export default App;
