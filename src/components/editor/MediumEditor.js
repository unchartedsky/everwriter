/**
 * Created by tywin on 23/02/2017.
 */

import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {getDefaultKeyBinding, KeyBindingUtil} from 'draft-js'
import {connect} from 'react-redux'
import {saving} from '../../actions'
import Editor, {createEditorStateWithText} from 'draft-js-plugins-editor' // eslint-disable-line import/no-unresolved
import createHashtagPlugin from 'draft-js-hashtag-plugin'
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import createInlineToolbarPlugin, {Separator,} from 'draft-js-inline-toolbar-plugin'
import {
  BlockquoteButton,
  BoldButton,
  CodeBlockButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineThreeButton,
  HeadlineTwoButton,
  ItalicButton,
  OrderedListButton,
  UnderlineButton,
  UnorderedListButton,
} from 'draft-js-buttons' // eslint-disable-line import/no-unresolved
// eslint-disable-line import/no-unresolved

import 'draft-js-hashtag-plugin/lib/plugin.css' // eslint-disable-line import/no-unresolved
import 'draft-js-inline-toolbar-plugin/lib/plugin.css' // eslint-disable-line import/no-unresolved
import 'draft-js-emoji-plugin/lib/plugin.css' // eslint-disable-line import/no-unresolved
import createEmojiPlugin from 'draft-js-emoji-plugin' // eslint-disable-line import/no-unresolved
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin'
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';

import editorStyles from './editorStyles.css'

import KeyCode from 'keycode-js'


const hashtagPlugin = createHashtagPlugin()
const linkifyPlugin = createLinkifyPlugin()

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
  ],
})
const {InlineToolbar} = inlineToolbarPlugin

const emojiPlugin = createEmojiPlugin({
  allowImageCache: true,
})
const {EmojiSuggestions} = emojiPlugin

const markdownShortcutsPlugin = createMarkdownShortcutsPlugin()
const blockBreakoutPlugin = createBlockBreakoutPlugin()

const plugins = [
  hashtagPlugin,
  linkifyPlugin,
  inlineToolbarPlugin,
  markdownShortcutsPlugin,
  emojiPlugin,
  blockBreakoutPlugin
]

const {hasCommandModifier} = KeyBindingUtil

const text =
  'In this editor a toolbar shows up once you select part of the text …'

function myKeyBindingFn(e) {
  if (e.keyCode === KeyCode.KEY_S /* `S` key */ && hasCommandModifier(e)) {
    return 'myeditor-save'
  }
  return getDefaultKeyBinding(e)
}

export class MediumEditor extends Component {
  state = {
    editorState: createEditorStateWithText(text),
  }

  constructor(props) {
    super(props);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command) {
    if (command === 'myeditor-save') {
      // Perform a request to save your contents, set
      // a new `editorState`, etc.
      this.props.onSave('SAVING');

      return 'handled';
    }
    return 'not-handled';
  }

  onChange = editorState => {
    this.setState({
      editorState,
    })
  }

  focus = () => {
    this.editor.focus()
  }

  render() {
    return (
      <div>
        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={element => {
              this.editor = element
            }}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={myKeyBindingFn}
          />
          <InlineToolbar/>
          <EmojiSuggestions/>
        </div>
      </div>
    )
  }
}

MediumEditor.propTypes = {
  placeholder: PropTypes.string,
}

let mapDispatchToProps = (dispatch) => {
  return {
    onSave: value => dispatch(saving(value)),
  }
}

export default connect(undefined, mapDispatchToProps)(MediumEditor)
