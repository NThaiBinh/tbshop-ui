import { employeeMapper } from '../utils/employeeMapper'
import { api } from './index'

async function getAllEmployees() {
   return await fetch(`${api}/employees`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((employees) => {
         return {
            code: employees.code,
            data: employees.data.map((employee) => employeeMapper(employee)),
         }
      })
}

async function getEmployeeById(employeeId) {
   return await fetch(`${api}/employees/edit/${employeeId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((employee) => {
         return {
            code: employee.code,
            data: employeeMapper(employee.data),
         }
      })
}

async function createEmployee(employeeInfo) {
   return await fetch(`${api}/employees/create`, {
      method: 'POST',
      credentials: 'include',
      body: employeeInfo,
   })
      .then((response) => response.json())
      .then((result) => result)
}

async function updateEmployee(employeeId, employeeInfo) {
   return await fetch(`${api}/employees/update/${employeeId}`, {
      method: 'PUT',
      credentials: 'include',
      body: employeeInfo,
   })
      .then((response) => response.json())
      .then((result) => result)
}

async function deleteEmployee(employeeId, accountId) {
   return await fetch(`${api}/employees/delete?employeeId=${employeeId}&accountId=${accountId}`, {
      method: 'DELETE',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((result) => result)
}

export { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee }
