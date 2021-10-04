import React, {useState} from 'react'
import { withRouter } from 'react-router-dom'
import Dropzone from 'react-dropzone'
function UploadPage() {

const [Title, setTitle] = useState('')
const [Desc, setDesc] = useState('')
const [Opt1, setOpt1] = useState('')
const [Opt2, setOpt2] = useState('')
    const Option1 = ['Private','Public']
    const Option2 = ['Personal','Movie','Food','Music','Sport','News']

    const titleChange = (e) => {
        setTitle(e.currentTarget.value)
    }
    const descChange = (e) => {
        setDesc(e.currentTarget.value)
    }

    const Option1Change = (e) => {
        setOpt1(e.currentTarget.value)
    }
    const Option2Change = (e) => {
        setOpt2(e.currentTarget.value)
    }
    return (
        <div>
            <form >
                <div style={{display:'flex',flexDirection:'column',height:'300px',justifyContent:'space-between'}}>
                {/* <Dropzone onDrop multiple>
                    <div></div>
                    </Dropzone> */}
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <label>Title</label>
                    <input onChange={titleChange} value={Title}></input>
                    
                    <label>Desc</label>
                    <textarea onChange={descChange} value={Desc}></textarea>
                    </div>

                    <select onChange={Option1Change} value={Opt1}>{Option1.map((opt,index) =>(
                    <option key={index}>{opt}</option>
                    ))}</select>
                <select onChange={Option2Change} value={Opt2}>
                    {Option2.map((opt,index) =>(
                    <option key={index}>{opt}</option>
                    ))}
                </select>
                    <button>Submit</button>
                    </div>

                </form>
        </div>
    )
}

export default withRouter(UploadPage)