import React from 'react';
import {useAppDispatch} from '../../../hooks/hooks';
import {addPodgroup, deletePodgroup} from '../../../redux/reducers/cardReducer';
import {PodgroupsType} from '../../../redux/typesReduce';
import s from './tableHead.module.css'
import {TrashIcon} from '../../icon/trash/trash';
type TableHeadType = {
    podgroups: PodgroupsType[]
    idCard: string
}
export const TableHead: React.FC<TableHeadType> = ({podgroups, idCard}) => {
    const dispatch = useAppDispatch()
    const onClickAddPodgroup = () => {
        dispatch(addPodgroup({id: idCard}))
    }
    const onClickDeletePodgroup = () => {
        dispatch(deletePodgroup({id: idCard}))
    }

    return <thead>
    <tr className={s.rowHeader}>
        <th className={`${s.first} ${s.cell}`}>Занятие</th>
        <th className={s.cell}> Часы</th>
        {podgroups.length > 1
            ? <>
                {podgroups.map((el, i) =>
                    <th key={i} className={`${s.first} ${s.cell}`}>
                        <div className={s.cellContent}>
                            <div className={s.title}>Подгруппа {++i}</div>
                            {i === 2 && <button className={s.buttonRemove} onClick={onClickDeletePodgroup}><TrashIcon/></button>}
                        </div>
                    </th>)
                }
            </>
            : <th className={s.cell} >Преподаватель <button onClick={onClickAddPodgroup}>+</button></th>}
    </tr>
    </thead>
}