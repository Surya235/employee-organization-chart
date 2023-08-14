import { FC, DragEvent } from 'react';
import { IEmployee } from './utils';

type ICard = IEmployee & {
  openModal: (employee: any) => void;
  onDrop: (srcId: string, targetId: string) => void;
};

const Card: FC<ICard> = ({ id, name, designation, img, openModal, onDrop }) => (
  <section
    className="card"
    onClick={openModal}
    draggable
    onDragStart={(e) => e.dataTransfer.setData('srcId', id)}
    onDragOver={(e) => e.preventDefault()}
    onDrop={(e) => {
      e.preventDefault();
      onDrop(e.dataTransfer.getData('srcId'), id);
    }}
  >
    <div className="image-container">
      <img src={img} alt="Profile Image" draggable={false} />
    </div>
    <h4>{name}</h4>
    <h3>{designation}</h3>
  </section>
);

export default Card;
