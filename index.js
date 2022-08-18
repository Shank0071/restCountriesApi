const countriesContainer = document.querySelector(".countries");
const section1 = document.querySelector(".section-1");
const section2 = document.querySelector(".section-2");
const section2CountryContainer = document.querySelector(".section-2 .container .country1");
const backBtn = document.getElementById("back");
let select = document.querySelector("select");


const country1 = document.querySelector(".country1");





const countriesArray = ["germany", "usa", "brazil", "iceland", "afghanistan", "albania", "algeria", "india", "australia", "iceland", "russia"];


const data = []

const getCountries = async () => {
    for (let i = 0; i < countriesArray.length; i++) {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countriesArray[i]}`);
        const data1 = await response.json();
        data.push(data1)
    }
    displayCountries(data);
    const countryInfo = document.querySelectorAll(".country-info");
    for (let l = 0; l < countryInfo.length; l++) {
        countryInfo[l].addEventListener("click", function() {
            const country = this.lastElementChild.firstElementChild.textContent.toLowerCase()
            section1.classList.toggle("hidden");
            section2.classList.toggle("hidden"); 
            displayCountryInfo(country)
        })
    }
    return data
}

getCountries().then((data1) => {
    console.log("success", data1)
})

function displayCountries(data) {
    for (const j of data) {
        const html = `
        <div class="country-info">
            <div class="flag"><img src=${j[0].flags.png} alt="flag"></div>
            <div class="general-info">
                <h1 style="margin-bottom: 0.6rem">${j[0].name.common}</h1>
                <p>Population: <span>${j[0].population}</span><p>
                <p>Region: <span>${j[0].region}</span>
                <p>Capital: ${j[0].capital}</p>
            </div>
        </div>
        `
        countriesContainer.insertAdjacentHTML("beforeend", html)
    }
    console.log(Array.from(countriesContainer.children)[0].lastElementChild.children[3].children[0].textContent)
    filteredCountries(Array.from(countriesContainer.children))
} 

function displayCountryInfo(country) {

    const individualCountryData = async () => {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        const data = await response.json()
        console.log(data)
        const obj = data[0].name.nativeName
        const obj1 = Object.keys(obj)[0]
        console.log(typeof obj1)
        const html1 = `
        <div class="indivCountryInfo">
            <div class="flag"><img src=${data[0].flags.png} alt="flag"></div>
            <div class="other-info">
                <h1 style="margin-bottom:2rem">${country.toUpperCase().slice(0,1) + country.toLowerCase().slice(1)}</h1>
                <p>Native Name: <span>${data[0].name.nativeName[obj1]["common"]}</span></p>
                <p>Population: <span>${data[0].population}</span></p>
                <p>Region: <span>${data[0].region}</span></p>
                <p>Sub Region: <span>${data[0].subregion}</span></p>
                <p>Capital: <span>${data[0].capital}</span></p>
                <p>Top Level Domain: <span>${data[0].tld}</span></p>
                <p>Currencies: <span>${Object.keys(data[0].currencies)}</span></p>
                <p>Languages: <span>${Object.keys(data[0].languages)}</span></p>
                <p>Borders: <span>${data[0].borders}</span></p>
            </div>
        </div>
        `
        section2CountryContainer.insertAdjacentHTML("beforeend", html1)
        return data
    }
    individualCountryData().then((data) => {console.log("success1")})

}

backBtn.addEventListener("click", function() {
    section2CountryContainer.innerHTML = "";
    section2.classList.toggle("hidden"); 
    section1.classList.toggle("hidden");
})


function filteredCountries(countries) {
    select.addEventListener("change", function() {
        if (this.value === "Europe") {
            for (const i of countries) {
                i.classList.remove("hidden")
                if (i.lastElementChild.children[3].children[0].textContent !== "Europe") {
                    i.classList.add("hidden")
                }
            }
        } else if (this.value === "Africa") {
            for (const i of countries) {
                i.classList.remove("hidden")
                if (i.lastElementChild.children[3].children[0].textContent !== "Africa") {
                    i.classList.add("hidden")
                }
            }
        } else if (this.value === "Asia") {
            for (const i of countries) {
                i.classList.remove("hidden")
                if (i.lastElementChild.children[3].children[0].textContent !== "Asia") {
                    i.classList.add("hidden")
                }
            }
        } else if (this.value === "America") {
            for (const i of countries) {
                i.classList.remove("hidden")
                if (i.lastElementChild.children[3].children[0].textContent !== "Americas") {
                    i.classList.add("hidden")
                }
            }
        } else if (this.value === "Oceania") {
            for (const i of countries) {
                i.classList.remove("hidden")
                if (i.lastElementChild.children[3].children[0].textContent !== "Oceania") {
                    i.classList.add("hidden")
                }
            }
        } else if (this.value === "filter") {
            for(const i of countries) {
                i.classList.remove("hidden")
            }
               
        }
    })
}

const theme = document.querySelector(".darkmode")
theme.addEventListener("click", function() {
    if (theme.textContent === "Dark Mode") {
        document.body.setAttribute("data-theme", "light");
        theme.textContent = "Light Mode";
        document.querySelector("nav").style.boxShadow = "1px 3px 5px rgba(0,0,0,0.2)";
        select.style.color = "black";
        select.parentElement.style.boxShadow = "1px 3px 5px rgba(0,0,0,0.2)";
        document.querySelector("input").style.color = "black";
        backBtn.style.boxShadow = "1px 3px 5px rgba(0,0,0,0.2)";
        backBtn.style.color = "black"; 
    }
    else {
        document.body.setAttribute("data-theme", "dark");
        theme.textContent = "Dark Mode"
        select.style.color = "white";
        backBtn.style.boxShadow = "1px 3px 5px rgba(0,0,0,0.2)";
        backBtn.style.color = "white"; 
    }
})

// function searchCountry()






