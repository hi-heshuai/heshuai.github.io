export const createSchema = ({qualitative = {}, applyMessage = {}} = {}) => {
  return {
    type: 'object',
    properties: {
      input: {
        title: '输入框',
        type: 'string',
        widget: 'input'
      },
      ...qualitative,
      selectxxx: {
        title: '下拉框自定义',
        type: 'string',
        widget: 'select',
        props: {
          options: [
            { label: '早', value: 'a' },
            { label: '中', value: 'b' },
            { label: '晚', value: 'c' }
          ]
        }
      },
      ...applyMessage
    }
  };
}