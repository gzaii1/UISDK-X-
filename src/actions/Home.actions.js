import { CREATE_USER, TABLE_DATA } from '../actionTypes'

export const HomeActions = {
    createUser,
    setTableData
}

function createUser(args){
    let user = {}
    if(Object.prototype.toString.call(args) === '[object Object]')
    user = args
    return {
        type: CREATE_USER,
        user
    }
}

function setTableData(dataList){
    return {
        type: TABLE_DATA,
        dataList
    }
}