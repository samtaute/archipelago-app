import { useEffect, useRef } from "react";
import { TreeNodeData } from "../util/buildTree";

const TreeNodeText = ({
  nodeData,
  handleBlur,
  handleKeyDown,
  focusId,
}: {
  nodeData: TreeNodeData;
  handleBlur: (
    event: React.FocusEvent<HTMLDivElement>,
    nodeData: TreeNodeData
  ) => void;
  handleKeyDown: (
    event: React.KeyboardEvent<HTMLDivElement>,
    nodeData: TreeNodeData
  ) => void;
  focusId: string | null;
}) => {
  const thisComponent = useRef<HTMLDivElement>(null);

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    handleKeyDown(event, nodeData);
  };

  const blurHandler = (event: React.FocusEvent<HTMLDivElement>) => {
    handleBlur(event, nodeData);
  };

  useEffect(() => {
    if (focusId === nodeData._id) {
      thisComponent.current!.focus();

      if (thisComponent.current?.childNodes[0]) {
        const range = document.createRange();
        range.setStart(thisComponent.current!.childNodes[0], 0);
        range.collapse(true);

        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }, [focusId, nodeData._id]);

  useEffect(() => {
    thisComponent.current!.focus();
  }, []);

  const { status } = nodeData;

  if (status === "done") {
    return (
      <s>
        <div
          className="node-header-text"
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{
            __html: nodeData.text ? nodeData.text : "",
          }}
          onBlur={blurHandler}
          onKeyDown={keyDownHandler}
          ref={thisComponent}
        ></div>
      </s>
    );
  }

  return (
    <div
      className="node-header-text"
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{ __html: nodeData.text ? nodeData.text : "" }}
      onBlur={blurHandler}
      onKeyDown={keyDownHandler}
      ref={thisComponent}
    ></div>
  );
};

export default TreeNodeText;
