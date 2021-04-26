import { useEffect, useState } from 'react'

function BlogList() {
    const [articles, setArticles] = useState<any>([])
    const [isloading, setisLoading] = useState(true)

    useEffect(() => {
        let mounted = true
        setisLoading(true)
        const fetcharticles = () => {
            let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=67cc36dc186a4b2fb520e78f26fe90b1"
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setArticles(data.articles)
                    setisLoading(false)
                });
        }
        if (mounted) fetcharticles()
        return () => {
            mounted = false
        }
    }, [])


    return (
        <div>
            <div>
                <div className="max-w-6xl mx-auto xl:px-0">

                    <div>
                        {
                            isloading ? <div>loading</div> : <div className="grid grid-cols-2 gap-4">
                                {
                                    articles.map((item: any) => (
                                        <div key={item} className="shadow-lg">
                                            <div>{item.urlToImage && <img src={item.urlToImage} alt="" className="h-80 w-full"></img>}</div>
                                            <div className="px-4 py-4"> 
                                            <div>{item.author}</div>
                                            <div className="font-bold">{item.title}</div>
                                            <div>{item.description}</div>
                                            <div>{item.content}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>
                    <div className="flex justify-center items-center py-16">
                        <div className="flex items-center space-x-3">
                            <button className="border-2 border-blue-600 text-blue-600 py-3 px-8 shadow-md font-bold flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                                <span className="ml-2 hidden sm:block">Previous page</span>
                            </button>
                            <button className="bg-blue-600 text-white font-bold py-3 px-8 shadow-md flex items-center justify-center">
                                <span className="mr-2 hidden sm:block">Next page</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogList