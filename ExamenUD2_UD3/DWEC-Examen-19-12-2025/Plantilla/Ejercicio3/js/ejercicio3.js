const mensajes = document.querySelector("div#mensajes");
const selectorRef = document.querySelector("select");

const camposVacios = document.createElement("div");
camposVacios.className = "empty-list";
mensajes.appendChild(camposVacios);

const camposErrores = document.createElement("div");
camposErrores.className = "error-list";
mensajes.appendChild(camposErrores);

// camposVacios.innerHTML = "VACIOS"
// camposErrores.innerHTML = "ERRORES"

const fabricante = formularioStock.fabricante;
const producto = formularioStock.producto;
const fecha = formularioStock.fecha;
const categoria = formularioStock.categoria;
const referencia = formularioStock.referencia;
const ubicacion = formularioStock.ubicacion;
const submitBtn = document.querySelector("input[type='submit'")

submitBtn.addEventListener("click", enviarFormulario);

function enviarFormulario() {
    camposVacios.innerHTML = "";
    camposErrores.innerHTML = "";

    if (fabricante.value == '') {
        camposVacios.innerHTML += "El campo fabricante está vacío <br>";
        formularioStock.action = '';
    }

    if (producto.value == '') {
        camposVacios.innerHTML += "El campo producto está vacío <br>";
    }

    if (!validarNombres(fabricante.value)) {
        camposErrores.innerHTML += "El campo fabricante no cumple el formato <br>";
    }
    if (!validarNombres(producto.value)) {
        camposErrores.innerHTML += "El campo producto no cumple el formato <br>";
    }
}

function validarNombres(nombre) {
    const patronNombre = /^[A-Za-z]+$/;
    return patronNombre.test(nombre);
}

function validarFecha(fecha) {
    const patronFecha = /^\d{4}-\d{2}-\d{2}$/;
    return patronFecha.test(fecha);
}

function validarFormatoCodigoRef(codigo) {
    if (selectorRef.value == "electronica") {
        const patronCodigoElectronica = /^EL-\d{3}[A-Z]$/;
        return patronCodigoElectronica.test(codigo);
    }
    
    if (selectorRef.value == "hogar") {
        const patronCodigoHogar = /^[A-Z]{3}-\d{4}$/;
        return patronCodigoHogar.test(codigo);
    }

    if (selectorRef.value == "alimentacion") {
        const patronCodigoAlimentacion = /^AL-\d{4}EXP$/;
        return patronCodigoAlimentacion.test(codigo);
    }
}

function validarFormatoUbicacionPasillo(ubicacion) {
    const patronUbicacion = /^[A-Z]{1}-\d{2}$/;
    return patronUbicacion.test(ubicacion);
}