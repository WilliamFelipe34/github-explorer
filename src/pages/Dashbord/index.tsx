import React from 'react';
import { FiChevronRight } from 'react-icons/fi'

import logoImage from '../../asset/logo.svg'

import { Title, Form, Repositories } from './style'

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImage} alt="Github Explorer"></img>
      <Title>Explore repositórios no GitHub</Title>
      <Form>
        <input placeholder="Digite o nome do repositório"/>
        <button type="submit" >Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img 
            src="https://avatars.githubusercontent.com/u/21224558?s=460&u=f6608225c4f9ca6b6b45471d5a78336304cec98d&v=4"
            alt="William Felipe" />
          <div>
            <strong>william felipe</strong>
            <p>TESTES DE DESCRIÇÂO</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  ) 
};

export default Dashboard;
