import React from "react";

const Button = (props) => {

  
    
  return (
    <div className="d-grid gap-2 col-6 mx-auto">
      <button className="btn btn-primary" type="button" onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  );
};

export default Button;
