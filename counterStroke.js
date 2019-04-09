console.log('holas')

function Foto(inicio, fin) {
    this.inicio = inicio
    this.fin = fin
    this.total = this.fin - this.inicio
}

var fotos = fotos || []
var iniciado = false
var time
var contador

if (JSON.parse(localStorage.getItem('setFotos')) == null) {
    localStorage.setItem("setFotos", JSON.stringify(fotos))
} else {
    fotos = JSON.parse(localStorage.getItem('setFotos'))
}


var container = document.querySelector('.container')

var btnInicio = document.createElement('button')
btnInicio.innerText = "INICIAR"
btnInicio.addEventListener('click', () => {
    if (iniciado) {
        guardar()
        iniciado = false
        btnInicio.innerText = "INICIAR"
    } else {
        time = new Date().getTime()
        btnInicio.innerText = "PARAR"
        actualizarVista()
        iniciado = true
    }
    localStorage.setItem("setFotos", JSON.stringify(fotos))
})

container.appendChild(btnInicio)

function guardar() {
    var foto = new Foto(time, new Date().getTime())
    fotos.push(foto)
    alert(msToTime(fotos[fotos.length - 1].total))
    clearInterval(contador)
    container.removeChild(container.lastChild)
}

function actualizarVista() {
    var visconta = document.createElement("span")
    container.appendChild(visconta)
    var tiempo = 1
    contador = setInterval(() => {
        visconta.innerText = msToTime(tiempo * 1000)
        tiempo++
    }, 1000);
}

function msToTime(ms) {
    var milliseconds = parseInt((ms % 1000) / 100),
        seconds = Math.floor((ms / 1000) % 60),
        minutes = Math.floor((ms / (1000 * 60)) % 60),
        hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}