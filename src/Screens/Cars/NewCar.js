import React from "react";
import "./style.css";

function NewCar() {
  return (
    <div className="screen">
      <form className="new__car">
        <div>
          <input placeholder="Car Name" />
          <input placeholder="Car Model" />
          <input placeholder="Car Color" />
          <input placeholder="Car Owner Name" />
          <input placeholder="Car Owner Phone" />
          <input placeholder="Collection Date" type="date" />
          <label class="custom-file-upload">
            <input type="file" />
            Upload Car Image
          </label>
          {/* <input placeholder="Car Picture" type='file' /> */}
          <button>Submit</button>
        </div>
        <div style={{ flex: 1 }}>
          <h2
            style={{
              textAlign: "center",
              color: "#eeb2d5",
              fontWeight: "600",
              letterSpacing: 1,
              fontSize: "2rem",
            }}
          >
            Register a new car
          </h2>
        </div>
      </form>
    </div>
  );
}

export default NewCar;
