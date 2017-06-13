/**
 * Created by tywin on 23/02/2017.
 */
import React from "react";
import {connect} from "react-redux";
import {saving} from "./actions";
import "highlight.js";
import "highlight.js/styles/github-gist.css";

import {
    Editor,
    createEditorState,
} from 'medium-draft';

class MediumEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: createEditorState(), // for empty content
        };

        /*
         this.state = {
         editorState: createEditorState(data), // with content
         };
         */

        this.onChange = (editorState) => {
            this.setState({ editorState });
        };
    }

    componentDidMount() {
        this.refs.editor.focus();
    }

    render() {
        const { editorState } = this.state;
        return (
            <Editor
                ref="editor"
                editorState={editorState}
                onChange={this.onChange} />
        );
    }
}

// MediumEditor = connect(undefined, mapDispatchToProps)(MediumEditor);

export default MediumEditor;