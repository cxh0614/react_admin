import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon, } from 'antd';

import menuList from '../../config/menu-config'; 
import logo from '../../assets/images/logo.png';
import './index.less'

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

//装饰器 --> 向外暴露 withRouter(LeftNav) 生成新组件
//withRouter作用： 给非路由组件传递路由组件三个属性（history,location,match）
@withRouter
class LeftNav extends Component {

  static propTypes = {
    opacity: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
    //创建菜单
    const openKeys = [];
    this.menus = this.createMenu(menuList, openKeys);
    this.state = {
      openKeys
    }
  }

  createItem(item) {
    return <Item key={item.key}>
    <Link to={item.key}>
      <Icon type={item.icon} />
      <span>{item.title}</span> 
    </Link>
  </Item>
  }

  //创建菜单项的函数
  createMenu(menuList, openKeys) {
    //判断是一级菜单还是二级菜单
    const { pathname } = this.props.location;
    return menuList.map((menu) => {
      const children = menu.children;
      if (children) {
        //二级菜单
        return <SubMenu
          key={menu.key}
          title={<span><Icon type={menu.icon} /><span>{menu.title}</span></span>}
        >
        {
          children.map((item) => {
            if (pathname === item.key) {
              openKeys.push(menu.key)
            }
            return this.createItem(item)
          })
        }
        </SubMenu>
      } else {
        //一级菜单
        return this.createItem(menu);
      }
    })
  }

  handleOpenChange = (openKeys) => {
    this.setState({openKeys})
  }

  handleClick = () => {
    this.setState({openKeys: []})
  }

  render() {
    const { opacity, location: {pathname} } = this.props;
    return (
      <Fragment>
        <Link to='/home' className="logo" onClick={this.handleClick}>
          <img src={ logo } alt="logo"/>
          <h1 style={{opacity}}>硅谷后台</h1>
        </Link>
        <Menu theme="dark" selectedKeys={[pathname]} mode="inline" openKeys={this.state.openKeys} onOpenChange={this.handleOpenChange}>
          {
            this.menus
          }
        </Menu>
      </Fragment>
    )
  }
}

export default LeftNav;