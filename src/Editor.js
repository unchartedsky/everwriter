/**
 * Created by tywin on 23/02/2017.
 */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';
import 'highlight.js';
import 'highlight.js/styles/github-gist.css';

class Editor extends React.Component {
    constructor (props) {
        super(props)
        this.state = { editorHtml: '', mountedEditor: false }
        this.quillRef = null;
        this.reactQuillRef = null;
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.attachQuillRefs = this.attachQuillRefs.bind(this);
    }

    componentDidMount () {
        this.attachQuillRefs()
    }

    componentDidUpdate () {
        this.attachQuillRefs()
    }

    attachQuillRefs() {
        // Ensure React-Quill reference is available:
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        // Skip if Quill reference is defined:
        if (this.quillRef != null) return;

        const quillRef = this.reactQuillRef.getEditor();
        if (quillRef != null) this.quillRef = quillRef;
    }

    handleClick () {
        var range = this.quillRef.getSelection();
        let position = range ? range.index : 0;
        this.quillRef.insertText(position, 'Hello, World! ')
    }

    handleChange (html) {
        this.setState({ editorHtml: html });
    }

    render () {
        return (
            <div>
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    theme={'bubble'}
                    onChange={this.handleChange}
                    modules={Editor.modules}
                    formats={Editor.formats}
                    placeholder={this.props.placeholder} />
                <button onClick={this.handleClick}>Insert Text</button>
            </div>
        )
    }
}

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {}
Editor.modules.toolbar = [
    ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
    ['blockquote', 'code-block'],                    // blocks
    [{ 'header': 1 }, { 'header': 2 }],              // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
    [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
    [{ 'direction': 'rtl' }],                        // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
    [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
    [{ 'font': [] }],                                // font family
    [{ 'align': [] }],                               // text align
    ['clean'],                                       // remove formatting
]

/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
Editor.formats = [
    'header', 'font', 'background', 'color', 'code', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'script', 'align', 'direction',
    'link', 'image', 'code-block', 'formula', 'video'
]

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