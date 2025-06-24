/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import axios from 'axios';


(async () => {
  let page: number | undefined;
  // eslint-disable-next-line prefer-const
  page ??= 1; 

  const planetUrl = `/api/planets/?page=${page}`;

  const request = await axios.request({
    responseType: 'json',
    method: 'GET',
    baseURL: 'https://swapi.py4e.com',
    url: planetUrl,
  });

  const { data, ...rest } = request;

  let elem = '<div>';

  for (const planet of data.results) {
    const planetName = planet.name.replaceAll('&', 'and');

    elem += `<div class="response">
      <p>Planet Name: ${planetName}</p>
      <p>Rotation period: ${planet.rotation_period}, Orbital period: ${planet.orbital_period}, Diameter: ${planet.diameter}</p>
      <p>Climate: ${planet.climate}, Gravity: ${planet.gravity}, Terrain: ${planet.terrain}</p>
      <p>Surface water: ${planet.surface_water}, Population: ${planet.population}</p>
    </div>`;
  }

  elem += '</div>';

  const planetCard = document.getElementById('planets-card') ?? document.body;
  const loadingIndicator = document.getElementById('show-loading') ?? document.body;

  planetCard.innerHTML = elem;
  loadingIndicator.style.display = 'none';
})();
