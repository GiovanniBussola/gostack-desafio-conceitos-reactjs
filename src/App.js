import React from "react";
import api from './services/api';
import "./styles.css";
import { useState, useEffect } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const title = `DesafioReact ${Date.now()}`;

    const response = await api.post('/repositories', {
      title: title,
      url: "https://github.com/GiovanniBussola",
      techs: [
        "NodeJs",
        "React"
      ]
    });

    const repository = response.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository =>
            <li key={repository.id}>
              {repository.title} <br />
              {repository.url} <br />
              {repository.techs.join(', ')}<br />
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>)
          }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
