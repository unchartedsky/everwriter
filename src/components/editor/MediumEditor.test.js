import React from 'react'
import { mount, shallow } from 'enzyme'
import { MediumEditor, defaultText } from './MediumEditor'
import { createEditorStateWithText } from 'draft-js-plugins-editor'
import { SAVING } from '../../constants/actionTypes'

import KeyCode from 'keycode-js'

describe('Editor', function() {
  it('renders without crashing', () => {
    shallow(<MediumEditor />)
  })

  it('has the default text', () => {
    const wrapper = shallow(<MediumEditor />)
    const text = wrapper.state('editorState').getCurrentContent().getFirstBlock().getText()
    expect(text).toMatch(defaultText)
  })

  it('has new text', () => {
    const text = 'Start now'
    var editorState = createEditorStateWithText(text)
    const wrapper = shallow(<MediumEditor editorState={editorState} />)
    const textFound = wrapper.state('editorState').getCurrentContent().getFirstBlock().getText()
    expect(textFound).toMatch(text)
  })

  it('dispatch COMMAND_SAVE when command+s key is pressed', function() {
    var onSave = jest.fn()

    // 1. use `mount` API for Full DOM Rendering
    const wrapper = mount(
      <MediumEditor onSave={onSave} />
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
