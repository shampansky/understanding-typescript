//// Intersection

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

// interfaceElevatedEmployee extends Admin, Employee {}

const e1: ElevatedEmployee = {
  name: 'Evgeniy',
  privileges: ['create-server'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
  // type guard
  if (typeof a === 'number' || typeof b === 'number') {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Admin | Employee;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(`Name: ${emp.name}`);
  // type guard with object
  if ('privileges' in emp) {
    console.log(`Privileges: ${emp.privileges}`);
  }
  if ('startDate' in emp) {
    console.log(`Start date: ${emp.startDate}`);
  }
}

printEmployeeInformation(e1);

class Car {
  drive() {
    console.log('Driving a car');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck');
  }

  loadCargo(amount: number) {
    console.log(`Loading cargo: ${amount}`);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  console.log(vehicle.drive());
  // type guard with class
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(100);
  }
}

useVehicle(v1);
useVehicle(v2);

// Discriminated Unions

interface Bird {
  type: 'bird'; // добавляем тип чтобы по нему применить type guard
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed = 0;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log(`Moving at speed ${speed}`);
}

moveAnimal({ type: 'bird', flyingSpeed: 40 });
