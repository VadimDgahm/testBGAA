import s from './firstDateBlock.module.css'
import React from 'react';
import {InfoDateBlock} from '../InfoDateBlock/InfoDateBlock';
type FirstDateBlockType = {
    groupName: string,
    course: string
    studentsNumber: string
    semestr: string
}
export const FirstDateBlock: React.FC<FirstDateBlockType> = ({groupName, course, studentsNumber,semestr, ...props}) => {
    return <div className={s.firstGroupData}>
        <InfoDateBlock title="Группа" value={groupName}/>
        <InfoDateBlock title="Курс" value={course}/>
        <InfoDateBlock title="Количество курсантов" value={studentsNumber}/>
        <InfoDateBlock title="Семестр" value={semestr}/>
    </div>
}