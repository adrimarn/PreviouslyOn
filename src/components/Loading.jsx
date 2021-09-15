import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  position: fixed;
  z-index: 1031;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function Loading({color ='#505050'}) {

    return (
        <div className="sweet-loading">
            <PulseLoader color={color} css={override} margin='14' size='17' speedMultiplier='0.5'/>
        </div>
    );
}

export default Loading;