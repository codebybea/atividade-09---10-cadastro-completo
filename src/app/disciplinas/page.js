"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function DisciplinasPage() {
  const [disciplinas, setDisciplinas] = useState([]);

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => { 
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const disciplinasLocalStorage =
      JSON.parse(localStorage.getItem("disciplinas")) || [];
    // guarda a lista no estado disciplinas
    setDisciplinas(disciplinasLocalStorage);
    console.log(disciplinasLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(disciplina) {
    // Confirma com o usuário a exclusão
    if (
      window.confirm(
        `Deseja realmente excluir a disciplina ${disciplina.nome}?`
      )
    ) {
      // filtra a lista antiga removando a disciplina recebida
      const novaLista = disciplinas.filter((item) => item.id !== disciplina.id);
      // grava no localStorage a nova lista
      localStorage.setItem("disciplinas", JSON.stringify(novaLista));
      // grava a nova lista no estado para renderizar na tela
      setDisciplinas(novaLista);
      alert("Disciplina excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Disciplinas"}>
      <div className="text-end mb-2">
        <Button href="/disciplinas/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com as disciplinas */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Curso</th>
            <th>Professor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.map((disciplina) => {
            return (
              <tr>
                <td>{disciplina.nome}</td>
                <td>{disciplina.descricao}</td>
                <td>{disciplina.status}</td>
                <td>{disciplina.curso}</td>
                <td>{disciplina.professores}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    variant="warning"
                    className="me-2"
                    href={`/disciplinas/form?id=${disciplina.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(disciplina)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Pagina>
  );
}
