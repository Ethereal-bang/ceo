import React, { Component } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { Card} from 'antd'
import axios from 'axios'
import localStorage_login from '../../../../guard/localStorage'
import PubSub from 'pubsub-js'
// import axios from 'axios'
axios.defaults.headers["token"]="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZW8iLCJhdWQiOiJ0aWFuc2giLCJleHAiOjE2Mjg4Mjk1OTN9.JWjLCC6DJ1YTvYATaDbI_J5rArUhDa2pXIBPj_K46_4"
// import { reqClass } from '../../api'
const ws = new WebSocket('ws://120.79.147.32:8089/connect/userId=2017211024')
ws.onopen=async function(){
    console.log("连接成功");
}
ws.onmessage=function(e){
    // console.log("返回数据",e);
}
export default class Students extends Component {
    state={
        openClassVisible:true,
        teacherClass:'',
        exitClass:[],
        classStudents:[],
        changeClassVisible:false,
        selectedClass:''
    }

    //处理首次登录选择班级
    handleClassModal=()=>{
        this.setState({ openClassVisible: false })
        localStorage_login.removeLogin_auth()
        this.props.history.replace("/login")
      }
    reqSelectCLass=()=>{
        axios({
            method:'POST',
            url:'http://120.79.147.32:8089/teacher/students',
            data:{
                start:'1',
                pageSize:"5",
                teacherClass:this.state.selectedClass
            },
        }).then((res)=>{
            console.log(res);
            // this.setState({ classStudents:res.data.data.list})
        })
    }


    // reqExitClass=()=>{      
    //     // if(this.state.exitClass !==null){return}
    //     return new Promise((resolve,rekect)=>{
    //         let promise
    //         promise=axios({
    //             method:'POST',
    //             url:'http://120.79.147.32:8089/teacher/exitClass',
    //             data:{
    //                 userId:'tiansh'
    //             },
    //         })
    //         promise.then(res=>{
    
    //             resolve(res)
    //         }).catch(error => {
    //             // reject(error)
    //             message.error('请求出错了: ' + error.message)
    //           })
    //     })

    //  }

    componentDidMount(){
       this.token= PubSub.subscribe('class',(_,values)=>{
            this.setState({  selectedClass:values})
        })
    // console.log(this.props);
        this.reqSelectCLass()
        // const result =await  this.reqExitClass()
        // this.setState({exitClass:result.data.data})

    }
    componentWillUnmount(){
        // PubSub.unsubscribe(this.token)
    }
    render() {
        console.log(this.state);
        const title=(
            <h2>学生信息</h2>
        )
        const extra=(
            <ReactHTMLTableToExcel
            id="test-table-xls-button"
            // className="download-table-xls-button"
            className="ant-btn"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="导出Excle表格"
            />
        )
        // const columnsLogin=[
        //     {
        //       title:'teachclass',
        //       dataIndex:'',
        //       key:'1',
        //       align: 'center'
        //     },
        //     {
        //       title:'操作',
        //       dataIndex:'',
        //       key:'2',
        //       align: 'center',
        //       render:(values)=>(
        //           <Button type='primary' onClick={()=>{this.reqSelectCLass(values)}}>进入班级</Button>
        //       )
        //     }
        //   ]
    
        // const columns=[
        //     {
        //     title:'姓名',
        //     dataIndex:'userName',
        //     key:"userName"
        //     },
        //     {
        //         title:'学号',
        //         dataIndex:'userId',
        //         key:"userId"
        //     },
        //     {
        //         title:'专业',
        //         dataIndex:'discipline',
        //         key:"discipline"   
        //     },
        //     {
        //         title:'公司',
        //         dataIndex:'companyId',
        //         key:"companyId"  
        //     },
        //     {
        //         title:'总分',
        //         dataIndex:'score',
        //         key:"score"
        //     }
        // ]
        // const dataSource=[]
        
        return (
            <Card title={title} extra={extra} style={{width:'100%',height:'100%'}}>

                {/* <Modal 
                    width='850px'
                    title='请选择的班级'
                    visible={this.state.openClassVisible}
                    onCancel={this.handleClassModal}
                    footer={
                      <Button type='primary' onClick={this.handleClassModal}>退出登录</Button>
                    }  >
                        <Table columns={columnsLogin} dataSource={exitClass}>

                        </Table>
            </Modal> */}
                 {/* <table id="table-to-xls" style={{width:'100%',height:'100%'}}>
                    <Table 
                    //   ref='table' 
                      columns={columns} 
                      dataSource={dataSource} 
                       pagination={{defaultPageSize: 5, showQuickJumper: true}}

                    ></Table>
                </table> */}

            </Card>
        )
    }
}