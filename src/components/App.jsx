import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import ContactsList from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import styled from 'styled-components';

export function App() {
  const [contacts, setContacts] = useState(() => {
    const localStorageContacts = localStorage.getItem('contacts');
    if (localStorageContacts) {
      return JSON.parse(localStorageContacts);
    }
    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });
  const [filter, setFilter] = useState('');
  const [custominput, setCustominput] = useState('');

  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');

  // useEffect(() => {
  //   console.log('App rendered!');
  //   const LOCAL_STORAGE = localStorage.getItem('contacts');
  //   if (LOCAL_STORAGE) {
  //     setContacts(JSON.parse(LOCAL_STORAGE));
  //   } else {
  //     console.log('Contacts is Empty!');
  //   }
  //   if (localStorage.getItem('custominput')) {
  //     localStorage.getItem('custominput') &&
  //       setCustominput(JSON.parse(localStorage.getItem('custominput')));
  //   }
  // }, []);

  useEffect(() => {
    console.log('DOM Updated!');
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('custominput', JSON.stringify(custominput));
  }, [custominput]);

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = e.target.elements;
    const USER_NAME = name.value;
    const USER_NUMBER = number.value;
    const ARRAY_NAMES = contacts.map(contact => contact.name);
    if (!ARRAY_NAMES.includes(USER_NAME)) {
      setContacts(prevContacts => [
        ...prevContacts,
        { name: USER_NAME, number: USER_NUMBER, id: nanoid() },
      ]);
      // name.value = '';
      // number.value = '';
      // setName('');
      // setNumber('');
    } else {
      alert(`${USER_NAME} already in contacts`);
    }
    e.target.reset();
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    if (name === 'filter') {
      setFilter(value);
    } else if (name === 'custominput') {
      setCustominput(value);
    }
  };

  const changeId = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter(el =>
    el.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <StyledButton type="submit" title="hello">
        I am styled
      </StyledButton>
      <input
        type="text"
        name="custominput"
        value={custominput}
        className="result"
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name"
        required
      />
      <ContactForm handleChange={handleChange} handleSubmit={handleSubmit} />
      <Filter filteredContacts={filteredContacts} handleChange={handleChange} />
      <ContactsList contacts={filteredContacts} changeId={changeId} />
    </>
  );
}

/**
|============================
| Styled components
|============================
*/

const StyledButton = styled.button`
  background-color: tomato;
  &:hover {
    background-color: teal;
  }
`;
