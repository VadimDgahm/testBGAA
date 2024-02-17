import React, {useEffect} from 'react';
import  s from './App.module.css';
import {useAppDispatch, useAppSelector} from './hooks/hooks';
import {getCard} from './redux/reducers/cardReducer';
import { Card, Container, CssBaseline, Grid} from '@mui/material';
import MyCard from './components/Card/Card';
import {cardApi} from './api/api';


function App() {
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cardsPage.cardsData)
    useEffect(() => {
        dispatch(getCard())
    }, []);
    const updateCards = () => {
        cardApi.updateCards(cards)
    }
    return (
        <React.Fragment>
            <Container maxWidth="sm">
            <CssBaseline />
            <Grid container spacing={2} >
                {cards.map((card) => (
                    <Grid item xs={12} key={card.uniqueId}>
                        <MyCard card={card}/>
                    </Grid>
                ))}
            </Grid>
                <button className={s.buttonSave} onClick={updateCards}>Сохранить</button>

            </Container>
        </React.Fragment>
    );
}

export default App;
