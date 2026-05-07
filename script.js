const toggleBtn = document.getElementById('dark-theme');
const searchInput = document.getElementById('search');
const displayContainer = document.querySelector('.display-container');
const continentSelect = document.getElementById('continent');

function toggleBackground() {
  const toggleMode = document.body;
  toggleMode.classList.toggle('dark-mode');

}

toggleBtn.addEventListener('click', toggleBackground);

const apiKey = `https://restcountries.com/v3.1/all?fields=name,flags,currencies,capital,population,region`;

let allCountries = [];

https: console.log(apiKey);

async function fetchCountries() {

  try {
    const response = await fetch(apiKey);
   
      
    if (!response.ok) {
      throw new Error(`status ${response.status}`);
    }

    allCountries = await response.json();
    displayCountry(allCountries);

  } catch (err) {
    console.error('Error:', err);
  }
}
fetchCountries();

function displayCountry(countriesData) {
 if (!Array.isArray(countriesData)) return;

  displayContainer.innerHTML = '';

  countriesData.forEach((country) => {
    const name = country.name.common;
    const region = country.region;
    const capital = country.capital ? country.capital.join(', ') : 'N/A';

    const populationDisplay = country.population
      ? country.population.toLocaleString('en-IN')
      : 'N/A';

    const countryList = document.createElement('div');
    countryList.classList.add('country-list');

    countryList.innerHTML = `
      <div class="country-info">
        <img src="${country.flags.png}" 
             alt="${country.flags.alt || name + ' flag'}" 
             class="country-flag">
        
        <h2 class="country-name">${name}</h2>
        <p class="country-population"><b>Population:</b> ${populationDisplay}</p>
        <p class="country-region"><b>Region:</b> ${region}</p>
        <p class="country-capital"><b>Capital:</b> ${capital}</p>
      </div>
    `;
    displayContainer.appendChild(countryList);
  });
};

// Event listener for dropdown selection
continentSelect.addEventListener('change', (e) => {
  const selectedContinent = e.target.value;

  if (selectedContinent === 'All') {
    displayCountry(allCountries);
  } else {
    const filteredCountries = allCountries.filter((country) => {
     return country.region === selectedContinent;
    });
    displayCountry(filteredCountries);
  }
});


// Event listener for search input
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const countryLists = document.querySelectorAll('.country-list');
  countryLists.forEach((countryList) => {
    const countryName = countryList
      .querySelector('.country-name')
      .textContent.toLowerCase();
    if (countryName.includes(searchTerm)) {
      countryList.style.display = 'block';
    } else {
      countryList.style.display = 'none';
    }
  });
});
