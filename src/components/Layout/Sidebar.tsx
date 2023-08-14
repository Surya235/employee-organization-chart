import { ChangeEvent, FC, memo, useState } from 'react';
import { debounce } from '../../utilts';
import { IEmployee, IMasterList, serchKeys } from '../Tree/utils';

type ISideBarCard = IEmployee & {
  activeId: string;
  handleClick: (id: string) => void;
};
const SideBarCard: FC<ISideBarCard> = ({
  id,
  name,
  img,
  short,
  team,
  activeId,
  handleClick
}) => (
  <div
    className={`employee-card ${activeId === id ? 'active' : ''}`}
    onClick={() => handleClick(id)}
  >
    <img src={img} alt="employee Image" className="employee-image" />
    <div className="employee-details">
      <h5 className="employee-name">{name}</h5>
      <h6 className="employee-position">
        {short} - {team}
      </h6>
    </div>
  </div>
);

const Sidebar: FC<IMasterList> = ({ masterList, activeId, handleClick }) => {
  const [filterList, setFilterList] = useState(masterList);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.trim().toLowerCase();
    const values = Object.values(masterList);

    if (!search) {
      return setFilterList(values);
    }
    const serachOption: serchKeys = ['designation', 'name', 'short', 'team'];

    const filteredEmp = values.filter((emp) => {
      return serachOption.some((o) => emp[o].toLowerCase().includes(search));
    });

    setFilterList(filteredEmp);
  };

  return (
    <section className="sidebar">
      <input type="search" onChange={debounce(searchHandler)} />
      <section className="sidebar-list">
        {filterList.map((emp) => (
          <SideBarCard
            key={emp.id}
            {...emp}
            activeId={activeId}
            handleClick={handleClick}
          />
        ))}
      </section>
    </section>
  );
};

export default memo(
  Sidebar,
  (prevProps, nextProps) => prevProps.masterList === nextProps.masterList
);
