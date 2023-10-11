import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditarProdutos() {
  document.title = "EDITAR PRODUTO";

  const navigate = useNavigate();
  const { id } = useParams();
  const [produto, setProduto] = useState({
    id: '',
    nome: '',
    desc: '',
    img: '',
    preco: '',
  });

  useEffect(() => {
    fetch(`http://localhost:5000/produtos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProduto(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/produtos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    })
      .then((response) => response.json())
      .then(() => {
        // Redirecionar após a edição ser concluída
        navigate('/produtos');
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Editar Produto</legend>
            <div>
              <label htmlFor="idNome">Nome</label>
              <input type="text" name="nome" id="idNome" value={produto.nome} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="idDesc">Descrição</label>
              <input type="text" name="desc" id="idDesc" value={produto.desc} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="idPreco">Preço</label>
              <input type="text" name="preco" id="idPreco" value={produto.preco} onChange={handleChange} />
            </div>
            <div>
              <button type="submit">EDITAR</button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}