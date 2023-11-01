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
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
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

function Log(target: any, propertyName: string) {
  console.log('Property decorator');
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

class Product {
  @Log
  title: string;
  @Log
  private _price: number;

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

  printPrice() {
    console.log(this._price);
  }
}
