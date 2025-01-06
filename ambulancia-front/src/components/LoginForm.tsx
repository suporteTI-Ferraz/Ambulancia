import React, { useState } from 'react';

type AuthFormProps = {
  onSubmit: (username: string, password: string) => void;
};

const LoginForm: React.FC<AuthFormProps> = ({onSubmit }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, senha);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="text-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-6">
          <h1 className="text-lg text-center font-bold mb-4">Faça o login</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="senha"
              type="password"
              placeholder="******************"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center">
            <button type="submit">Login</button>
          </div>
          
        </form>
 {/* Texto clicável para redirecionar para a página de cadastro */}
 
 <p className="text-center text-gray-700 text-sm mt-6">
  Não tem uma conta?{' '}
  <span className="bg-transparent hover:bg-blue-300 text-black font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 ease-in-out">
  </span>
</p>
        
      </div>
    </div>
  );
};

export default LoginForm;