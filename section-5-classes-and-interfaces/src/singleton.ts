// singleton - возможен только один экземпляр класса

class DepartmentSingle {
  private static instance: DepartmentSingle;
  info = {
    name: this.name,
    id: this.id,
  };

  // private - конструктор нельзя вызывать извне
  private constructor(public readonly id: string, public name: string) {
    this.name = name;
    this.id = id;
  }

  static getInstance() {
    // this - сам класс т.к. есть static
    if (this.instance) {
      return this.instance;
    }

    this.instance = new DepartmentSingle('12', 'singleDep');
    return this.instance;
  }

  static createEmployee(name: string) {
    return { name: name };
  }
}

const singleDep = DepartmentSingle.getInstance();
const singleDep2 = DepartmentSingle.getInstance();
