// https://lit.dev/
import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@3.1.2/+esm'

// https://swiperjs.com/
import 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js'

class PizzaList extends LitElement {
  mapCenter = [40.72813379219229, -73.97424062703037]
  mapCenterZoom = 13
  mapCenterZoomTime = .4

  mapZoomTime = .65

  pizzaPlaces = [
    { name: 'Bleeker Street Pizza',  coords: [40.7317,            -74.0035],           description: 'Cheese',                          img: './static/bleeker_st_pizza.webp'},
    { name: 'Prince Street Pizza',   coords: [40.7237,            -73.9943],           description: 'Sicilian spicy pepperoni',        img: './static/prince_st_pizza.webp' },
    { name: 'Manero\'s of Mulberry', coords: [40.7201,            -73.9967],           description: 'Nonna maria slice',               img: './static/maneros_of_mulberry.webp' },
    { name: 'Scars Pizza',           coords: [40.7179,            -73.9918],           description: 'Hot Boi Sicilian',                img: './static/scars_pizza.webp' },
    { name: 'L\'industrie Pizzeria', coords: [40.7104,            -73.9630],           description: 'Burrata slice, Soft serve',       img: './static/lindustrie_pizza.webp' },
    { name: 'Fini\'s Pizza',         coords: [40.71356,           -73.9617],           description: 'White slice, Pizza making class', img: './static/finis_pizza.webp' },
    { name: 'Best Pizza',            coords: [40.7136,            -73.9557],           description: 'Cheese slice',                    img: './static/best_pizza.webp' },
    { name: 'Chrissy\'s Pizza',      coords: [40.725186143266136, -73.94759444445764], description: 'lkadsflkjadlskf',                 img: './static/chrissys_pizza.webp' },
    { name: 'Paulie Gee\'s',         coords: [40.7284,            -73.9580],           description: 'Hellboy slice',                   img: './static/paulie_gees.webp' },
  ]

  createRenderRoot () {
    return this
  }

  firstUpdated () {
    super.firstUpdated()

    const swiperContainer = document.querySelector('swiper-container')
    swiperContainer.addEventListener('swiperslidechange', (event) => {
      const activeIndex = event.detail[0].activeIndex - 1

      const isInfoPage = activeIndex === -1
      if (isInfoPage) {
        window.map?.flyTo(this.mapCenter, this.mapCenterZoom, {
          duration: this.mapCenterZoomTime,
          easeLinearity: 0.25
        })
      } else {
        const pizzaPlace = this.pizzaPlaces[activeIndex]
        window.map?.flyTo(pizzaPlace.coords, 17, {
          duration: this.mapZoomTime,
          easeLinearity: 0.25
        })
      }
    })
  }

  renderInfoCard () {
    return html`
      <swiper-slide class='relative min-w-full h-full z-10 p-0 flex flex-col justify-around gap-3 backdrop-blur-[6px] backdrop-brightness-[.5]'>
        <div class='flex flex-col gap-5 p-4'>
          <h1 class='text-white text-[3.5rem] font-black inline-block'>
            h'NY 2025 Pizza Tour 🍕
          </h1>

          <div class='flex flex-col font-thin'>
            <p class='text-3xl text-white'>Saturday, June 7th</p>
            <p class='text-2xl text-white'>11:30 pm</p>
          </div>

          <div>
            <p class='text-white text-xl font-semibold'><a href='#' class='underline text-orange-400'>RSVP on Partiful</a></p>
          </div>
        </div>

        <div class='flex flex-col justify-center items-center text-white text-xl font-thin'>
          <p>← Swipe to see tour route</p>
        </div>
      </swiper-slide>
    `
  }

  renderPizzaList () {
    return html`
      ${this.pizzaPlaces.map((pizzaShop)=> {
        return html`
          <swiper-slide
            class='min-w-full min-h-full flex flex-col justify-end'
            @click=${() => {
              console.log('TODO: show more')
            }}
          >
            <div class='h-30 mx-[5%] mb-[5%] p-[1rem] bg-stone-100 rounded-xl flex gap-3 shadow-2xl'>

              ${!!pizzaShop.img && pizzaShop.img !== ''
                ? html`<img class='w-2/5 rounded-lg' src='${pizzaShop?.img}' />`
                : html`<div class='w-full h-full bg-red'><div>`}

              <div class='flex flex-col justify-between'>
                <div class='underline'>${pizzaShop.name}</div>
                <div class='font-light'>More info</div>
              </div>

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
