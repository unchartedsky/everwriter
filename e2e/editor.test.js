import ReactSelector from 'testcafe-react-selectors';

fixture `Editing`
  .page `http://localhost:3000/`;

test('Add a new item', async t => {
  var editor = ReactSelector('DraftEditorContents');
  const el = ReactSelector('DraftEditorLeaf');

  await t
    .typeText(editor, 'Hello World!', { replace: true })
    .pressKey('enter')
    .expect(ReactSelector('DraftEditorLeaf').exists).ok()
    .expect(ReactSelector('DraftEditorLeaf').getReact(({ props }) => props.text)).contains('Hello')
})