
let address = "colorado"
const astroApiKey = "b17e8b59f8924d6585b40d01141a04b3"

const homePage = document.querySelector("#home")

homePage.addEventListener("click", handleHome)

function handleHome() {
    window.location.replace(`http://localhost:3001/index.html`)
}

const signOutButton = document.querySelector("#sign-out-button")
console.log(signOutButton)
signOutButton.addEventListener("click", logout)
function logout() {
    localStorage.removeItem("token")
    window.location.replace(`http://localhost:3001/index.html`)
    showNavElement()
}

function riseFallData() {
    fetch(`https://api.ipgeolocation.io/astronomy?apiKey=${astroApiKey}&location=${address}`)
        .then(response => response.json())
        .then(result => console.log(result))
}

riseFallData()

const searchPlanetForm = document.querySelector(".search-form")
searchPlanetForm.addEventListener("submit", getLocation)

function getLocation(event){
    event.preventDefault()
    console.log(event.target)
    const formData = new FormData(event.target)
    const search = formData.get("search")

    getSearchInfo(search)
}


const closeButton = document.querySelector(".fa-window-close-o")
function getSearchInfo(search) {

    const planetC = document.querySelector("#pop")
    const titlePlanet = document.querySelector(".pop-header")
    const bodyPlanet = document.querySelector(".pop-body")

    fetch(`https://api.ipgeolocation.io/astronomy?apiKey=${astroApiKey}&location=${search}`)
    .then(response => response.json())
    .then(result => { 
        console.log(result)
        planetC.style.transform = "scale(1)"

        const name = document.createElement("div")
        name.innerText = `NAME: ${result.location.location.toUpperCase()}`
        console.log(name)
        titlePlanet.appendChild(name)

        const time = document.createElement("div")
        time.innerText = `TIME: ${result.current_time}`
        console.log(time)

        const date = document.createElement("div")
        date.innerText = `DATE: ${result.date}`
        console.log(date)
        
        const moonrise = document.createElement("div")
        moonrise.innerText = `MOONRISE TIME: ${result.moonrise}`
        console.log(moonrise)

        const moonset = document.createElement("div")
        moonset.innerText = `MOONSET TIME: ${result.moonset}`
        console.log(moonset)

        const sunrise = document.createElement("div")
        sunrise.innerText = `SUNRISE TIME: ${result.sunrise}`
        console.log(sunrise)

        const sunset = document.createElement("div")
        sunset.innerText = `SUNSET TIME: ${result.sunset}`
        console.log(sunset)

        const daylength = document.createElement("div")
        daylength.innerText = `DAY LENGTH: ${result.day_length}`
        console.log(daylength)

        bodyPlanet.append(time, date, moonrise, moonset, sunrise, sunset, daylength)

        closeButton.addEventListener("click", closePopUp)
        function closePopUp() {
            titlePlanet.removeChild(name)
            time.remove()
            date.remove()
            moonrise.remove()
            moonset.remove()
            sunrise.remove()
            sunset.remove()
            daylength.remove()
            planetC.style.transform = "scale(0)"
        }
    })
}