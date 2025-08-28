import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Contestant = ({ contestant, index, moveContestant }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CONTESTANT',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'CONTESTANT',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveContestant(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '16px',
        margin: '8px 0',
        border: '10px solid #ff168a', /* Set the border color, width, and style */
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '500px', /* Limit the width of each contestant card */
        transition: 'transform 0.3s ease', // Add the transition here
      }}
    >
      <img
        src={contestant.imageUrl}
        alt={contestant.name}
        style={{ width: '150px', height: '100px', marginRight: '16px', borderRadius: '50%' }}
      />
      <span>{contestant.name}</span>
    </div>
  );
};

export default Contestant;
