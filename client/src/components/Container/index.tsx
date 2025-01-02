import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

/**
 * The outermost container for the application, which constrains the width
 * and height of its children to the full screen.
 *
 * @param children The React children to render within the container.
 * @returns A div element with the children, styled to take up the full screen.
 */
const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div id="container" className="relative overflow-clip w-screen h-screen">{children}</div>;
};

export default Container;