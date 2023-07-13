import React from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  const onAddContact = contactData => {
    const isExist = contacts.some(
      contact => contactData.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isExist) {
      alert(`${contactData.name} is already in contacts.`);
      return;
    }

    const finalContact = {
      id: nanoid(3),
      ...contactData,
    };
    setContacts(prevContacts => [finalContact, ...prevContacts]);
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const onDeleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const getVisibleFilter = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />
      <h2 className={css.titleContact}>Contacts</h2>
      <Filter value={filter} handleFilter={handleFilter} />
      <ContactList
        contacts={getVisibleFilter()}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
};
