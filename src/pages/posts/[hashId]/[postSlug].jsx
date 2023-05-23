import { BookmarkIcon, ChatBubbleBottomCenterTextIcon, ClipboardIcon, HeartIcon, LinkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import { FaLinkedin, FaTelegram, FaTwitter } from 'react-icons/fa'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import PostList from "@/components/Posts/PostList";
import { MdContentCopy } from 'react-icons/md'
import PostComments from "@/components/Posts/comments/PostComments";
import Interactions from "@/components/Posts/Interactions";
import http from "@/services/httpService";

const Post = ({ postData }) => {
    const [copied, setCopied] = useState(false)
    const copyHandler = () => {
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1000);
    }

    return (
        <div className="min-h-screen">
            <div className="container mx-auto md:max-w-screen-lg px-4">
                <header className="py-8 flex flex-col md:flex-row items-start justify-between">
                    <div className="flex gap-x-5 mb-4">
                        <img className="rounded-full w-16 h-16 ring-4 ring-blue-400" src="/images/nuxtjs.png" alt="" />
                        <div className="flex flex-col gap-y-2">
                            <div className="flex items-center gap-x-3">
                                <span className="font-bold text-lg">{postData.author.name}</span>
                                <Link href={`/blogs/${postData.category.englishTitle}`} className='bg-blue-100 text-blue-600 hover:text-blue-100 hover:bg-blue-600 transition-all duration-300 cursor-pointer px-2 py-1 rounded-full'>{postData.category.title}</Link>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span>{new Date(postData.createdAt).toLocaleDateString('fa-IR')}</span>
                                <span className="mx-1">•</span>
                                <span>خواندن {postData.readingTime} دقیقه</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <button>
                            <LinkIcon className="h-6 w-6 stroke-gray-500" />
                        </button>
                        <button className="border rounded-full border-gray-300 flex items-center px-2 py-0.5">
                            <span className="text-gray-500 text-sm">
                                ذخیره
                            </span>
                            <BookmarkIcon className="h-6 w-6 stroke-gray-500" />
                        </button>
                    </div>
                </header>
                <main className="prose max-w-[100ch] pb-10 prose-xl prose-h2:text-2xl prose-slate prose-h1:text-3xl prose-h1:font-black">
                    <h1>{postData.title}</h1>
                    <h2>عنوان اول تستی</h2>
                    <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                    </p>
                    <h2>عنوان دوم تستی</h2>
                    <img className="rounded-3xl" src={postData.coverImage} alt="" />
                    <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                    </p>
                    <h2>نحوه نصب نکست جی اس</h2>
                    <p>
                        ابتدا داکیومنت این فریمورک را از سایت نکست جی اس بخوانید <a href="https://nextjs.org/docs">NextJS</a> سپس قطع کد زیر را در ترمینال پروژه خود اجرا کنید.
                    </p>
                    <pre dir="ltr">
                        {
                            `npx create-next-app@latest
# or
yarn create next-app
# or
pnpm create next-app`
                        }
                    </pre>
                </main>
                <section className="mb-12">
                    <ul className="flex items-center flex-wrap gap-x-4 mb-4">
                        {["ری اکت", "فرانت اند", "جاوا اسکریپت"].map(tag => (
                            <li
                                key={tag}
                                className='px-3 py-1.5 rounded-2xl bg-gray-100 hover:bg-gray-300 transition-all duration-300 cursor-pointer text-gray-600 text-sm mb-3 block border border-gray-300'
                            >
                                {tag}
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center justify-between flex-col gap-y-4 md:gap-y-0 md:flex-row pb-8 border-b-2 mb-8 border-gray-400">
                        <div className="flex items-center gap-x-6">
                            <Interactions post={postData} isSmall={false}/>
                        </div>
                        <div className="flex items-center justify-between md:justify-end md:gap-x-6 w-full">
                            <div className="flex items-center gap-x-4">
                                <a
                                    className="fill-gray-400 hover:fill-gray-600"
                                    href={`https://telegram.me/share/url?url=http://localhost:3000/posts/${postData.hashId}/${postData.slug}&text=${postData.title}`}
                                >
                                    <FaTelegram className="h-6 w-6 fill-inherit transition-all duration-200" />
                                </a>
                                <a
                                    className="fill-gray-400 hover:fill-gray-600"
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=http://localhost:3000/posts/${postData.hashId}/${postData.slug}`}
                                >
                                    <FaLinkedin className="h-6 w-6 fill-inherit transition-all duration-200" />
                                </a>
                                <a
                                    className="fill-gray-400 hover:fill-gray-600"
                                    href={`http://twitter.com/share?text=${postData.title}&url=http://localhost:3000/posts/${postData.hashId}/${postData.slug}&hashtags="ری اکت", "فرانت اند", "جاوا اسکریپت"`}
                                >
                                    <FaTwitter className="h-6 w-6 fill-inherit transition-all duration-200" />
                                </a>
                            </div>
                            <CopyToClipboard
                                text={`http://localhost:3000/posts/${postData.hashId}/${postData.slug}`}
                                onCopy={copyHandler}
                            >
                                <div
                                    className="flex items-center px-4 py-1.5 rounded-3xl bg-gray-100 hover:bg-gray-300
                                    transition-all duration-300 cursor-pointer text-gray-600 border border-gray-400">

                                    <span>کپی لینک</span>
                                    <MdContentCopy className="h-6 w-6 stroke-gray-400" />
                                </div>
                            </CopyToClipboard>
                        </div>
                    </div>
                    <div className="py-6">
                        <h3 className="font-extrabold text-3xl mb-8">پست های مشابه</h3>
                        <div className="grid grid-cols-6 gap-8">
                            <PostList postsData={postData.related} />
                        </div>
                    </div>
                </section>
                <section>
                    <PostComments comments={postData.comments} postId={postData._id} />
                </section>
            </div>
        </div>
    );
}

export default Post;

export const getServerSideProps = async ({ query,req }) => {
    const { data } = await http.get(`/posts/${query.postSlug}` , {
        headers: {
            Cookie: req.headers.cookie || ''
        }
    })

    return {
        props: {
            postData: data.data
        }
    }
}