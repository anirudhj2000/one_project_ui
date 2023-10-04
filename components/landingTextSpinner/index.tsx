import React from "react";
import styles from './index.module.css';

const ChatNode = () => {
    return(        
        <div className={`${styles.parent}`}>
            <div className={`${styles.string}`}>
                <h1 className={`${styles.greeting} ${styles.en}`}>How to be more productive</h1>
                <h1 className={`${styles.greeting} ${styles.es}`}>How to handle null pointer errors</h1>
                <h1 className={`${styles.greeting} ${styles.de}`}>How to handle null pointer errors</h1>
                <h1 className={`${styles.greeting} ${styles.it}`}>How to handle null pointer errors</h1>
            </div>
        </div>
    )
}

export default ChatNode