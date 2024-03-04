export const CheckBubble = ({
  checkHandler,
  draggingNode,
}: {
  checkHandler: () => void;
  draggingNode: string|null;
}) => {
  return (
    <div
      className={`rounded-full bg-slate-100 p-2 mx-1 opacity-50 hover:opacity-100 ${!draggingNode ? "group-hover:block" : ""}`}
      onClick={checkHandler}
    >
      <svg
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 1L4.6 11L1 7"
          stroke="#19C8EF"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {draggingNode}
    </div>
  );
};
