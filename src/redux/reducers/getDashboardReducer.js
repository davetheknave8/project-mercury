// Reducer to grab all PCNs, EOLs, and NPIs.
const getDashboard = (state = [], action) => {
    switch (action.type) {
        case 'SET_DASHBOARD':
            return action.payload;
        default:
            return state;
    }

}



export default getDashboard;