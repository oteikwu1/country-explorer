const toggleBtn = document.getElementById('dark-theme');
const searchInput = document.getElementById('search');
 const displayContainer = document.querySelector('.display-container');
 const dropdown = document.getElementById('country');

function toggleBackground() {
  const toggleMode = document.body;
  toggleMode.classList.toggle('dark-mode');

  const text = document.querySelector('.dark-mode-text');
  text.textContent = document.toggleMode.classList.contains('dark-mode')
    ? 'Light Mode'
    : 'Dark Mode';
}

toggleBtn.addEventListener('click', toggleBackground);

const apiKey =
  'https://restcountries.com/v3.1/all?fields=name,flags,currencies,capital,population,region';

  console.log(apiKey);

async function renderCountry() {
  try {
    let response = await fetch(apiKey);
 
    if (!response.ok) {
      throw new Error(`status ${response.status}`);
    }

    let data = await response.json();
    displayCountry(data);

  } catch (err) {
    console.error("Error:", err)

  }
};
renderCountry();
function displayCountry(countries) {

  displayContainer.innerHTML = '';

  countries.forEach((country) => {
   const name = country.name.common;
  const population = country.population
    ? country.population.toLocaleString()
    : 'N/A';
   const region = country.region;
   const capital = country.capital ? country.capital.join(', ') : 'N/A';

   const countryList = document.createElement('div');

   countryList.classList.add('country-list');

   countryList.innerHTML = `
  
    <div class="country-info">
    <img src="${country.flags.png}" 
         alt="${country.flags.alt || country.name.common + ' flag'}" 
         class="country-flag">
    
    <h2 class="country-name">${country.name.common}</h2>
    <p class="country-population"><b>Population:</b> ${population.toLocaleString('en-IN')}</p>
    <p class="country-region"><b>Region:</b> ${region}</p>
    <p class="country-capital"><b>Capital:</b> ${capital}</p>
  </div>
    `;
   displayContainer.appendChild(countryList);
 });
};



const searchBtn = document.querySelector('.btn');
searchBtn.addEventListener('click', renderCountry);