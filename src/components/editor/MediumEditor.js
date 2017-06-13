/**
 * Created by tywin on 23/02/2017.
 */
import React from "react";
import {connect} from "react-redux";
import {saving} from "../../actions/index";

import {
    Editor,
    createEditorState,
    ImageSideButton,
    Block,
    // AtomicBlock,
    rendererFn,
} from 'medium-draft';

import EmbedSideButton from "./EmbedSideButton";
import AtomicEmbedComponent from "./AtomicEmbedComponent";

const AtomicBlock = (props) => {
    const { blockProps, block } = props;
    const content = blockProps.getEditorState().getCurrentContent();
    const entity = content.getEntity(block.getEntityAt(0));
    const data = entity.getData();
    const type = entity.getType();
    if (blockProps.components[type]) {
        const AtComponent = blockProps.components[type];
        return (
            <div className={`md-block-atomic-wrapper md-block-atomic-wrapper-${type}`}>
                <AtComponent data={data} />
            </div>
        );
    }
    return <p>Block of type <b>{type}</b> is not supported.</p>;
};



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

        this.sideButtons = [{
            title: 'Image',
            component: ImageSideButton,
        }, {
            title: 'Embed',
            component: EmbedSideButton,
        }] ;

        // this.exporter = setRenderOptions({
        //     styleToHTML,
        //     blockToHTML: newBlockToHTML,
        //     entityToHTML: newEntityToHTML,
        // });

        this.getEditorState = () => this.state.editorState;


    }

    rendererFn(setEditorState, getEditorState) {
        const atomicRenderers = {
            embed: AtomicEmbedComponent,
        };
        const rFnOld = rendererFn(setEditorState, getEditorState);
        const rFnNew = (contentBlock) => {
            const type = contentBlock.getType();
            switch(type) {
                case Block.ATOMIC:
                    return {
                        component: AtomicBlock,
                        editable: false,
                        props: {
                            components: atomicRenderers,
                            getEditorState,
                        },
                    };
                default: return rFnOld(contentBlock);
            }
        };
        return rFnNew;
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
                onChange={this.onChange}
                sideButtons={this.sideButtons}
                rendererFn={this.rendererFn}
            />
        );
    }
}

// MediumEditor = connect(undefined, mapDispatchToProps)(MediumEditor);

export default MediumEditor;