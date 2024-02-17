import {FormControl, MenuItem, Select} from '@mui/material';
import {useAppSelector} from '../../../hooks/hooks';
import {selectors} from '../../../redux/selectors';
import {FC, useState} from 'react';
import s from './select.module.css'
import {ArrowIcon} from '../../icon/arrow/arrow';
type SelectForCardType = {
    onChange: (idTeachers: string, isAllClass?: boolean) => void
    disabled: boolean
    isFirst?: boolean
    idTeachers?: string

}
export const SelectForCard: FC<SelectForCardType> = ({idTeachers = '', isFirst = false, onChange, disabled}) => {

    const [numberSelect, setChangeSelect] = useState(0)

    const teachers = useAppSelector(selectors.getTeachers)
    return <td className={s.row} >
        <div className={s.selectRow} >
            <div className={s.select}>
                <FormControl variant="standard" fullWidth>
                    <Select
                        disabled={disabled}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"

                        value={!disabled && idTeachers || numberSelect}
                        onChange={(e) => {
                            onChange(e.target.value.toString())
                        }}
                    >
                        <MenuItem value={0}>Вакансия</MenuItem>
                        {teachers.map(t => <MenuItem onClick={() => setChangeSelect(+t.id)} key={+t.id}
                                                     value={+t.id}>{t.name.split(' ').map((el, i) => i === 0 ? el : `${el[0].toUpperCase()}.`).join(' ')}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>
        {isFirst && <button className={s.buttonArrow} disabled={!idTeachers} onClick={() => onChange(numberSelect.toString(), true)}><ArrowIcon/></button>}
        </div>
    </td>
}