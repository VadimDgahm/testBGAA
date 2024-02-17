import React from 'react';
import {CardDataType} from '../../redux/typesReduce';
import styles from './cardstyles.module.css'
import {TitleCard} from './TitleCard/TitleCard';
import {FirstDateBlock} from './FirstDateBlock/FirstDateBlock';
import TableCard from './TableCard/TableCard';

type CardType = {
    card: CardDataType
}

const MyCard: React.FC<CardType> = ({card}) => {
    return <div className={styles.card}>
        <TitleCard title={card.subjectName}/>
        <FirstDateBlock semestr={card.semestr} course={card.course} groupName={card.groupName}
                        studentsNumber={card.studentsNumber}/>
        <TableCard card={card}/>
    </div>

}
export default MyCard