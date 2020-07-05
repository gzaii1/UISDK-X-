import { 
    CREATE_USER, 
    TABLE_DATA, 
    ADD_FILE_LIST,
    DEL_FILE_LIST,
} from '../actionTypes'

export const HomeActions = {
    createUser,
    setTableData,
    addFileList,
    delFileList,
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

/* 添加新的file */
function addFileList(fileObj){
    const { file } = fileObj
    const newFile = Object.assign({}, file)
    newFile.key = newFile.uid
    newFile.file_name = newFile.name
    return {
        type: ADD_FILE_LIST,
        newFile
    }
}

/* 删除del */
function delFileList(args){
    return {
        type: DEL_FILE_LIST,
        del_index:args[2]
    }
}