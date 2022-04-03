import React from "react";
import styled, { css } from "styled-components";
/* eslint-disable-next-line */
export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "primary" | "secondary";
}

export const StyledButton = styled.button<Pick<ButtonProps, "variant">>`
  padding: 1em;
  color: white;
  ${(props) => {
    if (props.variant === "primary") {
      return css`
        background: orange;
      `;
    }
    return css`
      background: blue;
    `;
  }}
`;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", ...props }, ref) => {
    return <StyledButton variant={variant} {...props} ref={ref} />;
  }
);

export default Button;
