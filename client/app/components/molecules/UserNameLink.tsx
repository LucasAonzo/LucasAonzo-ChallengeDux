import React from "react";
import { Text } from "../atoms";

interface UserNameLinkProps {
  name: string;
  onClick: () => void;
}

// Nombre clickeable que abre el modal de edición
export function UserNameLink({ name, onClick }: UserNameLinkProps) {
  return (
    <Text
      onClick={onClick}
      style={{
        color: '#0763E7',
        fontWeight: 'bold',
        fontSize: '14px',
        textDecoration: 'underline',
        cursor: 'pointer'
      }}
    >
      {name}
    </Text>
  );
}
