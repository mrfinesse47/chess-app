import { render } from "@testing-library/react";

import UserSessionProvider from "./user-session-provider";

describe("UserSessionProvider", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <UserSessionProvider>
        <div>test</div>
      </UserSessionProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
