import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { HomeActions } from '@actions'
import { request } from '@utils'
import { Button, Tabs, Table, Select, Input, Form, Upload, Tag } from 'antd'
import { blue } from '@ant-design/colors'
import { DeleteFilled, DownloadOutlined } from '@ant-design/icons'
import { Header, Main, Left } from '@components'
import './index.scss'

const { createUser, setTableData, addFileList, delFileList } = HomeActions
const { TabPane } = Tabs
const { Option } = Select 
const { Search } = Input

function callback(key) {
    console.log(key)
  }
//   展示用start---------------------------------------


// Tab组切换
const TabsList = (props)=>{
  const dispatch = useDispatch()
  const { user, dataList, fileList } = useSelector((state)=> state.HomeReducer)

  useEffect(()=>{
    console.log('fileList', fileList) 
  })
  const current_datasource = fileList
  
  const current_columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width:'10%',
      render:(...args)=>{
        // 显示用序号, 无实际作用
        const num = args[2] + 1
        return <>{ num }</>
      }
    },
    {
      title: 'FILE_NAME',
      dataIndex: 'file_name',
      key: 'file_name',
      width:'45%'
    },
    {
      title: 'OPERATION',
      dataIndex: 'operation',
      key: 'operation',
      width:'45%',
      render:(...args)=>{
        return <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center'}}>
                <DeleteFilled onClick={()=>{
                    dispatch(delFileList(args))
                }}/>
            </div>
      }
    },
  ]

  
  const history_datasource = [
    {
      key: '1',
      id: 1,
      project_name: 'GZ_CEE_NEXT_PA1',
      cee_version:'drop35',
      run_time: '2020-09-09 15:12:23',
      task_statu:'RUNNING',
      operation:''
    },
    {
      key: '2',
      id: 1,
      project_name: 'GZ_CEE_NEXT_PA1',
      cee_version:'drop35',
      run_time: '2020-09-09 15:12:23',
      task_statu:'RUNNING',
      operation:''
    },
    {
      key: '3',
      id: 1,
      project_name: 'GZ_CEE_NEXT_PA1',
      cee_version:'drop35',
      run_time: '2020-09-09 15:12:23',
      task_statu:'SUCCESS',
      operation:''
    },
    {
      key: '4',
      id: 1,
      project_name: 'GZ_CEE_NEXT_PA1',
      cee_version:'drop35',
      run_time: '2020-09-09 15:12:23',
      task_statu:'SUCCESS',
      operation:''
    },
    {
      key: '5',
      id: 1,
      project_name: 'GZ_CEE_NEXT_PA1',
      cee_version:'drop35',
      run_time: '2020-09-09 15:12:23',
      task_statu:'RUNNING',
      operation:''
    },
    {
      key: '6',
      id: 1,
      project_name: 'GZ_CEE_NEXT_PA1',
      cee_version:'drop35',
      run_time: '2020-09-09 15:12:23',
      task_statu:'RUNNING',
      operation:''
    },
    
  ]
  
  const history_columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Project_Name',
      dataIndex: 'project_name',
      key: 'project_name',
    },
    {
      title: 'CEE_Version',
      dataIndex: 'cee_version',
      key: 'cee_version',
    },
    {
      title: 'RUN_TIME',
      dataIndex: 'run_time',
      key: 'run_time',
    },
    {
      title: 'TASK_STATU',
      dataIndex: 'task_statu',
      key: 'task_statu',
    },
    {
      title: 'OPERATION',
      dataIndex: '0peration',
      key: 'operation',
      align:'center',
      render:(...args)=>{        
        return args[1].task_statu === 'SUCCESS'?
        <div style={{display:'flex', justifyContent:'space-around'}}>
        <DeleteFilled />
        <DownloadOutlined />
        </div>:<DeleteFilled />
      }
    },
  ]

  const tagRender = ({value})=>
     <Tag key={value.key} color='cyan'>{value.name}</Tag>
  

    return <div className='TabsList'>
          <Form>
            <div className='tab'>
            <Tabs 
              defaultActiveKey="1" 
              onChange={callback}
              tabPosition='top'
              type='card'
              animated={{inkBar:true, tabPane:true}}
              >
              {/* Current tab */}
              <TabPane tab="Current" key="1">
                <div className='tab_content'>
                  <div className='tab_content_iptarea'>
                    <Form.Item>
                      <Select placeholder='site' className='tab_content_select'>
                        <Option key='GZ'>GZ</Option>
                        <Option key='ZZ'>ZZ</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item>
                      <Select placeholder='cee_version' className='tab_content_select'>
                        <Option key='drop25'>drop25</Option>
                        <Option key='drop26'>drop26</Option>
                        <Option key='drop27'>drop27</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label='project_name'>
                      <Input placeholder='project_name'  className='tab_content_project_name' />
                    </Form.Item>
                  </div>

                  <div className='tab_content_upload'>
                    
                      <Select
                        placeholder='upload input files(at least 1 excel and 1 config yaml file)' 
                        mode='multiple' 
                        tagRender={tagRender}
                        style={{ width: '100%' }}
                        value={fileList}
                        options={fileList}
                        open={false}
                      />
                      <Upload
                          isImageUrl={false}
                          showUploadList={false}
                          multiple={true}
                          customRequest={()=>{}}
                          onChange={(e)=>dispatch(addFileList(e))} 
                        >
                          <Button type='primary' style={{marginLeft:'.5rem'}}>Upload</Button>
                        </Upload>
                    </div>

                    <div className='tab_content_table'>
                    <Table 
                        bordered={true}
                        dataSource={current_datasource} 
                        rowKey='key'
                        columns={current_columns}
                        pagination={false}
                        size='small'
                        locale={{emptyText:<div style={{width:'100%', height:'3rem', lineHeight:'3rem'}}>No file selected.</div>}}
                      />
                      </div>
                    <div className='tab_content_generator_btn'>
                        <Button onClick={()=>{
                          console.log(`fileList`, fileList.map(({originFileObj})=>{
                            return originFileObj
                          }))
                        }}>Generator Config</Button>
                    </div>
                </div>
              </TabPane>

              {/* History tab */}
              <TabPane tab="History" key="2">
                <div className='tab_content'>
                  <div className='tab_content_iptarea'>
                    <div className='tab_content_delete_btn'>
                      <Button type='primary' danger>DELETE</Button>                  
                    </div>
                  </div>

                  <div className='tab_content_table'>
                    <Table 
                      bordered={true}
                      rowKey='key'
                      dataSource={history_datasource} 
                      columns={history_columns} 
                      rowSelection={{
                        type: 'checkbox',
                        // ...rowSelection,
                      }}
                      />
                  </div>
                </div>
              </TabPane>
              </Tabs>
            </div>
        </Form>
    </div>
}

//   展示用end---------------------------------------
const Home = ((props)=> {
    const dispatch = useDispatch()
    const { user, dataList, fileList } = useSelector((state)=> state.HomeReducer)
    const data =  [{
        label:'CONFIG',
        value:'config',
        children:[
            {
                label:'yaml_generator',
                value:'yaml_generator',
            },
            {
                label:'test2',
                value:'test2',
            }
        ]
    }]

    useEffect(()=>{
        setTimeout(()=>{
            dispatch(setTableData([4,5,6,7,0]))
        },6000)
        dispatch(createUser({name:123}))
    },[])

    return <div className='HomePage'>
        <Header />
        <Main>
          <Left dataList={data}/>
          <TabsList />
        </Main>
        
    </div>
})

export default Home