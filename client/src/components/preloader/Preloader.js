import React from "react";
import { Circle2 } from "react-preloaders";

const Preloader = props => {
    return (
        <React.Fragment>
            <Circle2
                color={"#f7f7f7"} //Default #2D2D2D
                bgColor={"#222"} //Default #F7F7F7
                time={1400} //Default #1300
            />
        </React.Fragment>
    );
};

export default Preloader;
