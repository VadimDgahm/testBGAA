import React, {ChangeEvent} from 'react';
import {Input} from '@mui/material';
import {useAppDispatch} from '../../../hooks/hooks';
import {setNumberPeopleInPodgroup} from '../../../redux/reducers/cardReducer';
import {PodgroupsType} from '../../../redux/typesReduce';
import s from './tableRow.module.css'
type NumberPeopleType = {
    podgroups: PodgroupsType[]
    idCard: string
}

export const NumberPeople: React.FC<NumberPeopleType> = ({idCard, podgroups}) => {
    const dispatch  = useAppDispatch()
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(setNumberPeopleInPodgroup({value: e.target.value, numberPodgroup: e.target.name, idCard}))
    }
    return <tr>
        <td className={s.cell}>Количество человек</td>
        <th className={s.cell}></th>
        {podgroups.map((el,i) =>   <th key={i} className={s.cell}><Input name={i.toString()} type={'number'} value={el.countStudents} onChange={onChangeHandler}/></th>)}
    </tr>
}