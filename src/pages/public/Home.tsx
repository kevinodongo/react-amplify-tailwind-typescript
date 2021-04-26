import React from 'react'
import Footer from '../../components/parts/Footer'
import Header from '../../components/parts/Header'
import Landing from '../../components/home/Landing'

const Home = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <Landing />
            <Footer />
        </div>
    )
}

export default Home
