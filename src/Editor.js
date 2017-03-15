/**
 * Created by tywin on 23/02/2017.
 */
import React from "react";
import {connect} from "react-redux";
import {saving} from "./actions";
import ReactQuill from "react-quill";
import "highlight.js";
import "highlight.js/styles/github-gist.css";

class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {editorHtml: '', mountedEditor: false}
        this.quillRef = null;
        this.reactQuillRef = null;
        this.handleChange = this.handleChange.bind(this);
        this.attachQuillRefs = this.attachQuillRefs.bind(this);

        this.save = this.save.bind(this);
    }

    componentDidMount() {
        this.attachQuillRefs()
    }

    componentDidUpdate() {
        this.attachQuillRefs()
    }

    attachQuillRefs() {
        // Ensure React-Quill reference is available:
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        // Skip if Quill reference is defined:
        if (this.quillRef != null) return;

        var quillRef = this.reactQuillRef.getEditor();
        var keyboard = quillRef.getModule('keyboard');
        keyboard.addBinding({key: 'S', shortKey: true}, this.save);

        if (quillRef == null) this.quillRef = quillRef;
    }

    save(range, context) {
        console.log('user hit command + s');
        this.props.onSave('ABCD');

        return true;   // return false will prevent other listeners from receiving the event
    }

    handleChange(html) {
        this.setState({editorHtml: html});
    }

    render() {
        return (
            <div>
                <ReactQuill
                    ref={(el) => {
                        this.reactQuillRef = el
                    }}
                    theme={'bubble'}
                    onChange={this.handleChange}
                    modules={Editor.modules}
                    formats={Editor.formats}
                    placeholder={this.props.placeholder}
                />
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
    [{'header': 1}, {'header': 2}],              // custom button values
    // [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
    // [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
    // [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
    // [{ 'direction': 'rtl' }],                        // text direction
    // [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
    // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
    [{'color': []}, {'background': []}],         // dropdown with defaults
    // [{ 'font': [] }],                                // font family
    [{'align': []}],                               // text align
    // ['clean'],                                       // remove formatting
]

// Editor.modules.keyboard.bindings =
//zing({ key: 'S', ctrlKey: true }, save());


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


let mapDispatchToProps = (dispatch) => {
    return {
        onSave: (value) => dispatch(saving(value)),
    }
}

Editor = connect(undefined, mapDispatchToProps)(Editor);

export default Editor;