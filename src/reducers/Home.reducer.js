import { CREATE_USER, TABLE_DATA } from '../actionTypes'

/* 初始值 */
const initial_value = {
    user:{},
    dataList: [1,2,3]
}

export function HomeReducer(state = initial_value, action) {
    switch (action.type){
        case CREATE_USER:
            const user = action.user
            return { ...state, user }
        case TABLE_DATA:
            return { ...state, dataList: action.dataList }
        default:
            return state
    }
}