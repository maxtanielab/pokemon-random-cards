function pokemonCards(pokemons, varAbilitie, container) {
  let { name, level, image, background_color, abilities } = pokemons;

  let abilitie = abilities.map((abilitie) => {
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

  let showCard = "";

  showCard += `<div class="card id="card" style="background-color: ${background_color};">
  <div class="name-level d-flex space-between">
    <h5 id="name" class="name">${name}</h5>
    <span id="level" class="level"><span class="tiny">Niv</span><b>${level} ${abilities[0].icon}</b></span>
  </div>
  <div class="img" id="img">
    <img src=${image} id="main-image" class="main-img" />
  </div>
  <div class="abilities" id="abilities">${abilitie}</div>
</div>`;

  container.html(showCard);
}

export default pokemonCards;
