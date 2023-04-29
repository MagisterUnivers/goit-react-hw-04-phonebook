import { ContactsListEl } from '../ContactsListEl/ContactsListEl';
import PropTypes from 'prop-types';

const ContactsList = ({ contacts, changeId }) => {
  return (
    <ul className="">
      <ContactsListEl contacts={contacts} changeId={changeId} />
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({ Object })),
  changeId: PropTypes.func.isRequired,
};

export default ContactsList;
