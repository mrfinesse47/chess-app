import React from "react";
import { render } from "@testing-library/react";

import Index from "../pages/index";
import { UserSessionProvider } from "@chess/features";

describe("Index", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <UserSessionProvider>
        <Index />
      </UserSessionProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
