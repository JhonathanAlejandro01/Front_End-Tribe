import React from 'react'
import '../assets/css/Container.css'
import JoinSpace from './JoinSpace'
import ButtonJoin from './ButtonJoin'
import NameTribe from './NameTribe'
import Video from './Video'
import Footer from './Footer'


const Cointainer = () => {
    return (
        <div class="container">
            <div class="col">
                <JoinSpace />
                <NameTribe />
                <Video />
                <ButtonJoin />
            </div>
            <Footer />
        </div>
    );
}

export default Cointainer;