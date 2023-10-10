import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

export default function EditarProdutos() {

    const {id} = useParams();

    document.title = "Editar Produtos " + id; 

    const[produto,setProduto] = useState({
      
    });

    //Criar uma estratégia para recuperar o produto da API-JSON com fetch, utilizando GET:
    useEffect(()=>{
      
      fetch(`http://localhost:5000/produtos/${id}`)
      .then((response)=> response.json())
      .then((response)=> setProduto(response))
      .catch(error=> console.log(error));

    },[id]);
    
    const handleChange = (e)=>{

      //Destructuring
      const {name,value} = e.target;

      if(name == "nome"){
        setProduto({"nome":value,"desc":"","preco":""});
      }else if(name == "desc"){
        setProduto({"nome":"","desc":value,"preco":""});
      }else if(name == "preco"){
        setProduto({"nome":"","desc":"","preco":value});
      }
      
    }


  return (
    <div>
        <h1>Editar Produtos</h1>
          <div>
            <form>
              <fieldset>
                <legend>Produto Selecionado</legend>
                <div>
                  <label htmlFor="">Nome:</label>
                  <input type="text" name="nome" placeholder="Digite o nome do Produto." value={produto.nome} onChange={handleChange}/>
                </div>
                <div>
                  <label htmlFor="">Descrição:</label>
                  <input type="text" name="desc" placeholder="Digite a descrição do Produto." value={produto.desc} onChange={handleChange}/>
                </div>
                <div>
                  <label htmlFor="">Preço:</label>
                  <input type="text" name="preco" placeholder="Digite o preço do Produto." value={produto.preco} onChange={handleChange}/>
                </div>
                <div>
                  <button>EDITAR</button>
                </div>
              </fieldset>
            </form>
          </div>

    </div>
  )
}

// //1ª FORMA DE INPUT COM useState
// <form>
// <fieldset>
//   <legend>Produto Selecionado</legend>
//   <div>
//     <label htmlFor="">Nome:</label>
//     <input type="text" name="nome" placeholder="Digite o nome do Produto." value={produto.nome} onChange={(e)=> setProduto(e.target.value)}/>
//   </div>
//   <div>
//     <label htmlFor="">Descrição:</label>
//     <input type="text" name="desc" placeholder="Digite a descrição do Produto." value={produto.desc} onChange={(e)=> setProduto(e.target.value)}/>
//   </div>
//   <div>
//     <label htmlFor="">Preço:</label>
//     <input type="text" name="preco" placeholder="Digite o preço do Produto." value={produto.preco} onChange={(e)=> setProduto(e.target.value)}/>
//   </div>
//   <div>
//     <button>EDITAR</button>
//   </div>
// </fieldset>
// </form>