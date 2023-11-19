const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        if (error.code === 'ENOENT') {

            return [];
        } else {
            throw error;
        }
    }
}


async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);
    return contact || null;
}


async function removeContact(contactId) {
    const contacts = await listContacts();
    const removedContact = contacts.find((item) => item.id === contactId);

    if (removedContact) {
        const updatedContacts = contacts.filter((item) => item.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
        return removedContact;
    } else {
        return null;
    }
}


async function addContact(name, email, phone) {
    const newContact = { id: Date.now(), name, email, phone };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};