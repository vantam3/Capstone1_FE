import React from "react";
import { FaBookOpen, FaLightbulb } from "react-icons/fa";
import "./Science_Fiction.css";
import Header from "../components/Header/Header";
const Science_Fiction = () => {
  return (
    <div className="section-container" style={{ backgroundColor: "#cae2f3" }}>
      <div>
        <Header />
      </div>
      <div className="body">
      <img src={"../../assets/images/Dautruong.jpeg"} alt="Đấu trường sinh tử" />
          <img src={"../../assets/images/Thegioi.webp"} alt="Một thế giới dũng cảm" /> 
          <img src={"../../assets/images/Nepgap.jpeg"} alt="Nếp gấp thời gian" />
          
          
        
        
        
      </div>

     
    </div>
  );
};

export default Science_Fiction;
