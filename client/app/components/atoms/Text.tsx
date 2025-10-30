import React, { CSSProperties } from "react";

interface TextProps {
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
}

// Span reutilizable para textos con estilos custom
export function Text({ children, style, className, onClick }: TextProps) {
  return (
    <span style={style} className={className} onClick={onClick}>
      {children}
    </span>
  );
}
