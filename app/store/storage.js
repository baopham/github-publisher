import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-electronjsonstorage'

const APP_KEY = 'GHPUB/STORAGE'
const engine = createEngine(APP_KEY)
const middleware = storage.createMiddleware(engine)
const load = storage.createLoader(engine)

export {
  middleware,
  load
}
