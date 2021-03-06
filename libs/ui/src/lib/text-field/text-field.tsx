import styled from "styled-components";
import React from "react";
/* eslint-disable-next-line */
export interface TextFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  label: string;
  hasError?: boolean;
  errorMessage?: string;
}

const StyledTextField = styled.div`
  display: flex;
  flex-flow: column;
  font-size: 1rem;
`;
const Label = styled.label`
  color: white;
`;
const Input = styled.input`
  padding: 1em;
  &::placeholder {
    color: #e1e1e1;
  }
`;

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, id, hasError, errorMessage, ...props }, ref) => {
    return (
      <StyledTextField>
        <Label data-testid={`label-${id}`} htmlFor={id}>
          {label}
        </Label>
        <Input
          type="text"
          data-testid={`input-${id}`}
          id={id}
          {...props}
          ref={ref}
        />
        {hasError && errorMessage ? <div>{errorMessage}</div> : null}
      </StyledTextField>
    );
  }
);

export default TextField;
