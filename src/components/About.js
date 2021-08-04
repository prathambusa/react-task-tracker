import React from 'react';
import {Link} from 'react-router-dom';

const About = () => {
    return (
        <footer>
            <h3 style={{textAlign:'center'}}>Version 1.0.0</h3>
            <Link to='/' style={{textAlign:'center'}} >Go Back</Link>
        </footer>
    )
}

export default About
