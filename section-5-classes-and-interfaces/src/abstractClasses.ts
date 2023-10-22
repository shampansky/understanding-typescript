abstract class DepartmentAbs {
  constructor(public readonly id: string, public name: string) {
    this.name = name;
    this.id = id;
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  // abstract - в дочерних классах должен быть такой метод
  // не имеет логики
  abstract describe(this: Department): void;
}

class ITDep extends DepartmentAbs {
  location: string;
  infoMessage: string = 'IT department';

  constructor(id: string, location: string, public admins: string[]) {
    super(id, 'IT');
    this.location = location;
  }

  describe() {
    console.log('it department');
  }
}
