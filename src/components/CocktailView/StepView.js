import React, { useRef } from 'react';
import styled from 'styled-components';

const StepStyles = styled.li`
  background-color: ${(props) => props.theme.cloudColor};
  border: ${(props) =>
    props.selected ? `2px solid ${props.theme.link.blue}` : 'none'};
`;

export default (props) => {
  const onStepSelect = () => {
    props.onStepClick(parseInt(props.num));
  };

  return (
    <StepStyles selected={props.selected} onClick={onStepSelect}>
      <span>{props.num}</span>
      <div>{props.text}</div>
    </StepStyles>
  );
};
