import {cardApi} from '../../api/api';
import {CardDataType, ClassesType, initialStateCardType, PodgroupsType, TeacherType} from '../typesReduce';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: initialStateCardType = {
    cardsData: [],
    teachers: []
}

const slice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setNumberPeopleInPodgroup: (state, action: PayloadAction<{
            value: string,
            numberPodgroup: string,
            idCard: string
        }>) => {
            let cardIndex = state.cardsData.findIndex(card => card.uniqueId === action.payload.idCard)
            let card =  state.cardsData[cardIndex]
            // Вычисляем разницу
            let number = Number(card.studentsNumber) - Number(action.payload.value)
            action.payload.numberPodgroup === '0'
                ? number -= Number(card.podgroups[0].countStudents)
                : number -= Number(card.podgroups[1].countStudents)
            const setValues = (value1: number,value2:number) =>{
                card.podgroups[value1].countStudents = action.payload.value
                card.podgroups[value2].countStudents = String(Number(card.studentsNumber) - Number(action.payload.value))
            }
            if(number >= 0 && Number(action.payload.value) >= 0 ){
                Number(action.payload.numberPodgroup) === 0
                    ? setValues(0, 1)
                    : setValues(1, 0)
            }


        },
        setTeacher: (state, action: PayloadAction<{
            idCard: string,
            idTeacher: string,
            typeClass: ClassesType,
            numberPodgroup: number,
            isAll?: boolean
        }>) => {

            const {idCard, typeClass, idTeacher, numberPodgroup} = action.payload
            let card = state.cardsData.find(card => card.uniqueId === idCard)

            if(card){
                let podgroup = card.podgroups[numberPodgroup]
                if(action.payload.isAll){

                    if(card.exam) podgroup.examTeacher = action.payload.idTeacher
                    if(card.offset) podgroup.offsetTeacher = action.payload.idTeacher
                    if(+card.laboratoryHours) podgroup.laboratoryTeacher = action.payload.idTeacher
                    if(+card.lecturesHours) podgroup.lectureTeacher = action.payload.idTeacher
                    if(+card.practicHours) podgroup.practiceTeacher = action.payload.idTeacher
                    if(+card.seminarHours) podgroup.seminarTeacher = action.payload.idTeacher

                }
                else{
                    debugger
                    switch (typeClass) {
                        case 'exam': {
                            podgroup.examTeacher = idTeacher
                            break
                        }
                        case 'lab':
                            podgroup.laboratoryTeacher = idTeacher
                            break
                        case 'offset':
                            podgroup.offsetTeacher = idTeacher
                            break
                        case 'seminar':
                            podgroup.seminarTeacher = idTeacher
                            break
                        case 'lectures':
                            podgroup.lectureTeacher = idTeacher
                            break
                        case 'practice':
                            podgroup.practiceTeacher = idTeacher
                            break
                        default:
                            break
                    }
                }
            }


        },
        addPodgroup: (state, action: PayloadAction<{ id: string }>) => {
            let cardIndex = state.cardsData.findIndex(card => card.uniqueId === action.payload.id)
            if (cardIndex !== -1) {
                let card = state.cardsData[cardIndex]
                let numberStudentsInPodgroup = Number(card?.studentsNumber) / 2
                let firstNumberPodgroup = numberStudentsInPodgroup
                let secondNumberPodgroup = numberStudentsInPodgroup
                if (numberStudentsInPodgroup - Math.floor(numberStudentsInPodgroup)) {
                    firstNumberPodgroup = Math.ceil(firstNumberPodgroup)
                    secondNumberPodgroup = Math.floor(secondNumberPodgroup)
                }
                const newPodgroup: PodgroupsType = {
                    countStudents: secondNumberPodgroup.toString(),
                    examTeacher: '',
                    laboratoryTeacher: '',
                    lectureTeacher: '',
                    offsetTeacher: '',
                    practiceTeacher: '',
                    seminarTeacher: '',
                }
                card.podgroups.push(newPodgroup)
                card.podgroups[0].countStudents = firstNumberPodgroup.toString()
            }
        },
        deletePodgroup: (state, action: PayloadAction<{ id: string }>) => {
            return {
                ...state, cardsData: state.cardsData.map(card => card.uniqueId === action.payload.id
                    ? {...card, podgroups: [{...card.podgroups[0], countStudents: card.studentsNumber}]}
                    : card)
            }
        },
        addComments: (state, action: PayloadAction<{ id: string , comments: string}>) => {
            debugger
            return {
                ...state, cardsData: state.cardsData.map(card => card.uniqueId === action.payload.id
                    ? {...card, additionalInfo: action.payload.comments}
                    : card)
            }
        },

    },
    extraReducers: builder => {
        builder.addCase(getCard.fulfilled, (state, action) => {
            state.teachers = action.payload.teachers
            state.cardsData = action.payload.cardsData
        })
    }
})
export const cardReducer = slice.reducer
export const {addPodgroup, deletePodgroup, setTeacher, setNumberPeopleInPodgroup,addComments} = slice.actions

export const getCard = createAsyncThunk<{
    teachers: TeacherType[],
    cardsData: CardDataType[]
}, undefined>('card/setData', async (arg, thunkAPI) => {
    try {
        let res = await cardApi.getCard()
        return {teachers: res.data.teachers, cardsData: res.data.data}
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})

