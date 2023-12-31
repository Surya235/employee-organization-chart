import Pretender from 'pretender';
import { IEmployees } from '../src/components/Tree/utils';

const employees: IEmployees = {
  '58': {
    id: '58',
    name: 'Mark Hill',
    designation: 'Cheif Executive Officer',
    team: 'Product',
    manager: null,
    img: 'https://i.imgur.com/uk87y7L.jpg',
    short: 'CEO'
  },
  '59': {
    id: '59',
    name: 'Joe Linux',
    designation: 'Cheif Technology Officer',
    team: 'Development & IT',
    manager: '58',
    img: 'https://i.imgur.com/I8N6wle.gif',
    short: 'CTO'
  },
  '60': {
    id: '60',
    name: 'Linda May',
    designation: 'Cheif Bussiness Officer',
    team: 'Bussiness Flow',
    manager: '58',
    img: 'https://i.imgur.com/Id57NSW.jpg',
    short: 'CBO'
  },
  '61': {
    id: '61',
    name: 'John Green',
    designation: 'Cheif Accounting Officer',
    team: 'Finance',
    manager: '58',
    img: 'https://i.imgur.com/NRYrB0l.jpeg',
    short: 'CAO'
  },
  '62': {
    id: '62',
    name: 'Ron Blomquist',
    designation: 'Cheif Information Officer',
    team: 'Development & IT',
    manager: '59',
    img: 'https://i.imgur.com/Xdx7Ptn.jpeg',
    short: 'CIO'
  },
  '63': {
    id: '63',
    name: 'Michael Rubin',
    designation: 'Cheif Innovative Officer',
    team: 'Development & IT',
    manager: '59',
    img: 'https://i.imgur.com/eX7uYfG.jpeg',
    short: 'CIO'
  },
  '64': {
    id: '64',
    name: 'Allice Lopez',
    designation: 'Cheif Communication Officer',
    team: 'Bussiness Flow',
    manager: '60',
    img: 'https://i.imgur.com/waxFbz6.jpg',
    short: 'CCO'
  },
  '65': {
    id: '65',
    name: 'Marry Johnson',
    designation: 'Cheif Brand Officer',
    team: 'Bussiness Flow',
    manager: '60',
    img: 'https://i.imgur.com/Zi7qqQA.jpg',
    short: 'CBO'
  },
  '66': {
    id: '66',
    name: 'Kirk Douglas',
    designation: 'Cheif Bussiness Officer',
    team: 'Bussiness Flow',
    manager: '60',
    img: 'https://i.imgur.com/0hhtbTn.jpeg',
    short: 'CBO'
  },
  '67': {
    id: '67',
    name: 'Erica Reel',
    designation: 'Cheif Bussiness Officer',
    team: 'Bussiness Flow',
    manager: '60',
    img: 'https://i.imgur.com/I9XFqdd.jpg',
    short: 'CBO'
  }
};

export const empServer = () =>
  new Pretender(function () {
    this.get('/employees', () => [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(employees)
    ]);

    this.put('/employee/:empId', (request) => {
      const empId = request.params.empId as string;
      const managerId = request.requestBody;
      const emp = employees[empId];

      if (!emp || !employees[managerId]) {
        return [
          404,
          { 'Content-Type': 'application/json' },
          JSON.stringify(employees)
        ];
      }
      emp.manager = managerId;

      return [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(employees)
      ];
    });
  });
