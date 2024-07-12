import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../harpers/axios';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [sex, setSex] = useState('Male');
    const [profileUrl, setProfileUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [edit, setEdit] = useState(false);
    const fileInputRef = useRef(null);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            if (user) {
                setName(user.name || '');
                setBirthDate(user.birthDate || '');
                setSex(user.sex || 'Male');
                setProfileUrl(import.meta.env.VITE_BACKEND_URL + (user.photo || ''));
            }
        };
        fetchUser();
    }, [user]);

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);

        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                setPreview(e.target.result);
            };
            fileReader.readAsDataURL(file);
        } else {
            console.error('No file selected');
        }
    };

    const submitUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const User = {
                name,
                sex,
                birthDate
            };

            const res = await axios.patch(`/api/users/${user._id}`, User);

            if (file) {
                const formData = new FormData();
                formData.set('photo', file);
                await axios.post(`/api/users/${res.data._id}/upload`, formData, {
                    headers: {
                        Accept: 'multipart/form-data'
                    }
                });
            }

            if (res.status === 200) {
                setLoading(false);
                setEdit(false)
                navigate('/');
            }
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.error || 'An error occurred');
            console.error(error);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    return (
        <form className='w-full h-auto flex justify-between' onSubmit={submitUser}>
            <div className='w-[95%]'>
                {user && (
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 flex items-center">
                                    <img 
                                        src={preview || profileUrl} 
                                        className='w-[100px] cursor-pointer' 
                                        onClick={handleImageClick} 
                                        alt="User profile"
                                    />
                                    {edit && (
                                        <input 
                                            type="file" 
                                            hidden 
                                            ref={fileInputRef} 
                                            onChange={handleProfileChange}
                                        />
                                    )}
                                    {!edit ? (
                                        <h1 className='font-bold text-2xl'>{name}</h1>
                                    ) : (
                                        <input 
                                            className='font-bold text-2xl' 
                                            value={name} 
                                            onChange={e => setName(e.target.value)}
                                        />
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">User Id</td>
                                <td className="border px-4 py-2">{user._id}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Sex</td>
                                {edit ? (
                                    <td className="border px-4 py-2">
                                        <select value={sex} onChange={e => setSex(e.target.value)}>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </td>
                                ) : (
                                    <td className="border px-4 py-2">{sex}</td>
                                )}
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Date Of Birth</td>
                                {edit ? (
                                    <td className="border px-4 py-2">
                                        <input 
                                            type="date" 
                                            value={birthDate} 
                                            onChange={e => setBirthDate(e.target.value)} 
                                        />
                                    </td>
                                ) : (
                                    <td className="border px-4 py-2">{birthDate}</td>
                                )}
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Created At</td>
                                <td className="border px-4 py-2">{user.createdAt}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
            <div className='w-[5%]'>
                {edit && 
                    
             (
                    <button type='submit' className='px-1 py-2 bg-blue-400 rounded-lg'>Submit</button>
                )}
            </div>
           {!edit && <button type='button' className='px-1 py-1 h-10 bg-blue-400 rounded-lg' onClick={()=>setEdit(true)}>edit</button>}
        </form>
    );
}
