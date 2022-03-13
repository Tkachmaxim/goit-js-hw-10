import { Notify } from 'notiflix/build/notiflix-notify-aio';
import restCountries from './fetchRestCountries'

const debounce=require('lodash.debounce')

const DEBOUNCE_DELAY = 300;


const searchBox = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

searchBox.addEventListener('input', debounce(onSearchInput,DEBOUNCE_DELAY))



function onSearchInput(e) {
    countryInfo.innerHTML = ''
    countryList.innerHTML=''
    const nameOfCountry = e.target.value.trim()
    if (nameOfCountry) {
        restCountries(nameOfCountry).then(createMarkUp).catch(error => Notify.failure('Ooops, there is no country with that name'))
    }
    
}


function createMarkUp(countries) {
    if (countries.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name')
    }
    const markUpList = countries.map(({ flags: { svg }, name: { official } }) => { return `<li><img src="${svg}" alt="${official}" width="100" height="50"/>&nbsp &nbsp${official}</li>` }).join('')
    countryList.insertAdjacentHTML('afterbegin', markUpList)
    if (countries.length === 1) {
        const country = countries[0]
        const languages = Object.values(countries[0].languages).join(',')
        const markUpInfo = `<ul>
      <li>Capital: ${country.capital}</li>
      <li>Population: ${country.population}</li>
      <li>Languages: ${languages}</li>
      </ul>`;
        countryInfo.innerHTML = markUpInfo;
    }


}