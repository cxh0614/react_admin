import React, {Component} from 'react';
import {
  Form, Icon, Input, Button, message
} from 'antd';
import { reqLogin } from '../../api';
import { setItem } from '../../utils/storage-utils'

import logo from '../../assets/images/logo.png';
import './index.less';

const Item = Form.Item;

@Form.create()
class Login extends Component {

  login = (e) => {
    e.preventDefault();

    //获取一组表单的数据，返回值是对象
    //const result = this.props.form.getFieldsValue();
    //获取部分表单数据，返回值是对象
    //const result = this.props.form.getFieldsValue(['username']);
    //获取单个表单数据，返回值是个值
    // const result = this.props.form.getFieldValue('password');
    // console.log(result)
    //表单校验的方法
    this.props.form.validateFields(async (err, values) => {
      // console.log(err, values);
      if (!err) {
        //校验成功
        // console.log( values);
        const { username, password } = values;
        const result = await reqLogin(username, password);
        console.log('result', result);
        //判断是否登录
        if (result.status === 0) {
          //登录成功
          //提示登录成功，保存用户信息，跳转到主页面
          message.success('登录成功~');
          //保存用户数据
          setItem(result.data);
          //已经登录成功，不需要回退了
          this.props.history.replace('/')
        } else {
          //登录失败
          //提示错误
          message.error(result.msg, 2);
        }
      } else {
        //校验失败
        console.log('表单校验失败', err);
      }
    });
  }

  //自定义表单的校验规则
  validator = (rule, value, callback) => {

    //console.log(rule, value)
    const length = value && value.length;
    const pwdReg = /^[a-zA-Z0-9_]+$/;
    //必须调用callback,如果不传参代表成功，如果传参代表校验失败，并且会提示错误
    if (!value) {
      callback('必须输入密码')
    } else if (length < 4) {
      callback('密码必须大于4位')
    }else if (length > 12) {
      callback('密码必须小于12位')
    }else if (!pwdReg.test(value)) {
      callback('密码必须以数字、字母或下划线组成')
    }else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-content">
          <h3>用户登录</h3>
        <Form onSubmit={this.login} className="login-form">
          <Item>
              {
                //getFieldDecorator()返回值是一个高阶组件
                //getFieldDecorator()() 返回一个新的组件，新组件内部就会给传入的组件定义校验规则
                //getFieldDecorator(标识名称，配置对象)(组件)
                //配置对象 --> 属性名固定的对象
                getFieldDecorator("username", {
                  //表单校验的规则
                  rules : [
                    {required: true, whitespace: true, message: '必须输入用户名'},
                    {min : 4, message : '用户名必须大于4位'},
                    {max : 12, message : '用户名必须小于12位'},
                    {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须以数字、字母或下划线组成'}
                  ]
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                )
              }
          </Item>
          <Item>
            {
              getFieldDecorator("password", {
                  rules : [
                    //自定义表单校验规则
                    {validator: this.validator}
                  ]
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                )
            }
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Item>
        </Form>
        </section>
      </div>
    )
  }
}

//export default Form.create({ name: 'normal_login' })(Login)
export default Login;