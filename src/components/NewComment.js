import React, { useState } from 'react';

const NewComment = ({ onSubmit }) => {
  const [text, setText] = useState();

  const onChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
  };

  return (
    <div className='newComment'>
      <form onSubmit={handleSubmit}>
        <textarea value={text} onChange={onChange} />
        <button type='Submit'>Add Comment</button>
      </form>
    </div>
  );
};

export default NewComment;
