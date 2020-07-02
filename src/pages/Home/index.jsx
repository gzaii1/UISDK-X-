import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { HomeActions } from '@actions'
import { request } from '@utils'
import { Menu, Button, Tabs, Table } from 'antd';
import { blue } from '@ant-design/colors';
import './index.scss'

const { createUser, setTableData } = HomeActions
const { SubMenu } = Menu
const { TabPane } = Tabs

function callback(key) {
    console.log(key);
  }
  

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
//   展示用start---------------------------------------
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const Content = ({children})=>{
  return <div className='content'>{children}</div>
  }

  const Demo = () => (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Current" key="1">
          <Content>
             <Table dataSource={dataSource} columns={columns} />;
          </Content>
      </TabPane>

      <TabPane tab="History" key="2">
        <Content>
             <Table dataSource={dataSource} columns={columns} />;
          </Content>
      </TabPane>
    </Tabs>
  );
  
  

const LeftMenu = ({dataList}) =>{
    return <div className='LeftMenu'> 
    <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline">
                {
                    dataList.map(({children, label, value}, idx1)=>{
                        return <SubMenu key={`submenu${idx1}`} title={label}>
                            {
                                children.map(({label, value}, idx2)=> <Menu.Item key={`menu${idx1}_${idx2}`}>{label}</Menu.Item>)
                            }
                        </SubMenu>
                    })
                }
                <Menu.Item>Item Two</Menu.Item>
                <Menu.Item>Item Three</Menu.Item>
    </Menu>
    </div>
}

const TabsList = (props)=>{
    return <div className='TabsList'>
        <Demo></Demo>
    </div>
}

//   展示用end---------------------------------------


const Home = ((props)=> {
    const dispatch = useDispatch()
    const { user, dataList } = useSelector((state)=> state.HomeReducer)
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
        console.log('request', blue)
        setTimeout(()=>{
            dispatch(setTableData([4,5,6,7,0]))
        },6000)
        dispatch(createUser({name:123}))
    },[])

    return <div className='HomePage'>
        <LeftMenu dataList={data}/>
        <TabsList></TabsList>
    </div>
})

export default Home