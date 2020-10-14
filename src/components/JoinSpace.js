import React from 'react'
import '../assets/css/JoinSpace.css';

const JoinSpace = () => {
    let join = "Join Space ";
    return (
        <div class="col justify-content-center">
            <h2 className="join">{join}
                    <span className="name_tribe">Holberton</span>
            </h2>
            <p>No signup or downloads needed.</p>
        </div>
    );
}

export default JoinSpace;