import s from './titleCard.module.css';
import React from 'react';
import {BockIcon} from '../../icon/bock/bock';

type TitleCardType = {
    title: string
}
export const TitleCard: React.FC<TitleCardType> = ({title}) => {
    return  <div className={s.title}><BockIcon/><div>{title}</div></div>
}