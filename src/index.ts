import * as t from "io-ts";

const Employee = t.type({
  id: t.number,
  firstName: t.string,
  lastName: t.string,
});

const Manager = t.intersection([
  Employee,
  t.type({
    employees: t.array(Employee),
  }),
]);

const Staff = t.union([Employee, Manager]);

type Employee = t.TypeOf<typeof Employee>;
type Manager = t.TypeOf<typeof Manager>; // type Manager = Employee | { employees: Employee[] }
type Staff = t.TypeOf<typeof Staff>; // type Staff = Employee | Manager

function print(e: Staff): void {
  if (Employee.is(e)) {
    console.log(`${e.id} - ${e.firstName} ${e.lastName}`);
  }
  if (Manager.is(e)) {
    console.table(e.employees);
  }
}

const employee1 = { id: 1, firstName: "First", lastName: "Employee" };
const employee2 = { id: 2, firstName: "Second", lastName: "Employee" };
const employee3 = { id: 3, firstName: "Third", lastName: "Employee" };
const employee4 = {
  id: "bad-employ",
  firstName: "Third",
  lastName: "Employee",
};
const manager = {
  id: 4,
  firstName: "First",
  lastName: "Manager",
  employees: [employee1, employee2, employee3],
};

const staff: unknown[] = [
  employee1,
  employee2,
  employee3,
  employee4, // wrong type
  manager,
];
staff.filter(Staff.is).forEach(print);
