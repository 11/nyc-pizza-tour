// https://lit.dev/
import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3.1.2/+esm'

// https://swiperjs.com/
import 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js'

class PizzaList extends LitElement {
  mapCenter = [40.72813379219229, -73.97424062703037]

  pizzaPlaces = [
    { name: 'Bleeker Street Pizza',  coords: [40.7317,            -74.0035],           description: 'Cheese' },
    { name: 'Prince Street Pizza',   coords: [40.7237,            -73.9943],           description: 'Sicilian spicy pepperoni' },
    { name: 'Manero\'s of Mulberry', coords: [40.7201,            -73.9967],           description: 'Nonna maria slice' },
    { name: 'Scars Pizza',           coords: [40.7179,            -73.9918],           description: 'Hot Boi Sicilian' },
    { name: 'L\'industrie Pizzeria', coords: [40.7104,            -73.9630],           description: 'Burrata slice, Soft serve' },
    { name: 'Fini\'s Pizza',         coords: [40.71356,           -73.9617],           description: 'White slice, Pizza making class' },
    { name: 'Best Pizza',            coords: [40.7136,            -73.9557],           description: 'Cheese slice' },
    { name: 'Chrissy\'s Pizza',      coords: [40.725186143266136, -73.94759444445764], description: 'lkadsflkjadlskf' },
    { name: 'Paulie Gee\'s',         coords: [40.7284,            -73.9580],           description: 'Hellboy slice' },
  ]

  createRenderRoot () {
    return this
  }

  firstUpdated () {
    super.firstUpdated()

    const swiperContainer = document.querySelector('swiper-container')

    swiperContainer.addEventListener('swiperslidechange', (event) => {
      const activeIndex = event.detail[0].activeIndex - 1
      if (activeIndex === -1) {
        return
      }

      console.log('DEBUG: ', activeIndex)
      const pizzaPlace = this.pizzaPlaces[activeIndex]
      window.map?.flyTo(pizzaPlace.coords, 16, {
        duration: .6
      })
    })
  }

  renderInfoCard () {
    return html`
      <swiper-slide class='relative min-w-full h-full z-10 p-0 flex flex-col justify-around  gap-3 backdrop-blur-[3px] backdrop-brightness-[.65]'>
        <div class='flex flex-col gap-5 p-4'>
          <h1 class='text-white text-[3.5rem] font-medium inline-block'>
            h'NY 2025 Pizza Tour
          </h1>

          <div class='flex flex-col'>
            <p class='text-2xl'>Saturday, June 7th</p>
            <p class='text-xl'>11:30 pm</p>
          </div>

          <div>
            <p>RSVP on <a href='#' class=''>Partiful</a></p>
          </div>
        </div>

        <div class='flex flex-col justify-center items-center'>
          <p><span>< < < </span>Swipe to see tour route</p>
        </div>
      </swiper-slide>
    `
  }

  renderPizzaList () {
    return html`
      ${this.pizzaPlaces.map((pizzaShop, index)=> {
        return html`
          <swiper-slide
            class='min-w-full min-h-full flex flex-col justify-end'
            @click=${() => {
            }}
          >
            <div class='h-30 mx-[5%] mb-[5%] p-[1rem] bg-white rounded-xl flex'>
              ${!!(pizzaShop.imgUrl)
                ? html`<img class='w-40' src='${pizzaShop?.imgUrl}' />`
                : html`<div class='w-40 h-full bg-red'><div>`}
              <div class='pizza-shop-card-title'>${pizzaShop.name}</div>
            </div>
          </swiper-slide>
        `
      })}
    `
  }

  render () {
    return html`
      <swiper-container
        speed="300"
        class='swiper absolute top-0 left-0 w-full h-full z-10 flex overflow-scroll'
      >
        ${this.renderInfoCard()}
        ${this.renderPizzaList()}
      </swiper-contianer>
    `
  }
}

customElements.define('pizza-list', PizzaList)
