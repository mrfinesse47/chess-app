import styled from "styled-components";
import Link, { LinkProps } from "next/link";
import { StyledButton, ButtonProps } from "../button/button";
import React from "react";
/* eslint-disable-next-line */
export interface LinkButtonProps
  extends LinkProps,
    Pick<ButtonProps, "variant"> {
  children: React.ReactNode;
}
const StyledLinkButton = styled(StyledButton)``;

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ variant = "primary", children, ...props }, ref) => {
    return (
      <Link {...props} passHref>
        <StyledLinkButton as={"a"} variant={variant} ref={ref}>
          {children}
        </StyledLinkButton>
      </Link>
    );
  }
);

export default LinkButton;
