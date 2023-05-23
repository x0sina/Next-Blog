import { useFormik } from "formik";
import * as Yup from 'yup'
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth, useAuthActions } from "src/context/AuthContext";
import { useEffect } from "react";

const SignUp = () => {
    const dispatch = useAuthActions()
    const { push } = useRouter()
    const { user } = useAuth()

    useEffect(() => {
        if (user) {
            push('/')
        }
    }, [user])

    const validationSchema = Yup.object({
        name: Yup.string().required('فیلد نام ضروریست').min(3, 'نام و نام خانوادگی باید بیشتر از 3 کاراکتر باشد').max(35, 'نام و نام خانوادگی باید کمتر از 35 کاراکتر باشد'),
        email: Yup.string().required('فیلد ایمیل ضروریست').email('ایمیل نامعتبر است'),
        phoneNumber: Yup.string().required('فیلد شماره موبایل ضروریست').matches(/^[0-9]{11}$/, 'شماره موبایل باید 11 رقم باشد').nullable(),
        password: Yup.string().required('فیلد رمز عبور ضروریست').min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد'),
        confirmPassword: Yup.string().required('فیلد تکرار رمز عبور ضروریست').oneOf([Yup.ref('password'), ''], 'رمز عبور همخوانی ندارد')
    })
    const onSubmit = async ({ name, email, phoneNumber, password }) => {
        dispatch({ type: 'SIGNUP', payload: { name, email, phoneNumber, password } })
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
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
                    <h2 className="font-black text-3xl my-6 text-blue-600">ثبت نام</h2>
                    <div className="flex flex-col gap-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-gray-500 font-semibold" htmlFor="name">نام و نام خانوادگی</label>
                            <span className={`opacity-0 transition-all duration-200 ${formik.errors.name && formik.touched.name && '!opacity-100'} text-red-500 text-sm`}>{formik.errors.name}</span>
                        </div>
                        <input
                            dir="ltr"
                            {...formik.getFieldProps('name')}
                            id="name" type='name' className="form-input 
                        mt-1
                        block
                        rounded-md
                        bg-gray-200
                        border-transparent
                        focus:border-gray-500 focus:bg-white focus:ring-0
                        w-full
                        " />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-gray-500 font-semibold" htmlFor="phoneNumber">شماره موبایل</label>
                            <span className={`opacity-0 transition-all duration-200 ${formik.errors.phoneNumber && formik.touched.phoneNumber && '!opacity-100'} text-red-500 text-sm`}>{formik.errors.phoneNumber}</span>
                        </div>
                        <input
                            dir="ltr"
                            {...formik.getFieldProps('phoneNumber')}
                            id="phoneNumber" type='phoneNumber' className="form-input 
                        mt-1
                        block
                        rounded-md
                        bg-gray-200
                        border-transparent
                        focus:border-gray-500 focus:bg-white focus:ring-0
                        w-full
                        " />
                    </div>
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
                    <div className="flex flex-col gap-y-1">
                        <div className="flex items-center justify-between">
                            <label className="text-gray-500 font-semibold" htmlFor="confirmPassword">تکرار رمز عبور</label>
                            <span className={`opacity-0 transition-all duration-200 ${formik.errors.confirmPassword && formik.touched.confirmPassword && '!opacity-100'} text-red-500 text-sm`}>{formik.errors.confirmPassword}</span>
                        </div>
                        <input
                            dir="ltr"
                            {...formik.getFieldProps('confirmPassword')}
                            id="confirmPassword" type='password' className="form-input 
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
                        href='/auth/signin'>
                        قبلا ثبت نام کردی؟ صفحه ورود
                    </Link>
                    <button
                        disabled={!formik.isValid}
                        type="submit"
                        className="w-full disabled:cursor-not-allowed disabled:bg-gray-500  bg-blue-500 py-3 rounded-xl transition-all duration-300 hover:-translate-y-2 text-lg font-semibold text-white">
                        ثبت نام
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;