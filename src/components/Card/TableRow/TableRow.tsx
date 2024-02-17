import React from 'react';
import {useAppDispatch} from '../../../hooks/hooks';
import {SelectForCard} from '../Select/SelectForCard';
import {ClassesType, PodgroupsType} from '../../../redux/typesReduce';
import s from './tableRow.module.css'
type TableRowType = {
    title: string,
    value?: string,
    firstRow?: boolean,
    podgroups: PodgroupsType[]
    setTeacher: (idTeacher: string, typeClass: ClassesType, podgroup: number, isAll?:boolean) => void
}

export const TableRow: React.FC<TableRowType> = ({firstRow = false,title, value = '', podgroups, setTeacher}) => {
    const typeValue = determineTypeOfActivity(title)
    const onChangeSetTeacher = (idTeacher: string, numberPodgroup: number, isAll?:boolean) => {
        setTeacher(idTeacher, typeValue, numberPodgroup, isAll)
    }

    return <tr>
        <td className={s.title}>{title}</td>
        <td className={s.title} >{value}</td>
        {podgroups.map((el, i) => <SelectForCard key={i} idTeachers={el[getTeacherType(title)]}  isFirst={firstRow} disabled={value === '0'} onChange={(id: string,isAllClass) => onChangeSetTeacher(id, i,isAllClass)}/>)}

    </tr>
}

const determineTypeOfActivity = (value: string): ClassesType => {
    switch (value) {
        case 'Экзамен':
            return 'exam'
        case 'Лекции':
            return 'lectures'
        case 'Лобараторнае работы':
            return 'lab'
        case 'Семинарские':
            return 'seminar'
        case 'Практические':
            return 'practice'
        case 'Зачет':
            return 'offset'
        default :
            return 'offset'
    }
}

const getTeacherType = (value: string) => {
    switch (value) {
        case 'Экзамен':
            return 'examTeacher'
        case 'Лекции':
            return 'lectureTeacher'
        case 'Лобараторнае работы':
            return 'laboratoryTeacher'
        case 'Семинарские':
            return 'seminarTeacher'
        case 'Практические':
            return 'practiceTeacher'
        default :
            return 'offsetTeacher'
    }
}