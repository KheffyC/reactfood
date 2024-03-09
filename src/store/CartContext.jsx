import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {}
})

function cartReducer(state, action){
  if (action.type === 'ADD_ITEM') {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
    const updatedItems = [...state.items]
  
    if (existingCartItemIndex > -1) {
      const item = state.items[existingCartItemIndex]
      const updatedItem = {
        ...item,
        quantity: item.quantity + 1
      }

      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems.push({ ...action.item, quantity: 1 })
    }
  
    return { ...state, items: updatedItems }
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
    const existingItem = state.items[existingCartItemIndex]

    if (existingItem.quantity === 1) {
      const updatedItems = state.items.filter(item => item.id !== action.id)
      return { items: updatedItems }
    } else {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 }
      const updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    }
    
    
    return { ...state, items: updatedItems }
  }

  return state
}

export function CartContextProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, { items: [] })

  function addItem (item) {
    dispatchCartAction({ type: 'ADD_ITEM', item: item })
  }

  function removeItem (id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id: id })
  }
  
  const cartContext = {
    items: cartState.items,
    addItem, 
    removeItem
  }
  console.log(cartContext)

  return (
    <CartContext.Provider value={cartContext}>
      { children }
    </CartContext.Provider>
  )
}

export default CartContext