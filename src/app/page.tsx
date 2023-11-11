import "../app/globals.css";
import React from "react";

//Components
import Navbar from '../components/Navbar';
import { Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

const cardStyle = {
  // background: '#8BC6EC', // Fallback color
  // backgroundImage: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)',
  borderRadius: '10px',
  boxShadow: '5px 5px 10px black'
};

const linkStyle = {
  fontSize: '1.2rem',   
  fontWeight: 'bold',   
  color: '#1F2937',        
  textDecoration: 'none',
  display: 'block', 
};

export default function Home() {
  return (
    <div className="bg-dark text-dark ">
      <Navbar />

      <div className="flex flex-wrap justify-center">
      <Card className="w-11/12 max-w-sm mx-auto p-4 mt-7 mb-4 shadow-lg rounded-lg" style={cardStyle}>
      <h1 className="text-center font-bold" style={{ color: '#123456', fontSize: '1.5rem', fontWeight: 'bold' }}>Root of Equations</h1>
        <div className='text-left mt-2'>
          <a href="/ROE/bisection" style={linkStyle}>- Bisection</a>
          <br />
          <a href="/ROE/false-position" style={linkStyle}>- False Position</a>
          <br />
          <a href="/ROE/newton-raphson" style={linkStyle}>- Newton Raphson</a>
          <br />
          <a href="/ROE/one-point" style={linkStyle}>- One-Point Interation</a>
          <br />
          <a href="/ROE/secant" style={linkStyle}>- Secant Method</a>
          <br />
        </div>
      </Card>
    
      <Card className="w-11/12 max-w-sm mx-auto p-4 mt-7 mb-4 shadow-lg rounded-lg" style={cardStyle}>
      <h1 className="text-center font-bold" style={{ color: '#123456', fontSize: '1.5rem', fontWeight: 'bold' }}>Linear Algebra</h1>
        <div className='text-left mt-2'>
          <a href="/linear-algebra/cramer-rule" style={linkStyle}>- Cramer's Rule</a>
          <br />
          <a href="/linear-algebra/gauss-elimination" style={linkStyle}>- Gauss Elimination</a>
          <br />
          <a href="/linear-algebra/gauss-jordan" style={linkStyle}>- Gauss Jordan</a>
          <br />
          <a href="/linear-algebra/LU-decomposition" style={linkStyle}>- LU Decomposition</a>
          <br />
          <a href="/linear-algebra/cholesky-decomposition" style={linkStyle}>- Cholesky Decomposition</a>
          <br />
          <a href="/linear-algebra/jacobi" style={linkStyle}>- Jacobi Iteration</a>
          <br />
          <a href="/linear-algebra/gauss-seidel" style={linkStyle}>- Gauss Seidel Iteration</a>
        </div>
      </Card>
      
      <Card className="w-11/12 max-w-sm mx-auto p-4 mt-7 mb-4 shadow-lg rounded-lg" style={cardStyle}>
      <h1 className="text-center font-bold" style={{ color: '#123456', fontSize: '1.5rem', fontWeight: 'bold' }}>Interpolation</h1>
      <div className='text-left mt-6'>
        <a href="/interpolation/newton" style={linkStyle}>- Newton's Divide Difference</a>
        <br />
        <a href="/interpolation/lagrange" style={linkStyle}>- Lagrange</a>
        <br />
      </div>
      </Card>
      </div>

      <Card className="w-11/12 max-w-sm mx-auto p-4 mt-7 mb-4 shadow-lg rounded-lg" style={cardStyle}>
        <h1 className="text-center font-bold" style={{ color: '#123456', fontSize: '1.5rem', fontWeight: 'bold' }}>Intergration</h1>
        <div className='text-left mt-6'>
          <a href="/intergration/trapezoidal" style={linkStyle}>Trapezoidal</a>
        </div>

      </Card>
              
    </div>
  )
}
