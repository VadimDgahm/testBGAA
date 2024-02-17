export type initialStateCardType = {
    cardsData: CardDataType[] | [],
    teachers: TeacherType[] | []
}

export type TeacherType = {
    id: string,
    name: string
}
export type ClassesType = 'lectures' | 'lab' | 'practice' | 'seminar' | 'offset' | 'exam'
export type CardDataType = {
    additionalInfo: string
    countPodgroups: string
    course:string
    exam: boolean
    groupName: string
    laboratoryHours:string
    lecturesHours:string
    offset:boolean
    podgroups: PodgroupsType[]
    practicHours:string
    semestr:string
    seminarHours:string
    studentsNumber:string
    subjectName:string
    uniqueId:string
}
export type PodgroupsType = {
    countStudents:string
    examTeacher:string
    laboratoryTeacher: string
    lectureTeacher:string
    offsetTeacher:string
    practiceTeacher:string
    seminarTeacher:string
}