    const END_POINT = 'https://restcountries.com/v3.1/name/'
    const FIELDS = '?fields=name,capital,population,flags,languages'

export default function restCountries(country) {


    return fetch(`${END_POINT}${country}${FIELDS}`).then(response => {
        if (response.ok) {
            //console.log(response.json())
            return response.json()
        }

        throw new Error('Sorry - there are not this country') 
        
        
})
}

