const currentPartsReducer = (store = [], action) => {
    if(action.type === 'SET_CURRENT_PARTS'){
        return action.payload;
    } else{
        return state;
    }
}

export default currentPartsReducer;