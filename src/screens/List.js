import React, { useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import CardAdder from './CardAdder';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../reducers/taskSlice';
export default function List({ list, onAddCard, onDeleteCard, onDragEnd }) {
  const dispatch = useDispatch();
  const { taskList } = useSelector((state) => state.task);
  const handleAddCard = (title, description) => {
    onAddCard(list.id, title, description);
  };

  const handleDeleteCard = (cardId) => {
    onDeleteCard(list.id, cardId);
  };

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  // console.log(taskList);
  return (
    <div className="list">
      <h2 className="list-title ">{list.title}</h2>
      <Droppable droppableId={list.id.toString()}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {taskList.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                onDelete={() => handleDeleteCard(card.id)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <CardAdder onAddCard={handleAddCard} />
    </div>
  );
}
