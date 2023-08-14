import { FC, useState } from 'react';
import TreeNode from './Tree';
import { IEmployee, tree } from './utils';
import EmployeeModal from './modal';

const RootNode: FC<
  tree & { onDrop: (srcId: string, targetId: string) => void }
> = ({ rootNodes, rootID, onDrop }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null
  );

  const openModal = (employee: IEmployee) => setSelectedEmployee(employee);

  return (
    <div className="tree">
      <ul>
        <TreeNode
          nodeInfo={rootNodes}
          id={rootID}
          openModal={openModal}
          onDrop={onDrop}
        />
        {selectedEmployee && (
          <EmployeeModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
        )}
      </ul>
    </div>
  );
};

export default RootNode;
