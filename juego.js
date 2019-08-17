// Acá tomamos los elementos de HTML para usarlos después

const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')

class Juego {

    constructor() { // En este caso no recibe ningun parámetro pero si métodos/acciones
        this.inicializar() // Podemos declarar cualquier método/accion de THIS (o sea de JUEGO) aunque no exista, y después escribirla
        this.generarSecuencia()
    }

    inicializar() {
        btnEmpezar.classList.add('hide')
        this.nivel = 1
        this.colores = {
            // celeste: celeste
            // Si queremos en un objeto poner Atributo "celeste" y asignarle el valor que tiene en la variable celeste (la de arriba),
            // Podemos escribirla así
            celeste,
            violeta,
            naranja,
            verde
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
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
    }
}

function empezarJuego() { // Esta función de empezar juego, esta declarada en el BOTON de HTML
    window.juego = new Juego()
}