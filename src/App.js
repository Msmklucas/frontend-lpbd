import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../src/style.css'

const API_BASE_URL = 'http://localhost:3002';

const App = () => {
  const [computadores, setComputadores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [novoComputador, setNovoComputador] = useState({
    placa_mae: '',
    processador: '',
    memoria: '',
    fonte: '',
    ssd: '',
  });

  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    computador_id: '',
  });

  const [modoEdicaoComputador, setModoEdicaoComputador] = useState(null);
  const [modoEdicaoUsuario, setModoEdicaoUsuario] = useState(null);

  const handleNovoComputadorChange = (e) => {
    const { name, value } = e.target;
    setNovoComputador((prev) => ({ ...prev, [name]: value }));
  };

  const handleNovoUsuarioChange = (e) => {
    const { name, value } = e.target;
    setNovoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const adicionarNovoComputador = async () => {
    try {
      await axios.post(`${API_BASE_URL}/computadores`, novoComputador);
      setNovoComputador({
        placa_mae: '',
        processador: '',
        memoria: '',
        fonte: '',
        ssd: '',
      });
      loadData();
    } catch (error) {
      console.error('Erro ao adicionar novo computador:', error);
    }
  };

  const adicionarNovoUsuario = async () => {
    try {
      await axios.post(`${API_BASE_URL}/usuarios`, novoUsuario);
      setNovoUsuario({
        nome: '',
        computador_id: '',
      });
      loadData();
    } catch (error) {
      console.error('Erro ao adicionar novo usuário:', error);
    }
  };

  const handleEditarComputador = (id) => {
    setModoEdicaoComputador(id);
    const computadorEditando = computadores.find((comp) => comp.id === id);
    setNovoComputador(computadorEditando);
  };

  const handleSalvarEdicaoComputador = async () => {
    try {
      await axios.put(`${API_BASE_URL}/computadores`, novoComputador);
      setModoEdicaoComputador(null);
      setNovoComputador({
        placa_mae: '',
        processador: '',
        memoria: '',
        fonte: '',
        ssd: '',
      });
      loadData();
    } catch (error) {
      console.error('Erro ao salvar edição do computador:', error);
    }
  };

  const handleEditarUsuario = (id) => {
    setModoEdicaoUsuario(id);
    const usuarioEditando = usuarios.find((user) => user.id === id);
    setNovoUsuario(usuarioEditando);
  };

  const handleSalvarEdicaoUsuario = async () => {
    try {
      await axios.put(`${API_BASE_URL}/usuarios`, novoUsuario);
      setModoEdicaoUsuario(null);
      setNovoUsuario({
        nome: '',
        computador_id: '',
      });
      loadData();
    } catch (error) {
      console.error('Erro ao salvar edição do usuário:', error);
    }
  };

  const handleExcluirComputador = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/computadores/${id}`);
      loadData();
    } catch (error) {
      console.error('Erro ao excluir computador:', error);
    }
  };

  const handleExcluirUsuario = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/usuarios/${id}`);
      loadData();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const loadData = async () => {
    try {
      const computadoresResponse = await axios.get(`${API_BASE_URL}/computadores`);
      setComputadores(computadoresResponse.data);

      const usuariosResponse = await axios.get(`${API_BASE_URL}/usuarios`);
      setUsuarios(usuariosResponse.data);
    } catch (error) {
      console.error('Erro ao carregar dados da API:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Computadores</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Placa Mãe</th>
            <th scope="col">Processador</th>
            <th scope="col">Memória</th>
            <th scope="col">Fonte</th>
            <th scope="col">SSD</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {computadores.map((computador) => (
            <tr key={computador.id}>
              <th scope="row">{computador.id}</th>
              <td>
                {modoEdicaoComputador === computador.id ? (
                  <input
                    type="text"
                    name="placa_mae"
                    value={novoComputador.placa_mae}
                    onChange={handleNovoComputadorChange}
                  />
                ) : (
                  computador.placa_mae
                )}
              </td>
              <td>
                {modoEdicaoComputador === computador.id ? (
                  <input
                    type="text"
                    name="processador"
                    value={novoComputador.processador}
                    onChange={handleNovoComputadorChange}
                  />
                ) : (
                  computador.processador
                )}
              </td>
              <td>
                {modoEdicaoComputador === computador.id ? (
                  <input
                    type="text"
                    name="memoria"
                    value={novoComputador.memoria}
                    onChange={handleNovoComputadorChange}
                  />
                ) : (
                  computador.memoria
                )}
              </td>
              <td>
                {modoEdicaoComputador === computador.id ? (
                  <input
                    type="text"
                    name="fonte"
                    value={novoComputador.fonte}
                    onChange={handleNovoComputadorChange}
                  />
                ) : (
                  computador.fonte
                )}
              </td>
              <td>
                {modoEdicaoComputador === computador.id ? (
                  <input
                    type="text"
                    name="ssd"
                    value={novoComputador.ssd}
                    onChange={handleNovoComputadorChange}
                  />
                ) : (
                  computador.ssd
                )}
              </td>
              <td>
                {modoEdicaoComputador === computador.id ? (
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      onClick={handleSalvarEdicaoComputador}
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm ml-1"
                      onClick={() => setModoEdicaoComputador(null)}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <>
                      <button
                        type="button"
                        className="btn btn-outline-warning btn-sm"
                        onClick={() => handleEditarComputador(computador.id)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm ml-1"
                        onClick={() => handleExcluirComputador(computador.id)}
                      >
                        Excluir
                      </button>
                    </>
                  )}
                </td>
            </tr>
          ))}
          <tr>
            <th scope="row">Preencha</th>
            <td>
              <input
                type="text"
                placeholder="Placa mãe"
                name="placa_mae"
                value={novoComputador.placa_mae}
                onChange={handleNovoComputadorChange}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Processador"
                name="processador"
                value={novoComputador.processador}
                onChange={handleNovoComputadorChange}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Capacidade de Memoria"
                name="memoria"
                value={novoComputador.memoria}
                onChange={handleNovoComputadorChange}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Digite o Modelo"
                name="fonte"
                value={novoComputador.fonte}
                onChange={handleNovoComputadorChange}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Digite a capacidade"
                name="ssd"
                value={novoComputador.ssd}
                onChange={handleNovoComputadorChange}
              />
            </td>
            <td>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={adicionarNovoComputador}
              >
                Adicionar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <h1 className="mb-4">Usuários</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">ID do Computador</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <th scope="row">{usuario.id}</th>
              <td>
                {modoEdicaoUsuario === usuario.id ? (
                  <input
                    type="text"
                    name="nome"
                    value={novoUsuario.nome}
                    onChange={handleNovoUsuarioChange}
                  />
                ) : (
                  usuario.nome
                )}
              </td>
              <td>
                {modoEdicaoUsuario === usuario.id ? (
                  <input
                    type="text"
                    name="computador_id"
                    value={novoUsuario.computador_id}
                    onChange={handleNovoUsuarioChange}
                  />
                ) : (
                  usuario.computador_id
                )}
              </td>
              <td>
                {modoEdicaoUsuario === usuario.id ? (
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      onClick={handleSalvarEdicaoUsuario}
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm ml-1"
                      onClick={() => setModoEdicaoUsuario(null)}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => handleEditarUsuario(usuario.id)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ml-1"
                      onClick={() => handleExcluirUsuario(usuario.id)}
                    >
                      Excluir
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <th scope="row">Preencha</th>
            <td>
              <input
                type="text"
                placeholder="Digite o nome"
                name="nome"
                value={novoUsuario.nome}
                onChange={handleNovoUsuarioChange}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Digite o ID"
                name="computador_id"
                value={novoUsuario.computador_id}
                onChange={handleNovoUsuarioChange}
              />
            </td>
            <td>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={adicionarNovoUsuario}
              >
                Adicionar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
