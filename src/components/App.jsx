
import React from 'react';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';


export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onAddContact = contactData => {
    const isExist = this.state.contacts.some(
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
    this.setState(prevState => ({
      contacts: [finalContact, ...prevState.contacts],
    }));
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  onDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getVisibleFilter = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  componentDidMount() {
    console.log("render componentdidmount")
    const stringifiedContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(stringifiedContacts) ?? [];
    this.setState({ contacts });
  }

  componentDidUpdate(prevProps, prevState) {

    console.log('render componentDidUpdate');
    if (prevState.contacts.length !== this.state.contacts.length) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContacts);
    }
  }

  render() {
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onAddContact={this.onAddContact} />
        <h2 className={css.titleContact}>Contacts</h2>
        <Filter value={this.state.filter} handleFilter={this.handleFilter} />
        <ContactList
          contacts={this.getVisibleFilter()}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}
