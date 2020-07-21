<script>
import List from './cell/list'
export default {
  name: 'ScrollList',
  props: {
    renderItem: {
      type: Function,
      default: (h, data) => h('p', { style: { height: '120px', background: '#fff' }}, `test-item: ${data.id}`),
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => ([
        { id: 1, name: 'a' },
        { id: 2, name: 'a' },
        { id: 3, name: 'a' },
        { id: 4, name: 'a' },
        { id: 5, name: 'a' },
        { id: 6, name: 'a' },
        { id: 7, name: 'a' },
        { id: 8, name: 'a' },
        { id: 9, name: 'a' },
        { id: 10, name: 'a' },
      ]),
    },
    duration: {
      type: Number,
      default: 5000,
    },
  },
  data() {
    return {
      itemHeight: 0,
      itemWidth: 0,
    }
  },
  render(h) {
    const { length } = this.data
    return h('div', { style: { width: '100%', height: '100%' }}, [
      ...(length > 0 ? [h(List, {
        props: {
          step: this.horizontal ? this.itemWidth : this.itemHeight,
          duration: this.duration,
          horizontal: this.horizontal,
        },
      }, this.data.map((d, index) => h('li', {
        style: {
          display: 'inline-block',
        },
        ...(index === 0 ? {
          directives: [
            {
              name: 'venus-resize',
              value: ([w, h]) => {this.itemWidth = w;  this.itemHeight = h }, // eslint-disable-line
            },
          ],
        } : {}),
      }, [this.renderItem(h, d)])))] : ['']),
    ])
  },
}
</script>
