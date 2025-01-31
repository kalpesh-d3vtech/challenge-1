import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Signin from "../pages/signin";
import { apiPOST } from "../utils/apiHandler";

jest.mock("../utils/apiHandler", () => ({
  apiPOST: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.spyOn(window, "alert").mockImplementation(() => {});

describe("Signin Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders the component correctly", () => {
    render(
      <Router>
        <Signin />
      </Router>
    );

    expect(screen.getByText(/Welcome Back 👋/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Please enter your username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/At least 8 characters/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign in/i })).toBeInTheDocument();
  });

  test("validates username and password inputs", () => {
    render(
      <Router>
        <Signin />
      </Router>
    );

    fireEvent.click(screen.getByRole("button", { name: /Sign in/i }));

    expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  test("updates username and password states on input change", () => {
    render(
      <Router>
        <Signin />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText(/Please enter your username/i);
    const passwordInput = screen.getByPlaceholderText(/At least 8 characters/i);

    fireEvent.change(usernameInput, { target: { value: "emilys" } });
    fireEvent.change(passwordInput, { target: { value: "emilyspass" } });

    expect(usernameInput.value).toBe("emilys");
    expect(passwordInput.value).toBe("emilyspass");
  });

  test("shows error for invalid password format", () => {
    render(
      <Router>
        <Signin />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText(/At least 8 characters/i);

    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: /Sign in/i }));

    expect(screen.getByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
  });

  test("navigates to dashboard if already authenticated", () => {
    localStorage.setItem("accessToken", "mockToken");

    render(
      <Router>
        <Signin />
      </Router>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  test("calls API and navigates on successful login", async () => {
    apiPOST.mockResolvedValueOnce({
      token: "mockToken",
      refreshToken: "mockRefreshToken",
    });

    render(
      <Router>
        <Signin />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText(/Please enter your username/i);
    const passwordInput = screen.getByPlaceholderText(/At least 8 characters/i);

    fireEvent.change(usernameInput, { target: { value: "emilys" } });
    fireEvent.change(passwordInput, { target: { value: "emilyspass" } });

    fireEvent.click(screen.getByRole("button", { name: /Sign in/i }));

    await waitFor(() => {
      expect(apiPOST).toHaveBeenCalledWith("/auth/login", {
        username: "emilys",
        password: "emilyspass",
        expiresInMins: 60,
      });
      expect(localStorage.getItem("accessToken")).toBe("mockToken");
      expect(localStorage.getItem("refreshToken")).toBe("mockRefreshToken");
      expect(localStorage.getItem("username")).toBe("emilys");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  test("handles API errors gracefully", async () => {
    apiPOST.mockRejectedValueOnce({
      response: {
        status: 401,
      },
    });

    render(
      <Router>
        <Signin />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText(/Please enter your username/i);
    const passwordInput = screen.getByPlaceholderText(/At least 8 characters/i);

    fireEvent.change(usernameInput, { target: { value: "emilys" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });

    fireEvent.click(screen.getByRole("button", { name: /Sign in/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Invalid credentials. Please check your username and password."
      );
    });
  });
});
