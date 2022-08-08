function pokemonRandomCard(
  pokemons,
  varAbilitie,
  container,
  cards,
  mainImage,
  mainName,
  mainLevel
) {
  let { name, level, image, background_color, abilities } = pokemons;

  cards.css({
    "background-color": background_color
  });

  mainImage.attr("src", image);
  mainName.html(name);
  mainLevel.html(
    `<span class="tiny">Niv</span><b>${level} ${abilities[0].icon}</b>`
  );

  abilities.map((abilitie) => {
    const { name, icon, power, description } = abilitie;

    return (varAbilitie += `
  <div class="content-abilities">
     <div class="abilitie d-flex space-between">
      <div class="icon-name d-flex gap-40">
        <div class="icon">${icon}</div>
        <h6 class="name">${name}</h6>
      </div>
      <b class="power">${power}</b>
     </div>
     <p class="description">${description.slice(0, 90)}</p>
    </div>
    `);
  });
  container.html(varAbilitie);
}

export default pokemonRandomCard;
