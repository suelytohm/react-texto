import { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useFetch } from "./Hooks/useFetch";
import { useParams } from "react-router-dom";

function App() {
  const editorRef = useRef();
  const { route } = useParams();

  const url =
    "https://api-textos-r4rh-84nzw1r6q-suelytohm.vercel.app/nota/" + route;
  // const url = "https://notepad-api-4j3l.vercel.app/nota/" + route;
  // const url = "http://localhost:3000/nota/632cd0aba3d7307377c6a1ac";

  const { httpConfig } = useFetch(url);

  const [notas, setNotas] = useState("");
  const [init, setInit] = useState(false);

  const httpConf = (dados, metodo) => {
    httpConfig(dados, metodo);
  };

  useEffect(() => {
    (async () => {
      let res = "";
      let data = "";

      // Se já existir dados e o editor estiver iniciado
      if (init) {
        const notinhas = {
          content: notas,
          rota: route,
        };
        httpConf(notinhas, "PATCH");
      }

      // Caso estiver iniciando o editor
      else {
        res = await fetch(url);
        data = await res.json();

        // Caso o retorno da api não tiver dados registrados no banco de dados
        if (data === null) {
          const notinhas2 = {
            content: "",
            rota: route,
          };
          // Criando novo registro no banco de dados com a nova URL
          httpConf(notinhas2, "POST");
        } else {
          // Carregando os dados do banco e atribuindo o valor as notas
          setNotas(data.content);
        }
      }
    })();
  }, [notas, init, route, url]);

  function onClickHandler() {
    setNotas(editorRef.current.getContent());
  }

  return (
    <div>
      <Editor
        onEditorChange={onClickHandler}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          editor.selection.select(editor.getBody(), true);
          editor.selection.collapse(false);
          setInit(true);
        }}
        init={{
          auto_focus: true,
          plugins:
            "hr image autosave autolink lists media table emoticons link charmap lists advlist autolink insertdatetime searchreplace",
          toolbar:
            "undo redo | formatselect | bold italic underline strikethrough | bullist image emoticons charmap hr link insertdatetime searchreplace",
          insertdatetime_formats: ["%H:%M:%S", "%d-%m-%Y", "%I:%M:%S %p", "%D"],
          menubar: false,
          branding: false,
          elementpath: false,
          height: 800,
          toolbar_mode: "scrolling",
        }}
        value={notas}
      ></Editor>
    </div>
  );
}

export default App;
