import { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import { empServer } from '../../../server/employees';
import { IEmployees, IEmployeesArr, constructTree, tree } from '../Tree/utils';
import { axiosGet, axiosPut } from '../../http-handler';
import RootNode from '../Tree/RootNode';
import Header from './Header';

const MainLayout = () => {
  const [employeeTree, setEmployeeTree] = useState<tree['rootNodes']>({});
  const [rootID, setRootId] = useState<tree['rootID']>('');
  const master = useRef<IEmployeesArr>([]);
  const topMangerId = useRef<string>('');

  useEffect(() => {
    const server = empServer();

    let isUnmount = false;

    axiosGet<IEmployees>('/employees').then((res) => {
      if (isUnmount) {
        return;
      }
      handleRes(res);
    });

    return () => {
      isUnmount = true;
      server.shutdown();
    };
  }, []);

  const generateTreeById = (id: string) => setRootId(id);

  const onDrop = (srcId: string, targetId: string) => {
    if (
      srcId === targetId ||
      rootID === srcId ||
      employeeTree[targetId].employee.id === srcId
    ) {
      return;
    }

    axiosPut<IEmployees>(`/employee/${srcId}`, targetId).then((res) =>
      handleRes(res)
    );
  };

  const handleRes = (res: IEmployees | null) => {
    if (!res) {
      return;
    }
    master.current = Object.values(res);
    const tree = constructTree(res);
    topMangerId.current = tree.rootID;
    setEmployeeTree(tree.rootNodes);
    setRootId(tree.rootID);
  };

  return (
    <>
      <Header
        key={topMangerId.current}
        isShow={rootID !== topMangerId.current}
        handleClick={() => generateTreeById(topMangerId.current)}
      />
      <main>
        <Sidebar
          key={rootID}
          activeId={rootID}
          handleClick={generateTreeById}
          masterList={master.current}
        />
        <RootNode rootID={rootID} rootNodes={employeeTree} onDrop={onDrop} />
      </main>
    </>
  );
};

export default MainLayout;
