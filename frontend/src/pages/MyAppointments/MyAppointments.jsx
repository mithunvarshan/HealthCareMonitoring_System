import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/get-appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setAppointments(response.data.appointments);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      setError('No appointments booked');
      toast.error('No appointments booked');
    } finally {
      setLoading(false);
    }
  };

  const initPay = async (order, appointmentId) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          const { data } = await axios.post(
            `${backendUrl}/api/user/update-status`,
            {
              appointmentId,
              razorpayPaymentId: razorpay_payment_id,
              razorpayOrderId: razorpay_order_id,
              razorpaySignature: razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (data.success) {
            toast.success('Appointment successfully booked!');
            setAppointments((prevAppointments) =>
              prevAppointments.map((appointment) =>
                appointment._id === appointmentId ? { ...appointment, payment: true } : appointment
              )
            );
          } else {
            toast.error('Failed to update appointment status');
          }
        } catch (error) {
          toast.error('Payment update failed');
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      if (!token) {
        toast.error('User not logged in. Please log in again.');
        return;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        initPay(data.order, appointmentId);
      } else {
        toast.error('Payment initiation failed');
      }
    } catch (error) {
      console.error('Error during Razorpay payment:', error);
      toast.error('Payment initiation failed');
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((app) => app._id !== appointmentId)
        );
        toast.success('Appointment canceled successfully');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error('Failed to cancel the appointment');
    }
  };

  const redirectToDoctorBooking = (doctorId) => {
    navigate(`/doctors`);
  };

  useEffect(() => {
    fetchAppointments();
  }, [token]);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <p className='text-zinc-700 border-b pb-3 mt-12 font-medium'>My Appointments</p>
      {appointments.length > 0 ? (
        appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData?.image || '/default-image.jpg'} alt={item.docData?.name} />
            </div>
            <div className='flex-1 text-sm'>
              <p className='text-neutral-800 font-semibold'>{item.docData?.name || 'Doctor Name Not Available'}</p>
              <p className='text-zinc-600'>{item.docData?.speciality || 'Speciality Not Available'}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData?.address?.line1 || 'Address not available'}</p>
              <p className='text-xs'>{item.docData?.address?.line2 || 'Address not available'}</p>
              <p className='text-zinc-700 font-medium mt-2'>
                Date & Time: <span className='text-neutral-700'>{new Date(item.slotDate).toLocaleDateString()} | {item.slotTime}</span>
              </p>
            </div>
            <div className='flex flex-col gap-2 justify-end'>
              
              <button
                className='text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300'
                onClick={() => cancelAppointment(item._id)}
              >
                Cancel Appointment
              </button>
              {item.payment ? (
                <button className='text-green-600 text-center sm:min-w-48 py-2 border border-green-600 bg-green-100 cursor-not-allowed'>
                  Appointment Booked
                </button>
              ) : (
                <button
                  className='text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300'
                  onClick={() => appointmentRazorpay(item._id)}
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>No appointments found.</p>
          <button className='text-primary font-semibold mt-4' onClick={() => navigate('/doctors')}>
            Browse Doctors and Book an Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;