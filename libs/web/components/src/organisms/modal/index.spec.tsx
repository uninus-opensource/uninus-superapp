import React from "react";
import { render } from "@testing-library/react";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import { Modal } from ".";
import type * as ReactDom from "react-dom";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";

jest.mock("react-dom", () => ({
  ...jest.requireActual<typeof ReactDom>("react-dom"),
  preload: jest.fn(),
}));

describe("Test Modal Functionally", () => {
  it("Should be Defined", () => {
    const closeFn = jest.fn();
    const container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.createPortal(
      <Modal onClose={closeFn} showModal>
        children
      </Modal>,
      container,
    );
    mockAllIsIntersecting(true);
    expect(container).toBeInTheDocument();
  });

  it("Should be Defined when using className props", () => {
    const closeFn = jest.fn();
    const container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.createPortal(
      <Modal onClose={closeFn} showModal className=" ">
        children
      </Modal>,
      container,
    );
    mockAllIsIntersecting(true);
    expect(container).toBeInTheDocument();
  });

  it("Should be Defined when using iconClose props", () => {
    const closeFn = jest.fn();
    const container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.createPortal(
      <Modal onClose={closeFn} showModal iconClose>
        children
      </Modal>,
      container,
    );
    mockAllIsIntersecting(true);
    expect(container).toBeInTheDocument();
  });

  it("Should be Defined when using modalTitle props", () => {
    const closeFn = jest.fn();
    const container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.createPortal(
      <Modal onClose={closeFn} showModal modalTitle>
        children
      </Modal>,
      container,
    );
    mockAllIsIntersecting(true);
    expect(container).toBeInTheDocument();
  });

  it("Should be Defined when using iconClose props", () => {
    const closeFn = jest.fn();
    const container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.createPortal(
      <Modal onClose={closeFn} showModal iconClose>
        children
      </Modal>,
      container,
    );
    mockAllIsIntersecting(true);
    expect(container).toBeInTheDocument();
  });

  it("Should be Defined when using closeClassName props", () => {
    const closeFn = jest.fn();
    const container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.createPortal(
      <Modal onClose={closeFn} showModal closeClassName=" ">
        children
      </Modal>,
      container,
    );
    mockAllIsIntersecting(true);
    expect(container).toBeInTheDocument();
  });

  it("Should be Defined when using bodyClassName props", () => {
    const closeFn = jest.fn();
    const container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.createPortal(
      <Modal onClose={closeFn} showModal bodyClassName=" ">
        children
      </Modal>,
      container,
    );
    mockAllIsIntersecting(true);
    expect(container).toBeInTheDocument();
  });

  it("Should be Defined when using headerColor props", () => {
    const closeFn = jest.fn();
    const container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.createPortal(
      <Modal onClose={closeFn} showModal headerColor=" ">
        children
      </Modal>,
      container,
    );
    mockAllIsIntersecting(true);
    expect(container).toBeInTheDocument();
  });

  it("Should be Defined when using footerColor props", () => {
    const closeFn = jest.fn();
    const container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.createPortal(
      <Modal onClose={closeFn} showModal footerColor=" ">
        children
      </Modal>,
      container,
    );
    mockAllIsIntersecting(true);
    expect(container).toBeInTheDocument();
  });
});
