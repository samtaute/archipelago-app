import { ReactNode } from "react";

const Card = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-md flex-col flex justify-center container mx-auto items-center relative m-2 min-h-20 gap-2 p-8">
      {children}
    </div>
  );
};
export default Card;
