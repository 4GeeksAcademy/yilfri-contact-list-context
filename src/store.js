export const initialStore = () => {
  return {
    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'get_contacts':

      return {
        ...store,
        contacts: action.payload
      };

    /* case 'delete_contact':
      const { id } = action.payload

      console.log(id)
      console.log(action.payload)
      return {
        contacts: contacts.filter((contact) => contact.id !== id)
      }; */
    default:
      throw Error('Unknown action.');
  }
}
