import mitt from 'mitt'

type Events = Record<string, any>

const emitter = mitt<Events>()

export default emitter
