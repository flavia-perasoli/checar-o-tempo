document.querySelector('.busca').addEventListener('submit', async event => {
    event.preventDefault()

    let input = document.querySelector('#searchInput').value
    if (input !== '') {
        clearInfo()
        showWarning('Carregando...')

        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(
            input
        )}&appid=9da8c3ae8412e6fa82ea7c081b470135
        &units=metric&lang=pt_br`
        let results = await fetch(url)
        let json = await results.json()

        if (json.cod == 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            clearInfo()
            showWarning('Não encontramos essa localização')
        }
    } else {
        clearInfo()
    }
})

function showInfo(json) {
    showWarning('')

    document.querySelector(
        '.titulo'
    ).innerHTML = `${json.name}, ${json.country}`

    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>°C</sup>`

    document.querySelector(
        '.ventoInfo'
    ).innerHTML = `${json.windSpeed} <spam>km/h</spam>`

    document
        .querySelector('.temp img')
        .setAttribute(
            'src',
            `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
        )

    document.querySelector(
        '.ventoPonto'
    ).style.transform = `rotate(${json.windAngle}deg)`

    document.querySelector('.resultado').style.display = 'block'
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}

function clearInfo() {
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}
