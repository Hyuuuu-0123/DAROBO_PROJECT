import React from "react";

const baseUrl = 'https://i.imgur.com/';

const profiles = [
  {
    name: 'Nguyen Huynh Duc Anh',
    imageId: '7vQD0fP',
    imageSize: 's',
    theme: { backgroundColor: 'black', color: 'pink' },
    todos: [
      'Add job',
      'Add job',
      'Add job'
    ]
  },
  {
    name: 'Ngo Gia Huy',
    imageId: '7vQD0fP',
    imageSize: 's',
    theme: { backgroundColor: 'black', color: 'pink' },
    todos: [
      'Add job',
      'Add job',
      'Add job'
    ]
  },
  {
    name: 'Le Dinh Duc Vinh',
    imageId: '7vQD0fP',
    imageSize: 's',
    theme: { backgroundColor: 'black', color: 'pink' },
    todos: [
      'Add job',
      'Add job',
      'Add job'
    ]
  },
];

export default function TodoList() {
  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '20px' }}>
      {profiles.map((person, index) => (
        <div
          key={index}
          style={{
            ...person.theme,
            maxWidth: '290px',
            padding: '15px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}
        >
          <h2 style={{ marginBottom: '10px' }}>{person.name}</h2>
          <img
            className="avatar"
            src={`${baseUrl}${person.imageId}${person.imageSize}.jpg`}
            alt={person.name}
            style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '10px' }}
          />
          <ul style={{ padding: 0, listStyle: 'none', textAlign: 'left' }}>
            {person.todos.map((todo, i) => (
              <li key={i} style={{ marginBottom: '5px', fontSize: '14px' }}>{todo}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}