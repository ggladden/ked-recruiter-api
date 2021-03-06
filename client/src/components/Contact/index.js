import React, { Component } from 'react';
import Client from '../../api/Client';
import './index.css';

class Contact extends Component {
  formatPhone (number) {
    const raw = number.replace(/\D/g, '');
    if (raw.length === 10) {
      return raw.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2 $3");
    } else {
      return raw;
    }
  }

  handleContactCalled = () => {
    const { action_network_id } = this.props.contact;
    Client.updatePerson(action_network_id, {called: true});
    this.props.onFinished();
  }

  handleRequestNewZip = () => {
    const { action_network_id } = this.props.contact;
    Client.updatePerson(action_network_id);
  }

  render () {
    const { contact } = this.props;

    return(
      <div className='contact' data-test='contact'>
        {contact.given_name ?
          <div className='contact__name' data-test='givenName'>
            {contact.given_name}
          </div>
        : null} {contact.family_name ?
          <div className='contact__name' data-test='familyName'>
            {contact.family_name}
          </div>
        : null}
        {contact.phone_number ?
          <a className='contact__phone'
               data-test='phoneNumber'
               href={`tel:${contact.phone_number}`}
               target='_blank'>
            {'+1 ' + this.formatPhone(contact.phone_number)}
          </a>
        : null}
        <div className='contact__prompt'>
          <a data-test='action:called'
             href='#'
             onClick={this.handleContactCalled}>
            I spoke with this person
          </a>
        </div>
        {contact.call_list ?
          <div style={{textAlign: 'left'}}>
            <br/><br/>
            Called at:
            {contact.call_list.map((call, idx) => {
              return(<div key={idx}>{call}</div>)
            })}
          </div>
        : null}
      </div>
    );
  }
}

export default Contact;
