import { FC } from 'react';
import { IEmployee } from './utils';

const EmployeeModal: FC<{ employee: IEmployee; onClose: () => void }> = ({
  employee: { img, name, designation, team },
  onClose
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <img src={img} alt="employee" className="modal-image" />
        <h3>{name}</h3>
        <h5>{designation}</h5>
        <h5>{team}</h5>
      </div>
    </div>
  );
};

export default EmployeeModal;
