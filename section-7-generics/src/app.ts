const names: Array<string> = []; // string[]
names[0]?.split(' ');

const promise: Promise<number> = new Promise((resolve) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);
});

// promise.then((data) => {
//   // data.split(' ');
// });

// FUNCTIONS

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value';
  if (element.length === 1) {
    descriptionText = 'Got 1 element';
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} elements`;
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('test'));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}
extractAndConvert({ name: 'Ivan' }, 'name');

// CLASSES

// логика работает только для примитивных типов
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    const index = this.data.indexOf(item);
    if (index === -1) return;
    this.data.splice(index, 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();

textStorage.addItem('10');

// const objectStorage = new DataStorage<object>();

// objectStorage.addItem({ name: 'max' });
// objectStorage.addItem({ name: 'test' });

// UTILITY TYPES

interface CourseGoal {
  title: string;
  description: string;
  date: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  // Partial - если значение присваиваются последовательно, а не одновременно
  const courseGoal: Partial<CourseGoal> = {};

  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.date = date;

  return courseGoal as CourseGoal;
}

const items: Readonly<string[]> = ['one', 'two'];
names.push('three');
console.log(items);
