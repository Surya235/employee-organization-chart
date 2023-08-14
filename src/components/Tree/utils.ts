export interface IEmployee {
  id: string;
  name: string;
  designation: string;
  team: string;
  manager: string | null;
  img: string;
  short: string;
}

export interface TreeNode {
  employee: IEmployee;
  children: Record<string, TreeNode>;
}

export interface IMasterList {
  activeId: string;
  masterList: Array<IEmployee>;
  handleClick: (id: string) => void;
}
export type IEmployees = Record<string, IEmployee>;
export type IEmployeesArr = Array<IEmployee>;
export type rootNode = Record<string, TreeNode>;
export type serchKeys = Array<'designation' | 'name' | 'short' | 'team'>;
export type tree = ReturnType<typeof constructTree>;

export const constructTree = (employeeData: IEmployees) => {
  const employeeValues = Object.values(employeeData);
  let rootID: string = '';
  const rootNodes: rootNode = {};

  if (!employeeValues.length) {
    return {
      rootID,
      rootNodes
    };
  }

  employeeValues.forEach((emp) => {
    rootNodes[emp.id] = { employee: emp, children: {} };
  });

  employeeValues.forEach((emp) => {
    if (!emp.manager) {
      rootID = emp.id;
      return;
    }

    const managerNode = rootNodes[emp.manager];

    if (managerNode) {
      managerNode.children[emp.id] = rootNodes[emp.id];
    }
  });

  return {
    rootID,
    rootNodes
  };
};
