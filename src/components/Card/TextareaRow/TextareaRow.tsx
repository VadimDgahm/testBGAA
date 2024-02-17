import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch} from '../../../hooks/hooks';
import {addComments} from '../../../redux/reducers/cardReducer';
import {TextareaAutosize} from '@mui/base/TextareaAutosize';
import s from './textarea.module.css'
type TextareaRow = {
    idCard: string,
    comments: string
}
export const TextareaRow = ({idCard,  comments}:TextareaRow) => {
    const [value, setValue] = useState(comments)
    const [idTime, setIdTime] = useState<NodeJS.Timeout>()
    const dispatch = useAppDispatch()
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
        clearTimeout(idTime)
        const id = setTimeout(()=>{
            dispatch(addComments({id:idCard, comments: e.target.value}))
        }, 300)
        setIdTime(id)

    }
    return <tr>
        <td className={s.title}>Примечания(для составления расписания)</td>
        <td className={s.title}></td>
        <td colSpan={2} className={s.cell} ><TextareaAutosize className={s.textaria} value={value}  onChange={onChangeHandler} maxRows={5} minRows={4}/></td>
    </tr>
}