import { render } from "@testing-library/react";

import LinkButton from "./link-button";

describe("LinkButton", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<LinkButton href="/test">Test</LinkButton>);
    expect(baseElement).toBeTruthy();
  });
});
