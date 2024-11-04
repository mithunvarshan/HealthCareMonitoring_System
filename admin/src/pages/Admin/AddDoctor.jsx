import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext'; // Adjust this path as necessary
import { assets } from '../../assets/assets';

const AddDoctor = () => {
    const { backendUrl, aToken } = useContext(AdminContext);

    const [docImg, setDocImg] = useState(null); // For storing the doctor image
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('General Physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDocImg(file); // Store the file directly for FormData
        }
    };

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email); // Simple email validation

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // Validate email
        if (!isValidEmail(email)) {
            return toast.error('Invalid email format');
        }

        try {
            // Check if the image is selected
            if (!docImg) {
                return toast.error('Image Not Selected');
            }

            // Create FormData object
            const formData = new FormData();
            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees)); // Ensure fees is a number
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

            // Log form data for debugging purposes
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });
            console.log('Submitting to:', `${backendUrl}/api/admin/add-doctor`);
            console.log('Using token:', aToken);

            // Make POST request
            const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    atoken: aToken // Include the authorization token
                }
            });

            // Handle response
            if (data.success) {
                toast.success(data.message);
                // Clear input fields after successful submission
                setDocImg(null);
                setName('');
                setEmail('');
                setPassword('');
                setExperience('1 Year');
                setFees('');
                setAbout('');
                setSpeciality('General Physician');
                setDegree('');
                setAddress1('');
                setAddress2('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while adding the doctor.');
        }
    };

    return (
        <form className='m-5 w-full' onSubmit={onSubmitHandler}>
            <p className='mb-3 text-lg font-medium'>Add Doctor</p>

            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-auto text-gray-500'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Upload Doctor Image Section */}
                    <div className='flex flex-col items-center mb-8'>
                        <label htmlFor="doc-img" className='flex flex-col items-center'>
                            {docImg ? (
                                <img className='w-16 h-16 bg-gray-100 rounded-full object-cover' src={URL.createObjectURL(docImg)} alt="Doctor" />
                            ) : (
                                <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={assets.upload_icon} alt="Upload" />
                            )}
                            <input type="file" id="doc-img" hidden onChange={handleImageChange} />
                            <p className='text-center'>Upload doctor <br /> picture</p>
                        </label>
                    </div>

                    {/* Doctor Name Section */}
                    <div>
                        <p>Doctor Name</p>
                        <input className='border rounded px-3 py-2 w-full' type="text" placeholder='Doctor Name' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    {/* Doctor Email Section */}
                    <div>
                        <p>Doctor Email</p>
                        <input className='border rounded px-3 py-2 w-full' type="email" placeholder='admin@prescripto.com' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    {/* Doctor Password Section */}
                    <div>
                        <p>Doctor Password</p>
                        <input className='border rounded px-3 py-2 w-full' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    {/* Experience Section */}
                    <div className='flex-1'>
                        <p>Experience</p>
                        <select className='border rounded px-3 py-2 w-full' value={experience} onChange={(e) => setExperience(e.target.value)} required>
                            <option value="1 Year">1 Year</option>
                            <option value="2 Years">2 Years</option>
                            <option value="3 Years">3 Years</option>
                            <option value="4 Years">4 Years</option>
                            <option value="5 Years">5 Years</option>
                            <option value="6 Years">6 Years</option>
                            <option value="7 Years">7 Years</option>
                            <option value="8 Years">8 Years</option>
                        </select>
                    </div>

                    {/* Fees Section */}
                    <div>
                        <p>Fees</p>
                        <input className='border rounded px-3 py-2 w-full' type="number" placeholder='Fees' value={fees} onChange={(e) => setFees(e.target.value)} required />
                    </div>

                    {/* Education Section */}
                    <div>
                        <p>Education</p>
                        <input className='border rounded px-3 py-2 w-full' type="text" placeholder='Education' value={degree} onChange={(e) => setDegree(e.target.value)} required />
                    </div>

                    {/* Address Section */}
                    <div className='flex flex-col'>
                        <p>Address</p>
                        <input className='border rounded px-3 py-2 w-full mb-2' type="text" placeholder='Address 1' value={address1} onChange={(e) => setAddress1(e.target.value)} required />
                        <input className='border rounded px-3 py-2 w-full' type="text" placeholder='Address 2' value={address2} onChange={(e) => setAddress2(e.target.value)} />
                    </div>

                    {/* Specialty Section */}
                    <div>
                        <p>Specialty</p>
                        <select className='border rounded px-3 py-2 w-full' value={speciality} onChange={(e) => setSpeciality(e.target.value)} required>
                            <option value="General Physician">General Physician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatrician">Pediatrician</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>
                    </div>

                    {/* About Doctor Section */}
                    <div className='md:col-span-2'>
                        <p className='mb-2'>About Doctor</p>
                        <textarea className='border rounded px-3 py-2 w-full' placeholder='Write about the doctor...' value={about} onChange={(e) => setAbout(e.target.value)} rows="4"></textarea>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>Add Doctor</button>
        </form>
    );
};

export default AddDoctor;
