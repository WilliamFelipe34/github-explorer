import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import logoImage from '../../asset/logo.svg';

import { Title, Form, Repositories, Error } from './style';

interface Repositoy{ 
  full_name: string,
  description: string
  owner : {
    login: string,
    avatar_url: string
  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [repostitories, setRepositories] = useState<Repositoy[]>([]);
  const [ inputError, setInputError ] = useState('');

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
      event.preventDefault();
      
      if(!newRepo){
        setInputError('Digite o nome do Repositório');
        return;
      }

      try {
        const response = await api.get<Repositoy>(`repos/${newRepo}`);

        const repository = response.data;
        setRepositories([...repostitories, repository]);
        setNewRepo('');
        setInputError('');
      } catch (error) {
        setInputError('Error na busca de repositório')
      }
     
  }

  return (
    <>
      <img src={ logoImage } alt="Github Explorer"></img>
      <Title>Explore repositórios no GitHub</Title>
      <Form hasError={ !!inputError } onSubmit={ handleAddRepository }>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit" >Pesquisar</button>
      </Form>
      { inputError && <Error>{ inputError }</Error>}
      <Repositories>
        {repostitories.map(repository => (
          <a key={ repository.full_name } href="teste">
            <img 
              src={ repository.owner.avatar_url }
              alt={ repository.owner.login } />
            <div>
              <strong>{ repository.full_name }</strong>
              <p>{ repository.description }</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  ) 
};

export default Dashboard;
