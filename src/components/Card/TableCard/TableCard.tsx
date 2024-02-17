import React from 'react';
import {CardDataType, ClassesType} from '../../../redux/typesReduce';
import {TableRow} from '../TableRow/TableRow';
import {TableHead} from '../TableHead/TableHead';
import {NumberPeople} from '../TableRow/NumberPeople';
import {useAppDispatch} from '../../../hooks/hooks';
import {setTeacher} from '../../../redux/reducers/cardReducer';
import {TextareaRow} from '../TextareaRow/TextareaRow';
import s from './tableCard.module.css'
type TableCardType = {
    card: CardDataType
}


export const TableCard: React.FC<TableCardType> = ({card}) => {
    const dispatch = useAppDispatch()

    const totalPropsForTableRow = {
        setTeacher: (idTeacher: string, typeClass: ClassesType, numberPodgroup: number,isAll?: boolean ) => {
            dispatch(setTeacher({idTeacher, idCard: card.uniqueId, numberPodgroup, typeClass, isAll }))},
        podgroups: card.podgroups
    }
    return (
        <div className={s.content}>
            <table className={s.table}>
                <TableHead podgroups={card.podgroups} idCard={card.uniqueId}/>
                <tbody>
                <TableRow firstRow={true} title={'Лекции'} value={card.lecturesHours} {...totalPropsForTableRow}/>
                <TableRow  title={'Лобараторнае работы'} value={card.laboratoryHours} {...totalPropsForTableRow}/>
                <TableRow  title={'Практические'} value={card.practicHours} {...totalPropsForTableRow}/>
                <TableRow  title={'Семинарские'} value={card.seminarHours} {...totalPropsForTableRow}/>
                {card.exam && <TableRow  title={'Экзамен'}  {...totalPropsForTableRow}/>}
                {card.offset && <TableRow  title={'Зачет'}  {...totalPropsForTableRow}/>}
                {card.podgroups.length > 1 && <NumberPeople idCard={card.uniqueId} podgroups={card.podgroups}/>}
                <TextareaRow idCard={card.uniqueId} comments={card.additionalInfo}/>
                </tbody>
            </table>
        </div>

    )
}

export default TableCard
