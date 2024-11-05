"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck, FaTrash } from "react-icons/fa";
import ReactInputMask from "react-input-mask";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function alunosFormPage(props) {
  // router -> hook para navegação de telas
  const router = useRouter();

  // Busca a lista de faculdades para usar no select
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  const faculdades = JSON.parse(localStorage.getItem("faculdades")) || [];
  // Buscar a lista de cursos no localStorage, se não existir, inicializa uma lista vazia
  const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

  // Recuperando id para edição
  const id = props.searchParams.id;
  console.log(props.searchParams.id);
  // Buscar na lista a faculdade com o ID recebido no parametro
  const alunoEditado = alunos.find((item) => item.id == id);
  console.log(alunoEditado);

  // função para salvar os dados do form
  function salvar(dados) {
    // Se cursoEditado existe, mudar os dados e gravar no localStorage
    if (alunoEditado) {
      Object.assign(alunoEditado, dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("alunos", JSON.stringify(alunos));
    } else {
      // se cursoEditado não existe, é criação de uma nova
      // gerar um ID (Identificador unico)
      dados.id = v4();
      // Adiciona a nova faculdade na lista de faculdades
      alunos.push(dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("alunos", JSON.stringify(alunos));
    }

    alert("Disciplina criada com sucesso!");
    router.push("/alunos");
  }

  // Campos do form e valores iniciais(default)
  const initialValues = {
    nome: "",
    email: "",
    sobrenome: "",
    telefone: "",
    data: "",
    faculdade: "",
    curso: "",
    periodo: "",
    matricula: "",
    foto: "",
  };

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo é obrigatório"),
    sobrenome: Yup.string().required("Campo é obrigatório"),
    email: Yup.string()
      .email("E-mail inválido")
      .required("Campo é obrigatório"),
    telefone: Yup.string().required("Campo é obrigatório"),
    data: Yup.string().required("Campo é obrigatório"),
    faculdade: Yup.string().required("Campo é obrigatório"),
    curso: Yup.string().required("Campo é obrigatório"),
    periodo: Yup.string().required("Campo é obrigatório"),
    matricula: Yup.string().required("Campo é obrigatório"),
    foto: Yup.string(),
  });

  return (
    <Pagina titulo={"Cadastro de Alunos"}>
      {/* Formulário */}

      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados de cursoEditado
        // Se for nova, colocar o initialValues com os valores vazios
        initialValues={alunoEditado || initialValues}
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
            handleReset,
          }) => {
            // ações do formulário
            // debug
            // console.log("DEBUG >>>")
            // console.log({values, errors, touched})

            // retorno com o template jsx do formulário
            return (
              <Form onSubmit={handleSubmit}>
                {/* Dados pessoais */}
                <div className="text-center py-4">
                  <h3>Dados Pessoais</h3>
                  <hr />
                </div>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                      name="nome"
                      type="text"
                      value={values?.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched?.nome && !errors?.nome}
                      isInvalid={touched?.nome && !!errors?.nome}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.nome}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md={6}>
                    <Form.Label>Sobrenome:</Form.Label>
                    <Form.Control
                      name="sobrenome"
                      type="text"
                      value={values?.sobrenome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched?.sobrenome && !errors?.sobrenome}
                      isInvalid={touched?.sobrenome && !!errors?.sobrenome}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.sobrenome}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>E-mail:</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      value={values?.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched?.email && !errors?.email}
                      isInvalid={touched?.email && !!errors?.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md={6}>
                    <Form.Label>Data de Nascimento:</Form.Label>
                    <Form.Control
                      as={ReactInputMask}
                      mask={"99/99/9999"}
                      placeholder="dd/mm/aaa"
                      name="data"
                      type="text"
                      value={values?.data}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched?.data && !errors?.data}
                      isInvalid={touched?.data && !!errors?.data}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.data}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mt-2" as={Col} md={6}>
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control
                      as={ReactInputMask}
                      mask={"(99)99999-9999"}
                      placeholder="(99)99999-9999"
                      name="telefone"
                      type="text"
                      value={values?.telefone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched?.telefone && !errors?.telefone}
                      isInvalid={touched?.telefone && !!errors?.telefone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.telefone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* Acadêmico */}
                <div className="text-center py-3">
                  <h3>Acadêmico</h3>
                  <hr />
                </div>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Faculdade:</Form.Label>
                    <Form.Select
                      name="faculdade"
                      value={values.faculdade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.faculdade && !errors.faculdade}
                      isInvalid={touched.faculdade && errors.faculdade}
                    >
                      <option value="">Selecione</option>
                      {faculdades.map((faculdade) => (
                        <option value={faculdade.nome}>{faculdade.nome}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.faculdade}
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

                  <Form.Group as={Col}>
                    <Form.Label>Periodo</Form.Label>
                    <Form.Select
                      name="periodo"
                      value={values.periodo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.periodo && !errors.periodo}
                      isInvalid={touched.periodo && !!errors.periodo}
                    >
                      <option disabled value="">
                        Selecione
                      </option>
                      <option value="matutino">Matutino</option>
                      <option value="vespertino">Vespertino</option>
                      <option value="noturno">Noturno</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.periodo}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>matricula:</Form.Label>
                    <Form.Control
                      name="matricula"
                      type="text"
                      placeholder="000000"
                      value={values.matricula}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.matricula && !errors.matricula}
                      isInvalid={touched.matricula && !!errors.matricula}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.matricula}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Foto:</Form.Label>
                    <Form.Control
                      name="foto"
                      type="text"
                      placeholder="coloque uma foto do do aluno"
                      value={values.foto}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.foto && !errors.foto}
                      isInvalid={touched.foto && !!errors.foto}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.foto}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                {/* Botões */}
                <Form.Group className="text-end mb-5">
                  <Button className="me-2" href="/alunos">
                    <FaArrowLeft /> Voltar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleReset}
                    className="me-2"
                  >
                    <FaTrash /> Limpar
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
