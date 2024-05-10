import React from "react";
import { TailOut } from "../Tail";
import { Check } from "lucide-react";

export default function ChatOut({msg}) {
  return (
    <div className="chatContainerBox out">
      <div className="out-going chatBox">
        <span>
          <span>
          {msg}
          </span>
        </span>
        <span className="tail-out">
          <TailOut />
        </span>
        <div className="time-and-read">7:35 pm <Check size={15} style={{marginLeft:"2px"}}/></div>
      </div>
    </div>
  );
}
