// Acá tomamos los elementos de HTML para usarlos después

const gameboard = document.getElementById('gameboard')
const giroMagico = document.querySelector('.rotate')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10
var acumRotar = 0

class Juego {

    constructor() { // En este caso no recibe ningun parámetro pero si métodos/acciones
        this.inicializar = this.inicializar.bind(this)
        this.inicializar() // Podemos declarar cualquier método/accion de THIS (o sea de JUEGO) aunque no exista, y después escribirla
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }

    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.colores = { // Acá ponemos a los BOTONES con el metodo COLORES para tenerlos más fácil
            // celeste: celeste
            // Si queremos en un objeto poner Atributo "celeste" y asignarle el valor que tiene en la variable celeste (la de arriba),
            // Podemos escribirla así
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar(){
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia() {
        // Podemos declarar cualquier atributo nuevo que todavía va a pertenecer a JUEGO
        // Vamos a generar un array de numeros random
        // Podemos hacer [1, 2, 3] o con new Array(cuantos elementos queremos que tenga)
        // La funcion .fill establece los valores iniciales del array para que despues funcione el MAP
        // Porque el MAP no va a recorrer elementos que no estén definidos y sin valor
        // Math.random es un valor entre 0 y 1
        // Math.floor va a redondear el numero para abajo
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

        transformarNumeroAColor(numero){
            switch (numero) {
                case 0:
                    return 'celeste'
                case 1:
                    return 'violeta'
                case 2:
                    return 'naranja'
                case 3:
                    return 'verde'
            }
        }

        transformarColoraNumero(color) {
            switch (color) {
                case 'celeste':
                    return 0
                case 'violeta':
                    return 1
                case 'naranja':
                    return 2
                case 'verde':
                    return 3
            }
        }
    
        // Esto va a recorrer el array secuencia hasta el nivel en el que esté el usuario
        // El array secuencia se crea solamente UNA VEZ
        // Y es el mismo para todo el juego
        
        iluminarSecuencia() {
            for (let i = 0; i < this.nivel; i++) {
                let color = this.transformarNumeroAColor(this.secuencia[i])
                // La función de arriba hace lo siguiente
                // El parametro this.secuencia[i] hace referencia a la posicion en la secuencia (array)
                // Si la posición es 1 (primer nivel) y el array es 0 2 2 3 1
                // El numero que devuelve va a ser 0
                // Esto se lo pasa a transformarNumeroAColor, y esta funcion agarra el 0 y lo pasa a 'celeste'
                // Este 'celeste' se guarda en la variable color
                setTimeout(() => this.iluminarColor(color), 1000 * i )
            }
        }

        iluminarColor(color) {
            this.colores[color].classList.add('light')
            setTimeout(() => this.apagarColor(color), 350)
        }

        apagarColor(color) {
            this.colores[color].classList.remove('light')
        }

        agregarEventosClick() { // Le agrega a los botones (que los llamamos this.colores) un evento click
            // Y le decimos al navegador que tiene que hacer cuando se clickea cada boton
            // JS se lo pasa al navegador asincronamente
            // Es decir, el navegador le dice: che, clickeó
            // Y JS le dice: Bueno, aguantá que termino con todo y lo hago
            // Y se pone en la lista de tareas

            this.colores.celeste.addEventListener('click', this.elegirColor)
            this.colores.verde.addEventListener('click', this.elegirColor)
            this.colores.violeta.addEventListener('click', this.elegirColor)
            this.colores.naranja.addEventListener('click', this.elegirColor)

            // Acá hay un problema de contexto con el THIS
            // El this en elegirColor pierde referencia y se va al botón
            // Pero lo queremos unir al juego y que siga siendo el juego
            // Eso se hace con .bind
        }

        eliminarEventosClick() {
            this.colores.celeste.removeEventListener('click', this.elegirColor)
            this.colores.verde.removeEventListener('click', this.elegirColor)
            this.colores.violeta.removeEventListener('click', this.elegirColor)
            this.colores.naranja.removeEventListener('click', this.elegirColor)
        }

        elegirColor(ev) {
            const nombreColor = ev.target.dataset.color
            const numeroColor = this.transformarColoraNumero(nombreColor)
            this.iluminarColor(nombreColor)
            if (numeroColor === this.secuencia[this.subnivel]) {
                this.subnivel++
                if (this.subnivel === this.nivel) {
                    this.nivel++
                    this.eliminarEventosClick()
                    if (this.nivel === (ULTIMO_NIVEL + 1)) {
                        this.ganoElJuego()
                    } else {
                        this.rotar()
                        setTimeout(this.siguienteNivel, 1300)
                    }
                }
            } else {
                this.perdioElJuego()
            }
        }

        rotar(){
            acumRotar += 45
            gameboard.style.transform = `rotate(${acumRotar}deg)`
        }

        ganoElJuego(){
            swal('Biennn!!', 'Ganaste mi amorrr!', 'success')
                .then (() => {
                    this.inicializar()
                })
        }

        perdioElJuego(){
            swal('UPSSS', 'No siempre ganas pichis...', 'error')
                .then (() => {
                    this.eliminarEventosClick()
                    this.inicializar()
                })
        }
}

function empezarJuego() { // Esta función de empezar juego, esta declarada en el BOTON de HTML
    window.juego = new Juego()
}