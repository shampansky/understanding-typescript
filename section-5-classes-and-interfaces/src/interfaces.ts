// interface - описывает структуру объекта
// различия между interface и type
// https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript

interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

type PersonType = {
  name: string;
  age: number;

  greet(phrase: string): void;
};

let user1: PersonType;

user1 = {
  name: 'Ivan',
  age: 3,
  greet(text) {
    console.log(`${text} this.name `);
  },
};

interface Named {
  // readonly - можно устанавливать только 1 раз
  readonly name: string;
  // необязательное свойство
  outputName?: string;
}

interface WithId {
  id: string;
}

interface Greetable {
  greet(phrase: string): void;
}

// Можно указывать несколько интерфейсов для расширения
interface Greetable2 extends Named, WithId {
  greet(phrase: string): void;
}

// Можно указывать несколько интерфейсов для класса
class Person1 implements Greetable, Named {
  id: string;
  constructor(public name: string, id: string) {
    this.id = id;
  }

  greet(text: string) {
    console.log(`${text} this.name `);
  }
}

class Person2 implements Greetable2 {
  id: string;
  constructor(public name: string, id: string) {
    this.id = id;
  }

  greet(text: string) {
    console.log(`${text} this.name `);
  }
}

// тип можно использовать и Greetable т.к. класс использует его
let user2: Greetable;

user2 = new Person1('Peter', '11');

// Определение функции

type AddFn = (a: number, b: number) => number;

const add: AddFn = (n1, n2) => n1 + n2;

add(3, 2);

interface AddFnInterface {
  (a: number, b: number): number;
}
