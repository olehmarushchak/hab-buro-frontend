import React, { useEffect } from "react";

interface Props {
  status: string;
  setUpdate: React.Dispatch<React.SetStateAction<string>>;
}

export const AdminMessage: React.FC<Props> = ({ status, setUpdate }) => {
  useEffect(() => {
    setTimeout(() => {
      setUpdate("");
    }, 5000);
  }, []);

  return <p className="AdminPage__message">{status}</p>;
};
