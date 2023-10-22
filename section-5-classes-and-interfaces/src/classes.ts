class Department {
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

  addEmployee(employee: string) {
    // validation etc
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  location: string;
  infoMessage: string = 'IT department';
  // без конструктора использует конструктор родителя
  constructor(id: string, location: string, public admins: string[]) {
    super(id, 'IT');
    this.location = location;
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value');
    }

    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting Department');
    this.lastReport = reports[0];
  }

  addEmployee(employee: string) {
    if (employee === 'Ivan') {
      return;
    }
    this.employees.push(employee);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const reports: string[] = ['first report'];

const accounting = new Department('33', 'Accounting');

const accountingIT = new ITDepartment('it-1', 'Moscow', ['Ivan', 'Max']);

const accountingDep = new AccountingDepartment('acc-1', []);

accounting.addEmployee('Max');
accounting.addEmployee('Manu');

// accounting.employees[2] = 'Anna'; // не работает т.к. employees имеет private

accounting.describe();
accounting.name = 'NEW NAME';
accounting.printEmployeeInformation();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// accountingCopy.describe();
