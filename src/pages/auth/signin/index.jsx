import { useFormik } from "formik";
import * as Yup from 'yup'
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth, useAuthActions } from "src/context/AuthContext";
import { useEffect } from "react";

const SignIn = () => {
    const dispatch = useAuthActions()
    const { push } = useRouter()
    const { user } = useAuth()

    useEffect(() => {
        if (user) {
            push('/')
        }
    }, [user])

    const validationSchema = Yup.object({
        email: Yup.string().required('فیلد ایمیل ضروریست').email('ایمیل نامعتبر است'),
        password: Yup.string().required('فیلد رمز عبور ضروریست').min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد')
    })
    const onSubmit = async (values) => {
        dispatch({ type: 'SIGNIN', payload: values })
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit,
        validationSchema,
        validateOnMount: true
    })

    return (
        <div className="min-h-screen">
            <div className="container mx-auto md:max-w-md px-6 md:px-4">
                <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col gap-y-6">
                    <h2 className="font-black text-3xl my-6 text-blue-600">ورود</h2>
                    <div className="flex flex-col gap-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-gray-500 font-semibold" htmlFor="email">ایمیل</label>
                            <span className={`opacity-0 transition-all duration-200 ${formik.errors.email && formik.touched.email && '!opacity-100'} text-red-500 text-sm`}>{formik.errors.email}</span>
                        </div>
                        <input
                            dir="ltr"
                            {...formik.getFieldProps('email')}
                            id="email" type='email' className="form-input 
                        mt-1
                        block
                        rounded-md
                        bg-gray-200
                        border-transparent
                        focus:border-gray-500 focus:bg-white focus:ring-0
                        w-full
                        " />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <div className="flex items-center justify-between">
                            <label className="text-gray-500 font-semibold" htmlFor="password">رمز عبور</label>
                            <span className={`opacity-0 transition-all duration-200 ${formik.errors.password && formik.touched.password && '!opacity-100'} text-red-500 text-sm`}>{formik.errors.password}</span>
                        </div>
                        <input
                            dir="ltr"
                            {...formik.getFieldProps('password')}
                            id="password" type='password' className="form-input 
                        mt-1
                        block
                        rounded-md
                        bg-gray-200
                        border-transparent
                        focus:border-gray-500 focus:bg-white focus:ring-0
                        w-full
                        " />
                    </div>
                    <Link
                        className='text-gray-600 font-semibold mt-2 transition-all duration-200 hover:text-blue-500'
                        href='/auth/signup'>
                        هنوز ثبت نام کردی؟ صفحه ثبت نام
                    </Link>
                    <button
                        disabled={!formik.isValid}
                        type="submit"
                        className="w-full disabled:cursor-not-allowed disabled:bg-gray-500  bg-blue-500 py-3 rounded-xl transition-all duration-300 hover:-translate-y-2 text-lg font-semibold text-white">
                        ورود
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;