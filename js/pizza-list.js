import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3.1.2/+esm';

class PizzaList extends LitElement {
  static styles = css`
    .title {
      z-index: 100;
      position: absolute;
      top: 0;
      left: 0;

      color: black;
      font-size: 50px;
      font-family: 'Calibre', serif;
      font-optical-sizing: auto;
      font-weight: 500;
      font-style: normal;
    }

    .pizza-shop-list {
      position: absolute;
      top: calc(80% - 1rem);
      left: 0;

      height: 20%;
      width: 100%;

      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .pizza-shop-card {
      width: 80vw;
      height: 100%;
      margin: 0 2%;
      background-color: red;
      border-radius: 1rem;
      flex-shrink: 0;

      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      gap: .75rem;
      padding: .75rem;
      box-sizing: border-box;
    }

    .pizza-shop-card img {
      width: 40%;
      border-radius: 1rem;
    }

    .pizza-shop-card:first-child {
      /* margin-left: 2%; */
    }

    .pizza-shop-card:last-child {
    }

    .pizza-shop-card-title {
      font-size: 1rem;
      font-family: 'EB Garamond', serif;
      font-optical-sizing: auto;
      font-weight: 600;
      font-style: normal;
    }
  `

  mapCenter = [40.72813379219229, -73.97424062703037]

  pizzaPlaces = [
    { name: 'Washington Sq. Park',  coords: [40.73139264176868,  -73.99711094792255], description: 'Cheese',                  imgUrl: 'https://thepizzasnob.net/wp-content/uploads/2013/06/bleecker-street-pizza-resize.jpg'},
    { name: 'Bleeker Street Pizza', coords: [40.7317,            -74.0035],           description: 'Cheese' },
    { name: 'Prince Street Pizza',  coords: [40.7237,            -73.9943],           description: 'Sicilian spicy pepperoni' },
    { name: 'Manero\'s of Mulberry', coords: [40.7201,            -73.9967],           description: 'Nonna maria slice' },
    { name: 'Scars Pizza',          coords: [40.7179,            -73.9918],           description: 'Hot Boi Sicilian' },
    { name: 'L\'industrie Pizzeria', coords: [40.7104,            -73.9630],           description: 'Burrata slice, Soft serve' },
    { name: 'Fini\'s Pizza',         coords: [40.71356,           -73.9617],           description: 'White slice, Pizza making class' },
    { name: 'Best Pizza',           coords: [40.7136,            -73.9557],           description: 'Cheese slice' },
    { name: 'Chrissy\'s Pizza',      coords: [40.725186143266136, -73.94759444445764], description: 'lkadsflkjadlskf' },
    { name: 'Paulie Gee\'s',         coords: [40.7284,            -73.9580],           description: 'Hellboy slice' },
  ]

  render () {
    return html`
      <div class='pizza-shop-list'>
        ${this.pizzaPlaces.map(pizzaShop => {
          return html`
            <div
              class='pizza-shop-card'
              @click=${() => {
                window.map?.flyTo(pizzaShop.coords, 16, {
                  duration: .75
                })
              }}
            >
              <img src='${pizzaShop.imgUrl}' />
              <div class='pizza-shop-card-title'>${pizzaShop.name}</div>
            </div>
          `
        })}
      </div>
    `
  }
}

customElements.define('pizza-list', PizzaList)
