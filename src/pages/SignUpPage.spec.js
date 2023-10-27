import { render, screen } from "@testing-library/react";
import SignUpPage from "./SignUpPage";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";

describe("Sign Up Page", () => {
  describe("Layout", () => {
    it("has header", () => {
      render(<SignUpPage />);
      const header = screen.queryByRole("heading", { name: "Sign Up" });
      expect(header).toBeInTheDocument();
    });

    it("has username input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Username");
      expect(input).toBeInTheDocument();
    });

    it("has email input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("E-mail");
      expect(input).toBeInTheDocument();
    });

    it("has password input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password");
      expect(input).toBeInTheDocument();
    });

    it("has password type for password input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password");
      expect(input.type).toBe("password");
    });

    it("has password repeat input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password Repeat");
      expect(input).toBeInTheDocument();
    });

    it("has password type for password repeat input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password Repeat");
      expect(input.type).toBe("password");
    });

    it("has Sign Up button", () => {
      render(<SignUpPage />);
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).toBeInTheDocument();
    });

    it("disables the button initially", () => {
      render(<SignUpPage />);
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).toBeDisabled();
    });
  });
});

describe("Interactions", () => {
  let button;

  const setup = () => {
    render(<SignUpPage />);
    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("E-mail");
    const passwordInput = screen.getByLabelText("Password");
    const passwordRepeatInput = screen.getByLabelText("Password Repeat");

    userEvent.type(usernameInput, "user1");
    userEvent.type(emailInput, "user1@mail.com");
    userEvent.type(passwordInput, "P4ssword");
    userEvent.type(passwordRepeatInput, "P4ssword");

    button = screen.queryByRole("button", { name: "Sign Up" });
  };

  it("enables the button when password and password repeat fields have same value", () => {
    setup();
    expect(button).toBeEnabled();
  });

  it("sends username, email, and password to backend after clicking the button", async () => {
    let reqBody;
    const server = setupServer(
      rest.post("/api/1.0/users", (req, res, ctx) => {
        reqBody = req.body;
        return res(ctx.status(200));
      })
    );
    server.listen();

    setup();

    userEvent.click(button);

    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(reqBody).toEqual({
      username: "user1",
      email: "user1@mail.com",
      password: "P4ssword",
    });
    server.close();
  });

  it("disables button when there is an ongoing api call", async () => {
    let counter = 0;
    const server = setupServer(
      rest.post("/api/1.0/users", (req, res, ctx) => {
        counter += 1;
        return res(ctx.status(200));
      })
    );
    server.listen();

    setup();

    userEvent.click(button);
    userEvent.click(button);

    await screen.findByText(
      "Please check your e-mail to activate your account"
    );

    expect(counter).toBe(1);
    server.close();
  });

  it("displays spinner after clicking the submit", async () => {
    const server = setupServer(
      rest.post("/api/1.0/users", (req, res, ctx) => {
        return res(ctx.status(200));
      })
    );
    server.listen();

    setup();

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    userEvent.click(button);
    await screen.findByText(
      "Please check your e-mail to activate your account"
    );
    const spinner = await screen.findByRole("status");
    expect(spinner).toBeInTheDocument();

    server.close();
  });

  it("displays account activation notification after successful sign up request", async () => {
    const server = setupServer(
      rest.post("/api/1.0/users", (req, res, ctx) => {
        return res(ctx.status(200));
      })
    );
    server.listen();

    setup();
    const message = "Please check your e-mail to activate your account";

    expect(screen.queryByText(message)).not.toBeInTheDocument();

    userEvent.click(button);

    const text = await screen.findByText(message);
    expect(text).toBeInTheDocument();

    server.close();
  });
});
