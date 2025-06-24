/**
 * This file runs in Electron's renderer context.
 * Read more about Electron security: https://electronjs.org/docs/tutorial/security
 * To enable Node.js integration, configure it in `main.js`.
 */

import './index.css';
import axios from 'axios';

// ✅ ES2022: Top-level await is supported in ES2022+ environments (like modern Electron setups with proper config).
// Wrapping everything in an async IIFE to use `await`
(async () => {
  // ✅ ES2021: Logical assignment operator `||=` — ensures fallback value if undefined/null
  let page: number | undefined;
  // eslint-disable-next-line prefer-const
  page ??= 1; 

  // ✅ ES2021: Numeric separators for better readability
  const planetUrl = `/api/planets/?page=${page}`;

  const request = await axios.request({
    responseType: 'json', // ✅ fixed incorrect 'stream' type for browser usage
    method: 'GET',
    baseURL: 'https://swapi.py4e.com',
    url: planetUrl,
  });

  // ✅ ES2022: Object destructuring with rest properties (used below)
  const { data, ...rest } = request;

  let elem = '<div>';

  // ✅ ES2023: Array `at()` method used for example purposes (getting first result)
  const firstPlanet = data.results.at(0); // same as data.results[0]
  console.log('First planet:', firstPlanet?.name); // ✅ ES2020: Optional chaining

  for (const planet of data.results) {
    // ✅ ES2021: String.replaceAll (just showing use even though not strictly needed here)
    const planetName = planet.name.replaceAll('&', 'and'); // safe HTML example

    elem += `<div class="response">
      <p>Planet Name: ${planetName}</p>
      <p>Rotation period: ${planet.rotation_period}, Orbital period: ${planet.orbital_period}, Diameter: ${planet.diameter}</p>
      <p>Climate: ${planet.climate}, Gravity: ${planet.gravity}, Terrain: ${planet.terrain}</p>
      <p>Surface water: ${planet.surface_water}, Population: ${planet.population}</p>
    </div>`;
  }

  elem += '</div>';

  // ✅ ES2024: Promise.withResolvers() — not used here directly but could be helpful in managing external state (mention for completeness)

  // ✅ ES2020+: Nullish coalescing to fallback if DOM element not found
  const planetCard = document.getElementById('planets-card') ?? document.body;
  const loadingIndicator = document.getElementById('show-loading') ?? document.body;

  planetCard.innerHTML = elem;
  loadingIndicator.style.display = 'none';
})();
