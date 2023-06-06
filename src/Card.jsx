import React from "react";
import "./card.css";
const Card = (props) => {
    return (
        <div className="cardbody col-sm-6 col-md-4 col-lg-3 ml-2 mt-1 flex">

            <div className="card-body1 ">
                <div className="card-header1 ">
                    <img src={props.image} alt="" />
                </div>
                <div className="card-footer1 ">
                    <p style={{ fontWeight: "bold" }}>{props.heading}</p>
                    <p style={{ fontSize: "10px" }}>{props.publisher} · {props.date}</p>
                    <p>{props.desc}</p>
                </div>
            </div>
        </div>
    );

}

export default Card;
