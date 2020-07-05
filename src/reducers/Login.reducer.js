import { SET_ERROR_MSG } from '../actionTypes'

/* 初始值 */
const initial_value = {
    // 登录表单内容
    iptContentLst: [{
        key:'user_id',
        label:'User Id',
        type:'text',
      },{
        key:'user_pwd',
        label:'Password',
        type:'password',
      },],
    // 错误信息提醒
    errorMsg:{}
}

export function LoginReducer(state = initial_value, action) {
    switch (action.type){
        case SET_ERROR_MSG:
            return { ...state, errorMsg:action.errorMsg }
        default:
            return state
    }
}