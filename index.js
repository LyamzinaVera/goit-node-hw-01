const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const contacts = require('./contacts');

const argv = yargs(hideBin(process.argv)).argv;

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            contacts
                .listContacts()
                .then((result) => console.table(result))
                .catch((error) => console.error('Error:', error.message));
            break;

        case 'get':
            contacts
                .getContactById(id)
                .then((result) => {
                    if (result) {
                        console.log('Contact by ID:', result);
                    } else {
                        console.log('Contact not found.');
                    }
                })
                .catch((error) => console.error('Error:', error.message));
            break;

        case 'add':
            contacts
                .addContact(name, email, phone)
                .then((result) => console.log('New Contact:', result))
                .catch((error) => console.error('Error:', error.message));
            break;

        case 'remove':
            contacts
                .removeContact(id)
                .then((result) => {
                    if (result) {
                        console.log('Removed Contact:', result);
                    } else {
                        console.log('Contact not found.');
                    }
                })
                .catch((error) => console.error('Error:', error.message));
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);