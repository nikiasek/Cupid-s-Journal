import React from 'react'
import axios from "axios"

const editorForm = () => {


    const [message, setMessage] = useState("")
    const [style, setStyle] = useState("")
   
    async function submit (e) {
      e.preventDefault()
  
      try {
        await axios.post("http://localhost:5000/editor", {
          message, style
        })
          .then(res =>{
            if(res.data == "success") {
              alert("done")
            }
            else {
              alert("try again")
              console.log(e)
            }
        })
        .catch(e=>{
          alert("something wrong")
          console.log(e)
        })
      }
      catch(e) {
        alert("something really wrong")
        console.log(e)
      }
    }

  return (
    <div>
      <h1>Editor</h1>
      <form action="POST">
        <input type="text" onChange={(e) =>{setMessage(e.target.value)}} name="message" id="" />
        <input type="text" onChange={(e) =>{setStyle(e.target.value)}} name="style" id="" />
        <input type="submit" onClick={submit} value="" />
      </form>
    </div>
  )
}

export default editorForm
