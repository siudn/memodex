import { useState, useEffect } from "react";

function Card({ name, handleClick }) {
  const [pokemon, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function getData(pokeName) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokeName}`,
        { mode: "cors" }
      );
      const pokeData = await response.json();
      setPokemon(pokeData);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData(name);
  }, [name]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex flex-col content-center justify-items-center bg-slate-400 rounded-2xl"
    >
      <p>{pokemon.name}</p>
      {pokemon.sprites.front_default && (
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="flex items-center justify-center"
        />
      )}
    </div>
  );
}

export default Card;
