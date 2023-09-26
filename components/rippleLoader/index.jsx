import React from "react";
import * as styles from './index.module.css'

const RippleLoader = () => {
    return(
        <div className={`${styles.container}`}>
            <div className={`${styles.bounce2}`}>
            <img src={'loading.png'}/>
            </div>
                <button></button>
                <button></button>
                <button></button>
                <button></button>
                <button></button>
        </div>
    )
}

export default RippleLoader