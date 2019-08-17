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
        this.siguienteNivel()
    }

    inicializar() {
        btnEmpezar.classList.add('hide')
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

    siguienteNivel() {
        this.iluminarSecuencia()
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
    
        // Esto va a recorrer el array secuencia hasta el nivel en el que esté el usuario
        // El array secuencia se crea solamente UNA VEZ
        // Y es el mismo para todo el juego
        iluminarSecuencia() {
            for (let i = 0; i < this.nivel; i++) {
                const color = this.transformarNumeroAColor(this.secuencia[i])
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
}

function empezarJuego() { // Esta función de empezar juego, esta declarada en el BOTON de HTML
    window.juego = new Juego()
}