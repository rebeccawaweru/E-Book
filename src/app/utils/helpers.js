export  const data = [
    {
        id:1,
        title:`MANUAL: "KILL YOUR ENEMIES"`,
        price:1500,
        qnty:1,
        total:1500,
        format:'manual'
    },
    {
        id:2,
        title:`E-BOOK: "KILL YOUR ENEMIES"`,
        price:700,
        qnty:0,
        total:0,
        format:'soft'
    },
];
export const initialState = {
    step:1
}
export const reducer = (state=initialState,action) => {
    switch(action.type){
        case 'Next':
            return {
                step: state.step + 1
            }
        case 'Prev':
            return {
                step: state.step - 1
            }
        case 'Reset':
            return initialState
        default:
            return state
    }
}