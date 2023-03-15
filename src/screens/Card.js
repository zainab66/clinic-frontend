import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default function Card({ card, index, onDelete }) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="card-title ">{card.title}</p>
          {/* <p className="card-des ">{card.des}</p> */}
          <p className="card-des">{card.description}</p>
          <button className="delete-card" onClick={onDelete}>
            X
          </button>
        </div>
      )}
    </Draggable>
    // <Draggable draggableId={card.id} index={index}>
    //   {(provided) => (
    //     <div
    //       className="card"
    //       {...provided.draggableProps}
    //       {...provided.dragHandleProps}
    //       ref={provided.innerRef}
    //     >
    //       {card.title}
    //     </div>
    //   )}
    // </Draggable>
  );
}
