import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Connect from './pages/Connect'

import CustomCursor from './components/CustomCursor'

function App() {
    return (
        <div className="app">
            <CustomCursor />
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/connect" element={<Connect />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
