import React, {useState} from 'react'
import { withRouter } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios'

function UploadPage() {


    const [Title, setTitle] = useState('')
    const [Desc, setDesc] = useState('')
    const [Opt1, setOpt1] = useState('')
    const [Opt2, setOpt2] = useState('')
    const Option1 = ['Private', 'Public']
    const Option2 = ['Personal', 'Movie', 'Food', 'Music', 'Sport', 'News']

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

    const DropE = (files) => {
        let dropData = new FormData();
        const config = {
            header: {'content-type':'multipart/form-data'}
        }
        dropData.append('file', files[0])
        console.log(files)

        axios.post('/api/upload/videos', dropData, config)
            .then(response => {
                if (response.data.success) {
                    
                    let variable = {
                        url: response.data.url,
                        fileName : response.data.filename
                    }

                    axios.post('/api/upload/thumbnail', variable)
                        .then(response => {
                                    
                            if (response.data.success) {
                            
                            } else {
                                alert('failed to make thumbnail')
                        }
                        })

                } else {
                    alert(response.data.err.msg)
            }
            })
    //client : axios.post - /api/upload/videos
    //server-index - app.use - /api/upload
    //router.post - /videos
        
   
                  
        
        
    }

    return (
        <div>
            <form >
                    <h2>Upload video</h2>

                <Dropzone
                    onDrop={DropE}
                    // multiple={false}
                    // maxSize
                >
                    {({ getRootProps, getInputProps }) => (
                    <div style={{ width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', border:'1px solid black' }} {...getRootProps()}>
                        <PlusOutlined style={{position:'absolute',fontSize:'36px'}}/>
                        <input type="file" style={{ width: '100%', height: '100%', opacity:'1',cursor:'pointer' }} {...getInputProps()} />
                    </div>
                        )}
                    </Dropzone>
                <div style={{ display: 'flex', flexDirection: 'column', width:'200px',height: '220px',justifyContent: 'space-between',border:'1px solid red' }}>

                    <div style={{display:'flex',flexDirection:'column',border:'1px solid red'}}>
                        <label>Title</label>
                        <input onChange={titleChange} value={Title}></input>
                        
                        <label>Desc</label>
                        <textarea onChange={descChange} value={Desc}></textarea>
                    </div>

                    <select onChange={Option1Change} value={Opt1}>
                        {Option1.map((opt, index) => (
                            <option key={index}>{opt}</option>
                        ))}</select>

                    <select onChange={Option2Change} value={Opt2}>
                        {Option2.map((opt, index) => (
                            <option key={index}>{opt}</option>
                        ))}
                    </select>
                    <button style={{marign:'0'}}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default withRouter(UploadPage)