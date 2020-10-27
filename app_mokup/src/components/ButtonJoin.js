import React from 'react';
import '../assets/css/ButtonJoin.css'

const ButtonJoin = () => {
    return (
        <div className="d-flex justify-content-center">
            <button id="btnBlur" type="button" class="btn mx-2 buttonjoin">Blur</button>
            <button id="btnVirtualBackground" type="button" class="btn mx-2 buttonjoin">Backgound</button>
        </div>
    );
}

export default ButtonJoin;