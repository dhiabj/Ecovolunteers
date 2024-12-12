import React from "react";

const TextArea = (props) => {
  return (
    <textarea
      {...props}
      className={
        "bg-eco_dark-brighter text-eco_text p-2 border border-eco_dark-brightest rounded-md block " +
        props.className
      }
    />
  );
};

export default TextArea;
