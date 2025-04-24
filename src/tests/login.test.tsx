import Login from "../component/Login/Login"
import { describe, it } from "vitest";
import { render } from "@testing-library/react";

describe("Login component", () => {
  it("Renders login component!", () => {
    render(<Login />);
  });
});
