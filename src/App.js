import React from "react";
import api from './services/api';
import "./styles.css";
import { useState, useEffect } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Desafio ReactJS",
      url: "https://github.com/josepholiveira",
      techs: [
        "React",
        "Node.js"
      ]
    });

    const repository = response.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => 
            <>
              <li key={repository.id}>
                {repository.title} 
              </li>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </>
          )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
