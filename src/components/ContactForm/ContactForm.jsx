import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import { useState } from 'react';

export const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInput = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmite = e => {
    e.preventDefault();

    onAddContact({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmite} className={css.form}>
      <label className={css.formLabel}>
        Name
        <input
          className={css.formInput}
          type="text"
          value={name}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleInput}
        />
      </label>
      <label className={css.formLabel}>
        Number
        <input
          className={css.formInput}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleInput}
        />
      </label>
      <button type="submit" className={css.addContactBtn}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
