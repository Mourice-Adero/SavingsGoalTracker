import React from "react";

type CardProps = {
  children?: React.ReactNode;
};

function Card({ children }: CardProps) {
  return <div className="p-4 bg-white rounded shadow-sm">{children}</div>;
}

export default Card;
