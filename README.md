# Ambulancia
## Introdução

Este sistema permite o gerenciamento de agendamentos referentes às ambulâncias do município de Ferraz de Vasconcelos, nele, você pode gerenciar os pacientes, motoristas, veículos, funcionários e o agendamento em que os pacientes estarão. Além disso pode-se gerar gráficos detalhando coisas como o quanto de gasolina e manutenção um veículo gasta, pacientes mais atendidos em determinada unidade hospitalar, entre outras coisas.

## Tecnologias Utilizadas

- Front-end: React com TypeScript.
- Back-end: SpringBoot.
- Banco de Dados: H2, em produção poderá ser o PostgreSQL ou MySQL.
- Padrão de Projeto: MVC.

## Tipos de Usuários

### Administrador

- Pode gerenciar agendamentos junto a todas as outras entidades (incluindo funcionários).
- Pode definir a privacidade de acesso aos formulários e delegar ou remover acessos.
- Tem controle total sobre os agendamentos.
- Tem autoridade para editar/deletar qualquer entidade (inclusive trocar a senha dos demais usuários).

### Funcionario

- Por enquanto ele tem todas as funções que o Admin, menos a parte de gerenciar funcionarios.


## Configuração Inicial

Para iniciar o sistema, siga os passos abaixo:

### O .env será implementado ainda, por enquanto não precias dele...

##### Servidor:

java versão 19

Clonar o repositório e rodar a aplicação Spring Boot


##### Banco de dados:

Por enquanto ele já está pronto usando o H2 (Banco de dados na memória)




### FrontEnd

comando para instalar as dependências (só usa uma vez)
```bash
yarn install
```
comando para rodar o front
```bash
yarn dev
```



