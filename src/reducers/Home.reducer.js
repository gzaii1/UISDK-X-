import { CREATE_USER, TABLE_DATA, ADD_FILE_LIST, DEL_FILE_LIST } from '../actionTypes'

/* 初始值 */
const initial_value = {
    user:{},
    dataList: [1,2,3],
    fileList:[]
}

export function HomeReducer(state = initial_value, action) {
    switch (action.type){
        case CREATE_USER:
            const user = action.user
            return { ...state, user }
        case TABLE_DATA:
            return { ...state, dataList: action.dataList }
        /* 添加新文件 */
        case ADD_FILE_LIST:
            return {...state, fileList: [...state.fileList, action.newFile]}
        case DEL_FILE_LIST:
            const oldFileList = state.fileList
            const fileList = [...oldFileList.slice(0, action.del_index), ...oldFileList.slice(action.del_index + 1)]
            return {...state, fileList}
        default:
            return state
    }
}