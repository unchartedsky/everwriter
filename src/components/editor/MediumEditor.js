/**
 * Created by tywin on 23/02/2017.
 */
import {connect} from "react-redux";
import {saving} from "../../actions/index";

import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from 'draft-js-buttons'; // eslint-disable-line import/no-unresolved
import createEmojiPlugin from 'draft-js-emoji-plugin'; // eslint-disable-line import/no-unresolved
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';


import 'draft-js-hashtag-plugin/lib/plugin.css'; // eslint-disable-line import/no-unresolved
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'; // eslint-disable-line import/no-unresolved
import editorStyles from './editorStyles.css';
// import buttonStyles from './buttonStyles.css';
// import toolbarStyles from './toolbarStyles.css';
import 'draft-js-emoji-plugin/lib/plugin.css'; // eslint-disable-line import/no-unresolved

const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();

const inlineToolbarPlugin = createInlineToolbarPlugin({
    // theme: { buttonStyles: buttonStyles, toolbarStyles: toolbarStyles },
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        CodeButton,
        Separator,
        HeadlineOneButton,
        HeadlineTwoButton,
        HeadlineThreeButton,
        UnorderedListButton,
        OrderedListButton,
        BlockquoteButton,
        CodeBlockButton,
    ]
});
const { InlineToolbar } = inlineToolbarPlugin;

const emojiPlugin = createEmojiPlugin({
    allowImageCache: true
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const markdownShortcutsPlugin = createMarkdownShortcutsPlugin();

const plugins = [
    hashtagPlugin,
    linkifyPlugin,
    inlineToolbarPlugin,
    markdownShortcutsPlugin,
    emojiPlugin,
];

const text = 'In this editor a toolbar shows up once you select part of the text …';


class MediumEditor extends Component {

    state = {
        editorState: createEditorStateWithText(text),
    };

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    focus = () => {
        this.editor.focus();
    };

    render() {
        return (
            <div>
                <div className={editorStyles.editor} onClick={this.focus}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }}
                    />
                    <InlineToolbar />
                    <EmojiSuggestions />
                </div>
            </div>
        );
    }
}

// MediumEditor = connect(undefined, mapDispatchToProps)(MediumEditor);

export default MediumEditor;