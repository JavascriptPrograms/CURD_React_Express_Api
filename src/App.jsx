import "./App.css";
import Add_Student from './Add_Student';
import Show_Student from './Show_Student';

function App() {
 
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className="col-sm-4">
              <Add_Student/>
        </div>
        <div className='col-sm-8'>
              <Show_Student/>
        </div>
      </div>     
    </div>
  )
}

export default App
