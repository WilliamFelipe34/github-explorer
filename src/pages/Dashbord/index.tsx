import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Link } from 'react-router-dom'

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
  const [ inputError, setInputError ] = useState('');
  const [repostitories, setRepositories] = useState<Repositoy[]>(() => {
    const storageRepositories = localStorage.getItem('@GitHubExplore:repositories');

    if(storageRepositories){
      return JSON.parse(storageRepositories);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('@GitHubExplore:repositories', JSON.stringify(repostitories),);
  }, [repostitories])

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
          <Link key={ repository.full_name } to={`repository/${repository.full_name}`}>
            <img 
              src={ repository.owner.avatar_url }
              alt={ repository.owner.login } />
            <div>
              <strong>{ repository.full_name }</strong>
              <p>{ repository.description }</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  ) 
};

export default Dashboard;
