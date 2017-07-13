import React from 'react'
import { mount, shallow } from 'enzyme'
import { MediumEditor } from './MediumEditor'
import { createEditorStateWithText } from 'draft-js-plugins-editor'
import { SAVING } from '../../constants/actionTypes'

import KeyCode from 'keycode-js'

describe('Editor', function() {
  it('renders without crashing', () => {
    shallow(<MediumEditor />)
  })

  it('blockquote', () => {
    const text = 'Start now'
    var editorState = createEditorStateWithText(text)
    const wrapper = shallow(<MediumEditor editorState={editorState} />)
  })

  it('dispatch COMMAND_SAVE when command+s key pressesd', function() {
    var onSave = jest.fn()

    const text = 'Start now'
    var editorState = createEditorStateWithText(text)

    // 1. use `mount` API for Full DOM Rendering
    const wrapper = mount(
      <MediumEditor editorState={editorState} onSave={onSave} />
    )

    // 2. find a DOM element with '.public-DraftEditor-content' classname
    const ed = wrapper.find('.public-DraftEditor-content')

    // 3. dispatch the 'keyDown' event with `simulate` API
    ed.simulate('keyDown', {
      keyCode: KeyCode.KEY_S,
      metaKey: false, // is IS_OSX=true, this should be true
      ctrlKey: true,
      altKey: false,
    })

    expect(onSave).toBeCalledWith('SAVING')
  })
})
