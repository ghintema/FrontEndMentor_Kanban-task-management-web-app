import { createSlice } from '@reduxjs/toolkit'

const initialState = {'123': {name:'card name', 
                              id:'123',
                              description:'This is to be done', 
                              columnId:'', 
                              boardColumnIds:[''], 
                              subTasks:{'321': 
                                {name: 'sub task', 
                                 id:'321', 
                                 status: 'open'}}}};


// every card has exactly and always ONE columnId (the one it is sittin on) but can have zero to whatever columnIds, wich are potential new target-columns insige the board. This is important as selection-options for a column change.

export const cardsSlice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        addCardToCards(cards, action) { // expects a complete card-object as payload
            const newCardId = action.payload.id;
            cards[newCardId] = action.payload;
        },
        removeCardFromCards(cards, action) { // expects a string with id to be deleted
            const cardId = action.payload
            delete cards[cardId] // 'delete' removes single keys in an entire object.
        },
        addBoardColumnIdToCard(cards, action) { 
            const [ cardId, columnId ] = action.payload;
            cards[cardId].boardColumnIds.push(columnId);
        },
        removeBoardColumnIdFromCard(cards, action) {
            const [ cardId, columnId ] = action.payload;
            cards[cardId].boardColumnIds = cards[cardId].boardColumnIds.filter(id => id !== columnId )
        },
        setColumnIdForCard(cards, action) { // expects two strings in the payload, representing id and columnId 
            const [ cardId, columnId ] = action.payload;
            cards[cardId].columnId = columnId;   
        },
        addSubTaskToCard(cards, action) {
            const [ cardId, subTask ] = action.payload;
            cards[cardId].subTask.push(subTask);
        },
        removeSubTaskFromCard(cards, action) {
            const [ cardId, subTaskId ] = action.payload;
            delete cards[cardId].subTask[subTaskId];
        }
    }
})


export const selectCards = (state) => {
    return state.cards;
}

export const {  addCardToCards, 
                removeCardFromCards, 
                addBoardColumnIdToCard, 
                removeBoardColumnIdFromCard, 
                addSubTaskToCard,
                removeSubTaskFromCard,
                setColumnIdForCard } = cardsSlice.actions;
export default cardsSlice.reducer;