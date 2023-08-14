import { FC } from 'react';
import { IEmployee, IMasterList } from '../Tree/utils';

interface IHeader {
  isShow: boolean;
  handleClick: () => void;
}

const Header: FC<IHeader> = ({ isShow, handleClick }) => {
  return (
    <header className="header">
      <div className="logo">Organization Chart</div>
      <nav className="nav">
        {isShow && (
          <button className="btn" onClick={handleClick}>
            Reset
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
