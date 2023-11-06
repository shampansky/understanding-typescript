// factory function
function CustomLogger(logString: string) {
  // decorator function
  return function (target: Function) {
    console.log(logString);
    console.log(target);
  };
}

// decorator function
function Logger(target: Function) {
  console.log('logging decorator info...');
  console.log(target);
}

function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        const hookEl = document.getElementById(hookId);
        // const p = new originalConstructor();
        if (hookEl) {
          hookEl.innerHTML = template;
          // this.name was p.name
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}

@Logger // Decorator
@CustomLogger('logging target with custom message') // Decorator
@WithTemplate('<h1>content from decorator</h1>', 'app')
class Person {
  name = 'test';

  constructor() {
    console.log('Creating new instance...');
  }
}

const person1 = new Person();

// Property decorator
function Log(target: any, propertyName: string) {
  console.log('Property decorator');
  console.log(target);
  console.log(propertyName);
}
// Accessor decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// Method decorator
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// Parameter decorator
function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  @Log
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  printPrice() {
    console.log(this._price);
  }

  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = 'This works';

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;

button.addEventListener('click', p.showMessage);

// VALIDATION WITH DECORATORS

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function RequiredField(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'required',
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'positive',
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return true;
}

class Course {
  @RequiredField
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;

courseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const titleEl = document.querySelector('#title') as HTMLInputElement;
  const priceEl = document.querySelector('#price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createCourse = new Course(title, price);
  if (!validate(createCourse)) {
    throw new Error('Invalid input, please try again');
  }
  console.log(createCourse);
});
