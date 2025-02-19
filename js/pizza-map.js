async function loadConfig () {
  try {
      const response = await fetch('/config.json')
      if (!response.ok) {
          throw new Error(`Failed to load config: ${response.statusText}`);
      }

      const config = await response.json()
      return config.JAWG_MAP_KEY;
  } catch (error) {
      console.error("Error loading config:", error);
  }
}

function initalizeMap (jawgMapKey) {
  const mapCenter = [40.72813379219229, -73.97424062703037]

  const pizzaPlaces = [
    { name: "Washington Sq. Park", coords: [40.73139264176868, -73.99711094792255], description: "Cheese" },
    { name: "Bleeker Street Pizza", coords: [40.7317, -74.0035], description: "Cheese" },
    { name: "Prince Street Pizza", coords: [40.7237, -73.9943], description: "Sicilian spicy pepperoni" },
    { name: "Manero's of Mulberry", coords: [40.7201, -73.9967], description: "Nonna maria slice" },
    { name: "Scars Pizza", coords: [40.7179, -73.9918], description: "Hot Boi Sicilian" },
    { name: "L'industrie Pizzeria", coords: [40.7104, -73.9630], description: "Burrata slice, Soft serve" },
    { name: "Fini's Pizza", coords: [40.71356, -73.9617], description: "White slice, Pizza making class" },
    { name: "Best Pizza", coords: [40.7136, -73.9557], description: "Cheese slice" },
    { name: "Chrissy's Pizza", coords: [40.725186143266136, -73.94759444445764], description: "lkadsflkjadlskf" },
    { name: "Paulie Gee's", coords: [40.7284, -73.9580], description: "Hellboy slice" },
  ]

  window.map = L
    .map('map', {
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: false,
      attributionControl: false
    })
    .setView(mapCenter, 13)

  const jawgStreetsTheme = L.tileLayer(`https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}`, {
    attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 0,
    maxZoom: 23,
    accessToken: jawgMapKey,
    updateWhenIdle: true,
    keepBuffer: 3
  })

  jawgStreetsTheme.addTo(window.map)

  pizzaPlaces.forEach(place => {
    L.marker(place.coords).addTo(map).bindPopup(`<b>${place.name}</b><br>${place.description}`);
  })
}

Promise
  .resolve()
  .then(async () => {
    return await loadConfig()
  })
  .then((jawgMapKey) => {
    initalizeMap(jawgMapKey)
  })
