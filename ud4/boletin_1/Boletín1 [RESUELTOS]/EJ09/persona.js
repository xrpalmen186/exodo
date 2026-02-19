class Persona {
    _nombre;
    _apellidos;
    _edad;
    constructor(nombre,apellidos,edad){
        this._nombre=nombre;
        this._apellidos=apellidos;
        this._edad=edad;
    }
    get edad() {
        return this._edad;
    }
    set edad(value) {
        this._edad = value;
    }
    get apellidos() {
        return this._apellidos;
    }
    set apellidos(value) {
        this._apellidos = value;
    }
    get nombre() {
        return this._nombre;
    }
    set nombre(value) {
        this._nombre = value;
    }
}

export default Persona;