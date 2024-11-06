"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function DisciplinasFormPage(props) {
  const [professorFiltrado, setProfessorFiltrado] = useState([]);

  // router -> hook para navegação de telas
  const router = useRouter();

  // Busca a lista de faculdades para usar no select
  const professores = JSON.parse(localStorage.getItem("professores")) || [];
  const disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || [];
  // Buscar a lista de cursos no localStorage, se não existir, inicializa uma lista vazia
  const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

  // Recuperando id para edição
  const id = props.searchParams.id;
  console.log(props.searchParams.id);
  // Buscar na lista a faculdade com o ID recebido no parametro
  const disciplinaEditado = disciplinas.find((item) => item.id == id);
  console.log(disciplinaEditado);

  // função para salvar os dados do form
  function salvar(dados) {
    // Se cursoEditado existe, mudar os dados e gravar no localStorage
    if (disciplinaEditado) {
      Object.assign(disciplinaEditado, dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("disciplinas", JSON.stringify(disciplinas));
    } else {
      // se cursoEditado não existe, é criação de uma nova
      // gerar um ID (Identificador unico)
      dados.id = v4();
      // Adiciona a nova faculdade na lista de faculdades
      disciplinas.push(dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("disciplinas", JSON.stringify(disciplinas));
    }

    alert("Disciplina criada com sucesso!");
    router.push("/disciplinas");
  }

  // Campos do form e valores iniciais(default)
  const initialValues = {
    nome: "",
    descricao: "",
    status: "",
    curso: "",
    professores: "",
  };

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
    curso: Yup.string().required("Campo obrigatório"),
    professores: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de Disciplinas"}>
      {/* Formulário */}

      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados de cursoEditado
        // Se for nova, colocar o initialValues com os valores vazios
        initialValues={disciplinaEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* construção do template do formulário */}
        {
          // os valores e funções do formik
          ({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            // ações do formulário
            useEffect(() => {
              if (values.curso !== "") {
                const teacherFiltered = professores.filter(
                  (professor) => professor.curso == values.curso
                );
                console.log(teacherFiltered);
                setProfessorFiltrado(teacherFiltered);
              }
            }, [values.curso]);

            // debug
            // console.log("DEBUG >>>")
            // console.log({values, errors, touched})

            // retorno com o template jsx do formulário
            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do form */}
                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                      name="nome"
                      type="text"
                      value={values.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.nome && !errors.nome}
                      isInvalid={touched.nome && errors.nome}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nome}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Descricao:</Form.Label>
                    <Form.Control
                      name="descricao"
                      type="text"
                      value={values.descricao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.descricao && !errors.descricao}
                      isInvalid={touched.descricao && errors.descricao}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.descricao}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Status:</Form.Label>
                    <Form.Select
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.status && !errors.status}
                      isInvalid={touched.status && errors.status}
                    >
                      <option value="">Selecione</option>
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.status}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Curso:</Form.Label>
                    <Form.Select
                      name="curso"
                      value={values.cursos}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.curso && !errors.curso}
                      isInvalid={touched.curso && errors.curso}
                    >
                      <option value="">Selecione</option>
                      {cursos.map((curso) => (
                        <option value={curso.nome}>{curso.nome}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.curso}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Professor:</Form.Label>
                    <Form.Select
                      name="professores"
                      value={values.professores}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={values.curso == ""}
                      isValid={touched.professores && !errors.professores}
                      isInvalid={touched.professores && errors.professores}
                    >
                      <option value="">Selecione</option>
                      {professorFiltrado.map((professor) => (
                        <option value={professor.nome}>{professor.nome}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.professores}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* botões */}
                <Form.Group className="text-end">
                  <Button className="me-2" href="/disciplinas">
                    <FaArrowLeft /> Voltar
                  </Button>
                  <Button type="submit" variant="success">
                    <FaCheck /> Enviar
                  </Button>
                </Form.Group>
              </Form>
            );
          }
        }
      </Formik>
    </Pagina>
  );
}