import { useState } from 'react'

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
  const [searchResult, setSearchResult] = useState<Contact | null | 'not-found' | null>(null)
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
    const found = contacts.find(c => c.name === searchName.trim())
    setSearchResult(found ?? 'not-found')
  }

  if (exited) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center border border-gray-300 bg-white p-10 rounded">
          <p className="text-lg font-semibold text-gray-700">Thank You!</p>
          <p className="text-sm text-gray-500 mt-1">Program has exited.</p>
          <button
            onClick={() => setExited(false)}
            className="mt-4 text-xs text-blue-600 underline"
          >
            Restart
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header */}
      <div className="bg-blue-700 text-white py-4 px-6 text-center">
        <h1 className="text-xl font-bold tracking-wide">CONTACT MANAGEMENT SYSTEM</h1>
        <p className="text-sm text-blue-200 mt-0.5">Simple C++ Project</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* Add Contact */}
        <div className="bg-white border border-gray-300 rounded p-5">
          <h2 className="font-semibold text-base border-b border-gray-200 pb-2 mb-4">
            1. Add Contact
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Name:</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter Name"
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone Number:</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Enter Phone Number"
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={addContact}
              className="bg-blue-700 hover:bg-blue-800 text-white text-sm px-5 py-1.5 rounded transition-colors"
            >
              Add Contact
            </button>
            {addMsg && (
              <p className={`text-sm font-medium ${addMsg.includes('Successfully') ? 'text-green-600' : 'text-red-500'}`}>
                {addMsg}
              </p>
            )}
          </div>
        </div>

        {/* Display Contacts */}
        <div className="bg-white border border-gray-300 rounded p-5">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
            <h2 className="font-semibold text-base">2. Contact List</h2>
            <span className="text-xs text-gray-500 bg-gray-100 border border-gray-200 rounded px-2 py-0.5">
              {contacts.length} / {MAX_CONTACTS} Contacts
            </span>
          </div>
          {contacts.length === 0 ? (
            <p className="text-sm text-gray-500">No Contacts Available!</p>
          ) : (
            <div className="space-y-2">
              {contacts.map((c, i) => (
                <div key={i} className="border border-gray-200 rounded px-3 py-2 text-sm">
                  <div><span className="text-gray-500 w-14 inline-block">Name :</span> {c.name}</div>
                  <div><span className="text-gray-500 w-14 inline-block">Phone:</span> {c.phone}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Contact */}
        <div className="bg-white border border-gray-300 rounded p-5">
          <h2 className="font-semibold text-base border-b border-gray-200 pb-2 mb-4">
            3. Search Contact
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Enter Name to Search:</label>
              <input
                type="text"
                value={searchName}
                onChange={e => { setSearchName(e.target.value); setSearchResult(null) }}
                placeholder="Enter Name"
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={searchContact}
              className="bg-gray-700 hover:bg-gray-800 text-white text-sm px-5 py-1.5 rounded transition-colors"
            >
              Search
            </button>
            {searchResult === 'not-found' && (
              <p className="text-sm text-red-500 font-medium">Contact Not Found!</p>
            )}
            {searchResult && searchResult !== 'not-found' && (
              <div className="text-sm border border-green-300 bg-green-50 rounded px-3 py-2">
                <p className="text-green-700 font-medium mb-1">Contact Found!</p>
                <div><span className="text-gray-500 w-14 inline-block">Name :</span> {(searchResult as Contact).name}</div>
                <div><span className="text-gray-500 w-14 inline-block">Phone:</span> {(searchResult as Contact).phone}</div>
              </div>
            )}
          </div>
        </div>

        {/* Exit */}
        <div className="bg-white border border-gray-300 rounded p-5">
          <h2 className="font-semibold text-base border-b border-gray-200 pb-2 mb-4">
            4. Exit
          </h2>
          <button
            onClick={() => setExited(true)}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-1.5 rounded transition-colors"
          >
            Exit Program
          </button>
        </div>

      </div>
    </div>
  )
}
