import React from 'react'
import { Menu } from 'antd'
import './index.scss'

const { SubMenu } = Menu

export const Left = ({dataList}) =>{
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