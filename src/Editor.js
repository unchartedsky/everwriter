/**
 * Created by tywin on 23/02/2017.
 */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';

class Editor extends React.Component {
    constructor (props) {
        super(props)
        this.state = { editorHtml: '' }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (html) {
        this.setState({ editorHtml: html });
    }

    render () {
        return (
            <ReactQuill
                theme={'snow'}
                onChange={this.handleChange}
                value={this.state.editorHtml}
                modules={Editor.modules}
                formats={Editor.formats}
                placeholder={this.props.placeholder}
            />
        )
    }
}

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }, { 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'},
            {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ]
}
/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
Editor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

/*
 * PropType validation
 */
Editor.propTypes = {
    placeholder: React.PropTypes.string,
}

/*
 * Render component on page
 */
// ReactDOM.render(
//     <Editor placeholder={'Write something...'}/>,
//     document.querySelector('.app')
// )

export default Editor;