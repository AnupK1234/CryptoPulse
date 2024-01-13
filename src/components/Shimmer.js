import { Card } from "@mui/material";
import React from "react";

function Shimmer() {
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent:"space-evenly" }}>
        {[...Array(8)].map((_, index) => (
          <Card key={index} sx={{ width: 345, height: 450, backgroundColor: "#F1EFEF", opacity: 0.1 }}></Card>
        ))}
      </div>
    </>
  );
}

export default Shimmer;
