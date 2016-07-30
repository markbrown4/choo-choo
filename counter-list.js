// $ budo counter-list.js

const choo = require('choo')
const html = require('choo/html')

const app = choo()

app.model({
  state: {
    counts: [0,0,0]
  },
  reducers: {
    increment: (index, state) => {
      var counts = state.counts.slice()
      counts[index] += 1

      return { counts: counts }
    },
    decrement: (index, state) => {
      var counts = state.counts.slice()
      counts[index] -= 1

      return { counts: counts }
    },
    add: (index, state) => {
      var counts = state.counts.slice()
      counts.push(0)

      return { counts: counts }
    },
    remove: (index, state) => {
      var counts = state.counts.slice()
      counts.pop()

      return { counts: counts }
    }
  }
})

const view = (state, prev, send) => {
  return html`
    <div>
      ${state.counts.map((count, index)=>
        html`
        <div>
          <span>Count: ${ count }</span>
          <button onclick=${()=> send('increment', index) }>Increment</button>
          <button onclick=${()=> send('decrement', index) }>Decrement</button>
        </div>
        `
      )}
      <hr>
      <button onclick=${()=> send('add') }>Add counter</button>
      <button onclick=${()=> send('remove') }>Remove counter</button>
    </div>
  `
}

app.router((route) => [
  route('/', view)
])

const tree = app.start()
document.body.appendChild(tree)
