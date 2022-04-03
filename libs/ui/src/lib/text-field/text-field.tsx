import styled from 'styled-components';
import React from 'react';
/* eslint-disable-next-line */
export interface TextFieldProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>  {
  id: string;
  label: string;
}

const StyledTextField = styled.div`
`;
const Input = styled.input``;
const Label = styled.label``;

export const TextField = React.forwardRef<HTMLInputElement,TextFieldProps>(({
  label,
  id,
  ...props
}, ref) =>{
  return (
    <StyledTextField>
      <Label htmlFor={id}>{label}</Label>
      <Input type="text" id={id} {...props} ref={ref}/>
    </StyledTextField>
  );
})

export default TextField;
