import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useContactStore = defineStore('contact', () => {
  const contacts = ref([
    {
      id: 1,
      fio: 'Test user 1',
      phone_number: '+1 (312) 321-21-32',
      email: 'test@gmail.com',
      teg: 'Oila',
    },
    { id: 2,
      fio: 'Test user 2',
      phone_number: '+1 (312) 323-21-31',
      email: 'test2@gmail.com',
      teg: 'Ish',
    },
  ])
 
  function add(contact) {
    contact['id'] = Math.floor((1 + Math.random()) * 0x10000)
                      .toString(16)
                      .substring(1);
    contacts.value.push(contact)
  }
  function remove(id) {
    const index = contacts.value.findIndex((val) => val.id == id)
    contacts.value.splice(index, 1)
  }
  function update(id, contact) {
    const index = contacts.value.findIndex((val) => val.id == id)
    contacts.value[index].fio = contact.fio
    contacts.value[index].phone_number = contact.phone_number
    contacts.value[index].email = contact.email
    contacts.value[index].teg = contact.teg
  }
  return { contacts, add , contacts, remove, update}
})
