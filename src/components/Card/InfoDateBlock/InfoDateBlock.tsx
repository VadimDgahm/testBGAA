import styles from './infoDateBlock.module.css';
import React from 'react';
type InfoDateBlockType = {
    title: string,
    value :string
}
export const InfoDateBlock: React.FC<InfoDateBlockType> = ({title, value}) => {
    return <div className={styles.firstData}>
        <div className={styles.title}>{title}</div>
        <span>{value}</span>
    </div>
}