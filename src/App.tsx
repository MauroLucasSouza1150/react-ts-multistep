// Components
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FiSend } from "react-icons/fi";

import UserForm from "./components/UserForm";
import Thanks from "./components/Thanks";
import ReviewForm from "./components/ReviewForm";
import Steps from "./components/Steps";

// Css
import './App.css'

// Hooks
import { useForm } from "./hooks/useForm";
import { useState } from "react";

type FormFields = {
  name: string;
  email: string;
  review: string;
  comment: string;
};

const formTemplate: FormFields = {
  name: "",
  email: "",
  review: "",
  comment: ""
};


function App() {
  const [data, setData] = useState(formTemplate);

  const updateFieldHandler = (key: string, value: string) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };


  const formComponents = [
  <UserForm data={data} updateFieldHandler={updateFieldHandler} />, 
  <ReviewForm data={data} updateFieldHandler={updateFieldHandler}/>,
  <Thanks data={data}/> 
];

  const { currentStep, currentComponent, changeStep, isLastStep } = useForm(formComponents)

  return (
    <>
      <div className='app'>
        <div className='header'>
          <h2>Deixe sua Avaliação:</h2>
          <p>Ficamos felizes pelo seu bom gosto, se possível preencha o nosso formulário abaixo para avaliar nosso produto.</p>
        </div>
        <div className='form-containet'>
          <Steps currentStep={currentStep} />
          <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
            <div className='inputs-container'>
              {currentComponent}
            </div>
            <div className='actions'>
              <button type="button" onClick={() => changeStep(currentStep - 1)}>
                <GrFormPrevious />
                <span>Voltar</span>
              </button>
              {!isLastStep ? (
              <button type="submit">
                <span>Avançar</span>
                <GrFormNext />
              </button>
            ) : (
              <button type="button">
                <span>Enviar</span>
                <FiSend />
              </button>
            )}
            </div>
          </form>
        </div>
      </div>
      
    </>
  );
}

export default App
