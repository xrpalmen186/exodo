class CoffeeMachine {
  #waterAmount; //Privacidad real
  _power; //Privacidad acordada
  _nombre;

  get power() {
    return this._power;
  }

  set power(value) {
    this._power = value;
  }

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this.#waterAmount = value;
  }

  get waterAmount() {
    return this.#waterAmount;
  }

  constructor(power) {
    this._power = power;
    this.#waterAmount = 0;
    this._nombre = "Máquina de café";
  }
}

// se crea la máquina de café
let coffeeMachine = new CoffeeMachine(100);

console.log(coffeeMachine);

// agregar agua
coffeeMachine.waterAmount = 900; //JS
console.log(coffeeMachine.waterAmount);
//cofferMachine.setWaterAmount(900); //JAVA
console.log(coffeeMachine);

console.log(Object.entries(coffeeMachine));
