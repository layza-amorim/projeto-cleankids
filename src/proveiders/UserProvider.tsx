import React, { createContext, useContext, useState } from 'react';

interface UserContextData {
  name: string;
  score: number;
  saveName: (name: string) => void;
  updateScore: (score: number) => void;
}

const UserContextData = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }: any) => {
  const [name, setName] = useState<string>({} as string);
  const [score, setScore] = useState<number>({} as number);

  const saveName = (name: string) => {
    return setName(name);
  };

  const updateScore = (score: number) => {
    return setScore(score);
  };

  return <UserContextData.Provider value={{ name, saveName, score, updateScore }}>{children}</UserContextData.Provider>;
};

export function useUser(): UserContextData {
  const context = useContext(UserContextData);
  return context;
}
