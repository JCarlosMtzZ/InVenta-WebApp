import FormsContainer from "./components/FormsContainer.jsx"
import LoginForm from "./components/LoginForm.jsx"
import SignupForm from "./components/SignupForm.jsx"

function App() {

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-100 flex flex-col justify-center items-center ">
      <FormsContainer />
      {/*
      <LoginForm />
      <SignupForm />
      */}
      <h1 className="text-6xl font-bold text-mag">Hello, TailwindCSS</h1>
      
      </div>
  )
}

export default App
