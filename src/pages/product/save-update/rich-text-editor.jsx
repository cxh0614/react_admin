import React from 'react'
import { PropTypes } from 'prop-types';
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

export default class RichTextEditor extends React.Component {

    static propTypes = {
        detail: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            // 创建一个空的editorState作为初始值
            editorState: BraftEditor.createEditorState(this.props.detail)
        }
    }

    

    // componentDidMount () {
    //     // 假设此处从服务端获取html格式的编辑器内容
    //     const htmlContent = 'hello world';
    //     // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    //     this.setState({
    //         editorState: BraftEditor.createEditorState(htmlContent)
    //     })
    // }

    //保存时触发的回调
    // submitContent = async () => {
    //     // 在编辑器获得焦点时按下ctrl+s会执行此方法
    //     // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    //     const htmlContent = this.state.editorState.toHTML()
    //     // const result = await saveEditorContent(htmlContent)
    //     // console.log(htmlContent)
    // }

    //一旦内容发生变化，触发的回调
    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }

    render () {

        const { editorState } = this.state
        return (
            <div style={{border: '1px solid #d9d9d9', height: 300, borderRadius: 4}}>
                <BraftEditor
                    value={editorState}
                    onChange={this.handleEditorChange}
                    //onSave={this.submitContent}
                />
            </div>
        )

    }

}