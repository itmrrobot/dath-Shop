import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { url } from '../../constants';
import axios from 'axios';

const UploadComponent = () => {
    const [videoFile, setVideoFile] = useState(null);
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setVideoFile(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'video/*' });

    const handleUpload = async () => {
        if (videoFile) {
            try {
                // Gửi video lên máy chủ
                const response = await axios.post(`${url}/create/returns/`, {
                    imgVideo: [videoFile],
                });
                console.log(response);
                // if (response) {
                //     console.log('Video uploaded successfully!');
                //     // Xử lý khi video được tải lên thành công
                // } else {
                //     console.error('Failed to upload video');
                // }
            } catch (error) {
                console.error('Error uploading video:', error);
            }
        }
    };

    return (
        <div>
            <div
                {...getRootProps()}
                name="video"
                style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
            >
                <input {...getInputProps()} />
                <p>Drag 'n' drop a video file here, or click to select a video file</p>
            </div>
            {videoFile && (
                <div>
                    <video controls style={{ width: '100%' }}>
                        <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
                        Your browser does not support the video tag.
                    </video>
                    <button onClick={handleUpload}>Upload Video</button>
                </div>
            )}
        </div>
    );
};

export default UploadComponent;
