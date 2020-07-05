import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { LoginActions } from '@actions'
import { request, throttle  } from '@utils'
import { Form } from 'antd'
import { TextField, Button, Slide, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RecipeReviewCard, MediaCard, MediaControlCard, Types, CustomizedAccordions, InteractiveList } from '@components'
import './index.scss'


/* 设置校验 */
const { setErrorMsg } = LoginActions

/* 帮助文字展示 */
const HelpSpan = ({children}) => 
   <div className='login_bottom_help'>{children}</div>

/* 底部文字展示 */
const ShowSpan = ({children}) => {
  const strList = children.split('.')
  return <div className='login_bottom_span'>
          {
            strList.map((str, idx)=> str.length === 0? null:
              <p key={`span${idx}`} style={{textAlign:'center', marginBottom:'.2rem'}}>{str}.</p>)
          }
        </div>
}

/* 中间滑动层 */
const SlideGroup = ({children, height = 300, scrollheight})=>
  Array.isArray(children)? children.map((row, idx)=> 
  <div key={`row${idx}`} className='login_slide' style={{height:height + 'px'}}>
     <Slide  
        direction={idx%2 ===0?'left':'right'}
        in={scrollheight > (idx * height - height * 1.5)}>
            { row }
      </Slide></div>):
      <div style={{height:height + 'px', width:'100%'}}>
      <Slide direction='left' in={true}>
             {children}
       </Slide></div>

/* 头部显示 */
const Header = ()=>
  <div style={{width:'100%', height:'4rem', background:'rgba(255,255,255, .7)'}}></div>

/* 底部显示 */
const Footer = ()=>{
  return <div className='login_footer'>
      <div className='login_footer_img'></div>
      <div className='login_footer_content'>
        <div className='login_footer_p'>
          <p>Other sites</p>
          <p>Ericsson.com</p>
          <p>Extranet</p>
          <p>The Ericsson blog</p>
        </div>

        <div className='login_footer_p'>
          <p>Reporting incidents</p>
          <p>Reporting compliance concerns</p>
          <p>Reporting Environmental, Health and Safety Incidents</p>
          <p>Reporting security and privacy incidents</p>
          <p>Security support line: +46 8 24 10 10</p>
        </div>
      </div>
          
  </div>
}

/* 登录首页 */
const Login = (({history})=> {
    const dispatch = useDispatch()
    const { iptContentLst, errorMsg } = useSelector((state)=> state.LoginReducer)
    const [ form ] = Form.useForm()
    const [scrollheight, setScrollHeight] = useState(0)
    // 测试用, 无实际作用
    const [isSimple, setSimple] = useState(true) 
    // 经过节流处理的setHeight方法
    const [ setHeightByThrottle ] = useState(()=>throttle(setScrollHeight, 10))

    // 用户登录
    function handleLogin(){
      const formObj = form.getFieldsValue()
      // 处理表单的错误信息
      const newMsg = setErrorMsg(formObj)
      dispatch(newMsg)

      if(newMsg.shouldGoToLogin)
      validateLogon()
    }

    // 编辑中...
    function editing(event, key, e){
      console.log(`编辑中...`)
      // 获取表单内容
      const obj = Object.assign({}, errorMsg)

      if(event === 'focus'){
        obj[key] = '(editing)'
      }
      dispatch(setErrorMsg(obj))
      console.log('obj', obj)
    }

    // 调用登录接口
    function validateLogon(){
      history.push('/home')
    }

    // 输入事件
    function onKeyDown(e){
      if(e.keyCode === 13){
        // 点击'回车'时登录
        handleLogin()
      }
    }


    return <div className='Login'>
          {/* 左上角logo */}
          <div className='login_logo' onClick={()=>{ setSimple(!isSimple) }}></div>
          {/* 左侧展示区域 */}
          <div className='login_showboard_bg' onScroll={(e)=>{
            // 只会从上往下显示
            if(e.target.scrollTop > scrollheight)
            setScrollHeight(e.target.scrollTop)
          }}>
            {
              isSimple?null:
              <Header />
            }
            {/* 滚动展示区 */}
          <SlideGroup height={isSimple? 0: 500} scrollheight={scrollheight}>
              <div className='login_slideItem'>
                <div className='login_slideItemCard'>
                  <RecipeReviewCard />
                </div>

                <div className='login_slideItemCard'>
                    <Types />
                </div>
              </div>

              <div className='login_slideItem'> 
                <div className='login_slideItemCard'>
                  <InteractiveList />
                </div>
              </div>

              <div className='login_slideItem'>
                <div className='login_slideItemCard'>
                  <Types />
                </div>
                <div className='login_slideItemCard'>
                   <MediaCard />
                </div>
              </div>

              <div className='login_slideItem'>
                <div className='login_slideItemCard'>
                  <MediaControlCard />
                </div>
                <div className='login_slideItemCard'>
                  <Types />
                </div>
              </div>

              <div className='login_slideItem'>
                <div className='login_slideItemCard'>
                  <RecipeReviewCard />
                </div>
                <div className='login_slideItemCard'>
                  <Types />
                </div>
              </div>

              <div className='login_slideItem'>
                <div className='login_slideItemCard'>
                  <Types />
                </div>
                <div className='login_slideItemCard'>
                  <CustomizedAccordions />
                </div>
              </div>
          </SlideGroup>
          
            {
              isSimple?null:
              <Footer />
            }
          </div>

        {/* 登录表单主体 */}
        <div className='login_ipt_area'>
          <div className='login_title'>Enterprise sign in</div>
          <Form form={form}>
            {
              iptContentLst.map(({key, label, type})=>{
                const isError = key in errorMsg
                return <Form.Item key={key} name={key}>
                          <TextField onKeyDown={onKeyDown} onBlur={(e)=> editing('blur', key, e)} onFocus={(e)=> editing('focus', key, e)} error={isError} helperText={isError?`${label} ${errorMsg[key]}`: null} className="login_ipt" type={type} label={label} variant="outlined" />
                        </Form.Item>
              })
            }
              <Button variant="contained" color='primary' className="login_btn" onClick={handleLogin}>Sign In</Button>
          </Form>
          <HelpSpan><span>Unable to log in?</span><a>help</a></HelpSpan>
          <ShowSpan>*Log-on is only allowed for authorized users. If you are not an authorized user, please exit. In accordance with requirements of data protection laws, we hereby inform you that personally identifiable information will be handled in log files for legal, security and costs reasons.</ShowSpan>
      </div>
    </div>
})

export default Login