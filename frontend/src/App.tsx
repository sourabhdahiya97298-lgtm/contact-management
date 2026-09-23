import { useState } from 'react'
import './App.css'

const MAX_CONTACTS = 10

interface Contact {
  name: string
  phone: string
}

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [addMsg, setAddMsg] = useState('')
  const [searchName, setSearchName] = useState('')
  const [searchResult, setSearchResult] = useState<Contact | 'not-found' | null>(null)
  const [exited, setExited] = useState(false)

  function addContact() {
    if (contacts.length >= MAX_CONTACTS) {
      setAddMsg('Contact List is Full!')
      return
    }

    if (!name.trim() || !phone.trim()) {
      setAddMsg('Please enter both Name and Phone Number.')
      return
    }

    setContacts([...contacts, { name: name.trim(), phone: phone.trim() }])
    setName('')
    setPhone('')
    setAddMsg('Contact Added Successfully!')

    setTimeout(() => setAddMsg(''), 3000)
  }

  function searchContact() {
    const found = contacts.find(
      c => c.name.toLowerCase() === searchName.trim().toLowerCase()
    )

    setSearchResult(found ?? 'not-found')
  }

  if (exited) {
    return (
      <div className="app">
        <div className="container">
          <div className="section">
            <h2>Thank You!</h2>
            <p>Program has exited.</p>

            <button onClick={() => setExited(false)}>
              Restart
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">

      {/* Header */}
      <div className="header">
        <h1>CONTACT MANAGEMENT SYSTEM</h1>
        <p>Simple C++ Project</p>
      </div>

      <div className="container">

        {/* Add Contact */}
        <div className="section">
          <h2>1. Add Contact</h2>

          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Enter Phone Number"
            />
          </div>

          <button onClick={addContact}>
            Add Contact
          </button>

          {addMsg && (
            <p className={addMsg.includes('Successfully') ? 'success' : 'error'}>
              {addMsg}
            </p>
          )}
        </div>

        {/* Contact List */}
        <div className="section">
          <h2>
            2. Contact List
            <span className="contact-count">
              {contacts.length} / {MAX_CONTACTS} Contacts
            </span>
          </h2>

          {contacts.length === 0 ? (
            <p>No Contacts Available!</p>
          ) : (
            contacts.map((contact, index) => (
              <div className="contact" key={index}>
                <div>
                  <span className="contact-label">Name:</span>
                  {contact.name}
                </div>

                <div>
                  <span className="contact-label">Phone:</span>
                  {contact.phone}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Search Contact */}
        <div className="section">
          <h2>3. Search Contact</h2>

          <div className="form-group">
            <label>Enter Name to Search:</label>
            <input
              type="text"
              value={searchName}
              onChange={e => {
                setSearchName(e.target.value)
                setSearchResult(null)
              }}
              placeholder="Enter Name"
            />
          </div>

          <button onClick={searchContact}>
            Search
          </button>

          {searchResult === 'not-found' && (
            <p className="error">Contact Not Found!</p>
          )}

          {searchResult && searchResult !== 'not-found' && (
            <div className="search-result">
              <p className="success">Contact Found!</p>

              <div>
                <span className="contact-label">Name:</span>
                {searchResult.name}
              </div>

              <div>
                <span className="contact-label">Phone:</span>
                {searchResult.phone}
              </div>
            </div>
          )}
        </div>

        {/* Exit */}
        <div className="section exit-section">
          <h2>4. Exit</h2>

          <button onClick={() => setExited(true)}>
            Exit Program
          </button>
        </div>

      </div>
    </div>
  )
}