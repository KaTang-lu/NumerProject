"use client";
import { useEffect, useState } from "react";
import "../../globals.css"

function gaussjordan(matrix: number[][]): number[] {
  const n = matrix.length;
  const result: number[] = [];
  const B = matrix.map((column) => column[n]);
  const A = matrix.map((matrix) => matrix.slice(0, n));

  //Forward Elimination
  for(let i = 0; i < n; i++){
    for(let j=i+1; j<n; j++){
      let factor = A[j][i] / A[i][i];
      for(let k = i; k < n+1; k++){
        A[j][k] = A[j][k] - factor * A[i][k];
      }
      B[j] = B[j] - factor * B[i];
    }
  }

  //Backward Elimination
  const X = Array(n).fill(0);
  for(let i = n-1; i >= 0; i--){
    for(let j = i-1; j >= 0; j--){
      let factor = A[j][i] / A[i][i];
      for(let k = i; k < n; k++){
        A[j][k] = A[j][k] - factor * A[i][k];
      }
      B[j] = B[j] - factor * B[i];
      
    }
  }
  
  // normalize to 1
  for(let i = 0; i < n; i++){
    const pivot = A[i][i];
    B[i] = B[i] / pivot;
    A[i][i] = A[i][i] / pivot;
  }
  result.push(...B);

  return result;
}

export default function Page() {
  const [dimension, setDimension] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [result, setResult] = useState<number[]>([]);

  const cal = () => {
    setResult(gaussjordan(matrix));
  };
  console.log(result);

  useEffect(() => {
    setMatrix(Array.from({ length: dimension }, () => []));
  }, [dimension]);

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">Gauss Jordan Method</h1>
        <input
          type="number"
          value={dimension}
          onChange={(e) => {
            setDimension(Number(e.target.value));
          }}
          className="p-2 rounded border border-gray-300 mr-2"
          
        />
        
        <h2 className="text-2xl mb-4">Matrix</h2>
        {Array.from({ length: dimension }, (_, i) => (
          <div key={i} className="mb-4">
            {Array.from({ length: dimension + 1 }, (_, j) => (
              <input
                type="number"
                key={j}
                onChange={(e) => {
                  const temp = [...matrix];
                  temp[i][j] = Number(e.target.value);
                  setMatrix(temp);
                }}
                className="p-2 rounded border border-gray-300 mr-2"
              />
            ))}
          </div>
        ))}
        <button onClick={cal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Calculate</button>
      </div>

      <div>
        {result.length > 1 ? (
          <>
            <div className="mt-4">
              <table className="border-collapse border border-gray-300">
                <tbody>
                  {result.map((r, i) => (
                    <tr key={i}>
                      <td className="border border-gray-300 p-2">X{i}:</td>
                      <td className="border border-gray-300 p-2">{r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
