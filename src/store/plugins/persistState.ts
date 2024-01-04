import { type PiniaPluginContext } from 'pinia'

export function persistedState(context: PiniaPluginContext) {
  const currentState = JSON.parse(localStorage.getItem(context.store.$id) || '{}')

  context.store.$patch(currentState)

  
  context.store.$subscribe(
    (_store, state) => {
      // console.log(_store)
      // console.log(state)
      localStorage.setItem(_store.storeId, JSON.stringify(state))
    },
    {
      detached: true
    }
  )
}
