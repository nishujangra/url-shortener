import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button';
import { BeatLoader } from 'react-spinners';
import Error from './error';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import useFetch from '@/hooks/useFetch';
import { signup } from '@/db/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '@/context';


const Signup = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');

  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profilePic: null
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files ? e.target.files[0] : e.target.value
    });
  }

  const { data, error, loading, fn: fnSignup } = useFetch(signup, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error == null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, error, longLink, navigate, fetchUser]);

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid Email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        profilePic: Yup.mixed().required('Profile Picture is required')
      });

      await schema.validate(formData, { abortEarly: false });

      // Call the login function from the API
      await fnSignup();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription> Create a new account, if you haven&rsquo;t yet </CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              name='name'
              type='text'
              placeholder='Enter Name'
              onChange={handleInputChange}
            />
            {errors.name && <Error message={errors.name} />}
          </div>

          <div className="space-y-1">
            <Input
              name='email'
              type='email'
              placeholder='Enter Email'
              onChange={handleInputChange}
            />
            {errors.email && <Error message={errors.email} />}
          </div>

          <div className="space-y-1">
            <Input
              name='password'
              type='password'
              placeholder='Enter Password'
              onChange={handleInputChange}
            />
            {errors.password && <Error message={errors.password} />}
          </div>

          <div className="space-y-1">
            <Input
              name='profilePic'
              type='file'
              accept='image/*'
              onChange={handleInputChange}
            />
            {errors.profilePic && <Error message={errors.profilePic} />}
          </div>
        </CardContent>
        <CardFooter className='flex justify-center items-center'>
          <Button type='submit' onClick={handleSignup} className='w-full' variant='outline'>
            {loading ?
              <BeatLoader size={8} color='#36b7d7' />
              :
              'Create Account'
            }
          </Button>
        </CardFooter>
      </Card>

    </div>
  )
}

export default Signup;