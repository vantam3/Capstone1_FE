import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './homepage/Header';
import Section1 from './homepage/Section1';
import Section2 from './homepage/Section2';
import Section3 from './homepage/Section3';
import Introduce from './components/Introduce';
import BooksLibrary from './components/BooksLibrary';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';
import ForgotPassword from './components/recover';
import CreateBook from './components/CreateBook';
import CategoryDetail from './components/CategoryDetail'; 
import BookDetail from './components/BookDetail'; 
import ReadBook from './components/ReadBook'; 

// Trang chủ
const HomePage = () => (
  <ReactFullpage
    licenseKey={'YOUR_LICENSE_KEY'}
    navigation
    sectionsColor={['#ffebcd', '#aabcc3', '#9cb898']}
    render={() => (
      <div id="fullpage-wrapper">
        <div className="section"><Section1 /></div>
        <div className="section"><Section2 /></div>
        <div className="section"><Section3 /></div>
      </div>
    )}
  />
);

// Cấu trúc điều hướng của ứng dụng
const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/introduce" element={<Introduce />} />
      <Route path="/books-library" element={<BooksLibrary />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/recover" element={<ForgotPassword />} />
      <Route path="/create-book" element={<CreateBook />} /> 
      <Route path="/category/:categoryId" element={<CategoryDetail />} /> 
      <Route path="/book/:bookId" element={<BookDetail />} /> 
      <Route path="/read-book/:bookId" element={<ReadBook />} /> 
      <Route path="/create-book" element={<CreateBook />} />                                                       
    </Routes>                                                                                                            
  </Router>
);

export default App;
