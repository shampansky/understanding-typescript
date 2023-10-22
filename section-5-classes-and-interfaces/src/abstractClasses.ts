abstract class DepartmentAbs {
  // static - свойство доступно без инициализации инстанса (new Department)
  static fiscalYear = 2023;
  // public id: string;
  public name: string;
  protected employees: string[] = [];
  // private - доступно только внутри данного класса,
  // protected - доступно в дочерних классах

  // public, private - ts modifiers

  //public id: string в конструкторе - короткая запись, позволяет не прописывать поле public field id: string;
  // readonly - нельзя перезаписывать
  constructor(public readonly id: string, name: string) {
    this.name = name;
    this.id = id;

    // доступ к static методу или классу внутри класса
    console.log(Department.fiscalYear);
  }

  // static - метод доступен без инициализации инстанса (new Department)
  static createEmployee(name: string) {
    return { name: name };
  }

  describe(this: Department) {
    // не передача аргумента, указываем какой должен быть тип объекта
    console.log(`Department ${this.id}: ${this.name}`);
  }

  abstract getInfo(this: Department) {
    console.log(`Department info: ${{ id: this.id, name: this.name }}`);
  }

  addEmployee(employee: string) {
    // validation etc
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
