let nombreUsuario = 'Rodrigo Ezequiel Boiko'
let saldoCuenta = 0
let limiteExtraccion = 0
let codigoSeguridad = 1234
let cuentaAmiga1 = 12345
let cuentaAmiga2 = 56789
let agua = 3500
let telefono = 4250
let luz = 2100
let internet = 5700

window.onload = function () {
    iniciarSesion()
    cargarNombreEnPantalla()
    actualizarSaldoEnPantalla()
    actualizarLimiteEnPantalla()
} 

function cambiarLimiteDeExtraccion() {
    (async () => {
        const {
            value: $limiteExtraccion
        } = await Swal.fire({
            icon: 'question',
            title: `Cambiar límite de extracción`,
            text: `Ingresa el nuevo límite de extracción:`,
            input: 'number',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showCancelButton: true,
            inputValidator: (value) => {
                if (esUnNumero(parseInt(value))) {
                    if (esNegativo(value)) {
                        return
                    } else {
                        setTimeout(() => {
                            Swal.fire({
                                icon: 'success',
                                title: `Listo!`,
                                text: `El nuevo límite de extracción es de $${value}.`
                            })
                            limiteExtraccion = parseInt(value)
                            actualizarLimiteEnPantalla()
                        }, 100)
                    }
                } else if (extraccion == null) {
                    return
                } else {
                    return 'El valor ingresado no es válido.'
                }
            }
        })
    })()
}

function extraerDinero() {
    (async () => {
        const {
            value: $extraccion
        } = await Swal.fire({
            icon: 'info',
            title: `Extraer dinero:`,
            text: `Ingresa el monto que quieras extraer:`,
            input: 'number',
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false,
            inputValidator: (value) => {
                if (esUnNumero(parseInt(value))) {
                    value = parseInt(value)
                    if (esNegativo(value)) {
                        return
                    } else {
                        if (value > limiteExtraccion) {
                            setTimeout(() => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'El monto supera el límite de extracción, intenta nuevamente.',
                                })
                            }, 200);
                        } else if (value > saldoCuenta) {
                            setTimeout(() => {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Oops...',
                                    text: 'No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero, intenta nuevamente.',
                                })
                            }, 200);
                        } else if (value % 100 !== 0) {
                            setTimeout(() => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'El cajero sólo entrega billetes de $100. Por favor, ingresa un monto válido: ',
                                })
                            }, 200);
                        } else {
                            let saldoAnterior = saldoCuenta
                            saldoCuenta = restarDinero(value)
                            actualizarSaldoEnPantalla()
                            setTimeout(() => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Extracción exitosa:',
                                    text: `Has retirado: $${value}. Saldo Anterior: $${saldoAnterior}. Saldo actual: $${saldoCuenta}.`
                                })
                            }, 200);
                        }
                    }
                } else if (value == null) {
                    return
                } else {
                    setTimeout(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El valor ingresado no es válido.',
                        })
                    }, 200);
                    return
                }
            }
        })
    })()
}

function depositarDinero() {
    (async () => {
        const {
            value: $deposito
        } = await Swal.fire({
            icon: 'info',
            title: `Depositar dinero:`,
            text: `Ingresa el monto a depositar:`,
            input: 'number',
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false,
            inputValidator: (value) => {
                if (esUnNumero(parseInt(value))) {
                    value = parseInt(value)
                    if (esNegativo(value)) {
                        return
                    } else {
                        let saldoAnterior = saldoCuenta
                        saldoCuenta = sumarDinero(value)
                        actualizarSaldoEnPantalla()
                        setTimeout(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Depósito exitoso:',
                                text: `Has depositado: $${value}. Saldo Anterior: $${saldoAnterior}. Saldo actual: $${saldoCuenta}.`
                            })
                        }, 200);
                    }
                } else if (value == null) {
                    return
                } else {
                    setTimeout(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El valor ingresado no es válido.',
                        })
                    }, 200);
                    return
                }
            }
        })
    })()
}