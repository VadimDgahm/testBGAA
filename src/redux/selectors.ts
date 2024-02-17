import {RootState} from './store';

export const selectors = {
    getDataCards:(state:RootState) =>  state.cardsPage.cardsData,
    getTeachers: (state: RootState) =>  state.cardsPage.teachers,
}