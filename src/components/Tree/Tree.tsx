import { FC, DragEvent } from 'react';
import { IEmployee, rootNode } from './utils';
import Card from './Card';

interface ITreeEl {
  id: string;
  nodeInfo: rootNode;
  openModal: (employee: IEmployee) => void;
  onDrop: (srcId: string, targetId: string) => void;
}

const TreeNode: FC<ITreeEl> = ({ id, nodeInfo, openModal, onDrop }) => {
  const node = nodeInfo[id];

  if (!node) {
    return null;
  }
  const childIds = Object.keys(nodeInfo[id].children);
  const empDetails = nodeInfo[id].employee;

  return (
    <li>
      <Card
        {...empDetails}
        openModal={() => openModal(empDetails)}
        onDrop={onDrop}
      />
      {!!childIds.length && (
        <ul>
          {childIds.map((childId) => (
            <TreeNode
              key={childId}
              id={childId}
              nodeInfo={nodeInfo}
              openModal={openModal}
              onDrop={onDrop}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
