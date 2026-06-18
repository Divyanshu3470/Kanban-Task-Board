import React from "react";
import { useDroppable } from "@dnd-kit/core";

function Column({ id, title, color, count, children }) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className="bg-white rounded-2xl shadow-lg" >
      <div className={`${color} text-white p-4 rounded-t-2xl flex justify-between`}>
        <h2 className="font-bold">{title}</h2>
      </div>
      <div className="p-4 min-h-[500px]">{children}</div>
    </div>
  );
}

export default Column;