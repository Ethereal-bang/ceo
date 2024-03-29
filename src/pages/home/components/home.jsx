import React, { useRef } from 'react'
//引入antd
import { Spin, message } from "antd"
//引入antd css文件
import 'antd/dist/antd.css'
// import axios from "axios"
import { useState } from 'react'
import { auth } from "../../../guard/guard_config"
import "../style/home.css"
import "../style/antd.css"
import img_01 from "../style/02.jpg"
import img_02 from "../style/04.png"


//登录界面
export default function Home(props) {
    const [bg_filter, setBg_filter] = useState(true)
    const [login_options_state, setLogin_options_state] = useState("student")
    //设置发送登录请求时的加载动画状态
    const [wait_animation, setWait_animation] = useState(false)
    //如果用户名或者密码为空则提示的状态
    const [pas_user, setPas_user] = useState({ password: false, username: false })
    //获取用户名和密码的节点
    const username = useRef()
    const password = useRef()
    //展示提示信息
    let checkPassword_change = () => {
        return event => {
            if (!event.target.value) {
                setPas_user(() => ({ password: true, username: pas_user.username }))
            }
            else {
                setPas_user(() => ({ password: false, username: pas_user.username }))
            }
        }
    }
    let checkUser_change = () => {
        return (event) => {
            if (!event.target.value) {
                setPas_user(() => ({ password: pas_user.password, username: true }))
            }
            else {
                setPas_user(() => ({ password: pas_user.password, username: false }))
            }
        }
    }
    let checkPassword_blur = () => {
        return event => {
            if (!event.target.value) {
                setPas_user(() => ({ password: true, username: pas_user.username }))
            }
        }
    }
    let checkUser_blur = () => {
        return event => {
            if (!event.target.value) {
                setPas_user(() => ({ password: pas_user.password, username: true }))
            }
        }
    }
    //设置背景变为模糊
    let Bg_filter_Y = () => {
        setBg_filter(() => false)
    }
    //设置背景变为清晰
    let Bg_filter_N = () => {
        setBg_filter(() => true)
    }
    //当点击不同的登录端的时候，更换当前登录的权限
    let changeLogin_options_state_stu = () => {
        setLogin_options_state(() => "student")
    }
    let changeLogin_options_state_teac = () => {
        setLogin_options_state(() => "teacher")
    }
    let changeLogin_options_state_manager = () => {
        setLogin_options_state(() => "manager")
    }
    
    //设置请求的统一路径
    // const _axios = axios.create({
    //     baseURL: "http://localhost:3000"
    // })

    //按下enter键后登陆
    document.onkeyup = (e)=>{
        if(e.key==="Enter"){
            login()
        }
    }

    //登录的回调
    let login = () => {
        const { current: { value: user } } = username
        const { current: { value: pass } } = password
        //页面判断输入信息
        if (user === "" || pass === "") {
            //提示用户输入错误
            message.warning("用户名或密码不能为空！！")
        }
        //服务器返回端判断输入信息
        else {
            //当点击登录时打开等待动画
            setWait_animation(() => true)
            //模拟登录时请求的等待时间
            setTimeout(() => {
                if (user === "1291573405" && pass === "123") {
                    //关闭等待动画
                    setWait_animation(() => false)
                    //设置当前用户选择的登录权限
                    auth.set_auth(login_options_state + "_auth")
                    //提示用户登录成功
                    message.success("登陆成功")
                    //跳转到指定的页面
                    props.history.push("/user_" + login_options_state, { pathname: window.location.pathname })
                }
                else {
                    //提示用户输入错误
                    message.error("用户名或密码错误！！")
                    //关闭等待动画
                    setWait_animation(() => false)
                }
            }, 2000)
        }



    }

    return (
        <div style={{
            position: "relative",
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "950px",
            borderRadius: "20px",
            minHeight: "0px"
        }}>
            {/* 加载页面 */}
            <div id="loading" style={{ display: wait_animation ? "block" : "none" }}>
                <Spin size="large" spinning={wait_animation} tip="加载中..." />
            </div>
            {/* 背景图片 */}
            <img
                id="bg_img"
                src={img_01}
                alt=""
                style={{
                    filter: bg_filter ? "blur(0px)" : "blur(15px)",
                }}
            />
            {/* 登录输入页面 */}
            <div
                id="login_bar"
                onMouseEnter={Bg_filter_Y}
                onMouseLeave={Bg_filter_N}
            >
                <div id="login_name">
                    仿真辅助系统
                </div>
                {/* 登录左边页面的图片 */}
                <div id="left_login">
                    <img id="left_login_img" src={img_02} alt="" />
                </div>
                {/* 右边部分的登录区域 */}
                <div id="right_login">
                    {/* 登录区域的选择登录端区域 */}
                    <div id="right_login_top">
                        <div
                            style={{ color: login_options_state === "student" ? "#0091FF" : "black" }}
                            onClick={changeLogin_options_state_stu}>学生端</div>
                        <div
                            style={{ color: login_options_state === "teacher" ? "#0091FF" : "black" }}
                            onClick={changeLogin_options_state_teac}>老师端</div>
                        <div
                            style={{ color: login_options_state === "manager" ? "#0091FF" : "black" }}
                            onClick={changeLogin_options_state_manager}>管理端</div>
                        <div></div>
                        <div style={{ left: login_options_state === "student" ? "0px" : login_options_state === "teacher" ? "100px" : "200px" }}></div>
                    </div>
                    {/* 用户输入账号密码区域 */}
                    <div id="right_login_input">
                        <div>用户名</div>
                        <input
                            type="text"
                            placeholder="请输入用户名"
                            onChange={checkUser_change()}
                            onBlur={checkUser_blur()}
                            ref={username} /

                        >
                        <p style={{ visibility: pas_user.username ? "" : "hidden" }}>用户名不能为空</p>
                        <div>密码</div>
                        <input
                            type="password"
                            placeholder="请输入密码"
                            style={{ marginTop: "8px" }}
                            onChange={checkPassword_change()}
                            onBlur={checkPassword_blur()}
                            ref={password}
                        /
                        >
                        <p style={{ visibility: pas_user.password ? "" : "hidden" }}>密码不能为空</p>
                        <div onClick={login}>登录</div>
                        <h6>版权所有  勤奋蜂&极客工作室</h6>
                    </div>



                </div>

            </div>
        </div>
    )
}

