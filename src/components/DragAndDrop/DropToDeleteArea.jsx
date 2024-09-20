import { useDroppable } from "@dnd-kit/core";

const DropToDeleteArea = () => {
  const { isOver: isOverDeleteArea, setNodeRef: setDeleteAreaNodeRef } =
    useDroppable({
      id: "delete-task-area",
    });

  return (
    <div
      ref={setDeleteAreaNodeRef}
      style={{
        color: "gray",
        border: "1px solid gray",
        padding: "10px",
        margin: "10px",
        minHeight: "60px",
        backgroundColor: isOverDeleteArea ? "lavender" : "floralwhite",
      }}
    >
      Drop here to delete
    </div>
  );
};

export default DropToDeleteArea;
