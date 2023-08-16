'use client'
import axios from 'axios'
import React, { useState } from 'react'

function Upload() {

    const [file, setFile] = useState()
    const [progress, setProgress] = useState()
    const [loading, setLoading] = useState()




    const handleSubmit = async () => {
        alert("submit")
        const data = new FormData()
        data.append("file", file)
        console.log(file)

        const config = {
            onUploadProgress: function (progressEvent) {
                const percentComplete = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percentComplete)
            }
        }

        await axios.post("/api/upload", data, config).then((response) => { console.log(response) }).catch((err) => { console.log(err) })

    }


    return (
        <div className='bg-white p-4 m-auto rounded'>
            <h1>Upload Form {progress} </h1>
            <input type="file" name="file" id="file" onChange={(e) => { setFile(e.target.files[0]) }} />
            <button className='bg-gray-950 hover:bg-gray-800 text-white font-medium p-2 px-4 rounded' onClick={handleSubmit} >Upload</button>
        </div>
    )
}

export default Upload