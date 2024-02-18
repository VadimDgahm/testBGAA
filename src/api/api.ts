import axios from 'axios';
import {CardDataType} from '../redux/typesReduce';

const instance = axios.create({
    baseURL: 'https://bgaa.by/'
})

export const cardApi = {
    getCard(){
        return instance.get('test')
    },
    updateCards(cards: CardDataType[]){
        return instance.put('test_result', cards)
    }
}