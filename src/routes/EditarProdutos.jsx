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