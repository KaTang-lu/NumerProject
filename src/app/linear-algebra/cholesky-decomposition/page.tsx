"use client";
import { useEffect, useState } from "react";
import "../../globals.css";
import { Card } from "@mui/material";
import Navbar from "../../../components/Navbar";

function cholesky(matrix: number[][]): number[] {
  const n = matrix.length;
  const result: number[] = [];
  const A = matrix.map((matrix) => matrix.slice(0, n));
  const B = matrix.map((column) => column[n]);
  const L: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    let _sum = 0;
    for (let j = 0; j < i; j++) {
      _sum += L[i][j] * L[i][j];
    }
    L[i][i] = Math.sqrt(A[i][i] - _sum);

    for (let j = i + 1; j < n; j++) {
      let _sum = 0;
      for (let k = 0; k < i; k++) {
        _sum += L[j][k] * L[i][k];
      }
      L[j][i] = (A[j][i] - _sum) / L[i][i];
    }
  }
  console.log("[L]: \n", L);

  const y: number[] = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let _sum = 0;
    for (let j = 0; j < i; j++) {
      _sum += L[i][j] * y[j];
    }
    y[i] = (B[i] - _sum) / L[i][i];
  }

  const x: number[] = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let _sum = 0;
    for (let j = i + 1; j < n; j++) {
      _sum += L[j][i] * x[j];
    }
    x[i] = (y[i] - _sum) / L[i][i];
  }
  result.push(...x);

  return result;
}

export default function Page() {
  const [dimension, setDimension] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [result, setResult] = useState<number[]>([]);

  const cal = () => {
    setResult(cholesky(matrix));
  };
  console.log(result);

  useEffect(() => {
    setMatrix(Array.from({ length: dimension }, () => []));
  }, [dimension]);

  return (
    <>
    <Navbar />
    <Card className="w-10/12 max-w-full mx-auto p-4 mt-6 shadow-lg rounded-lg">
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">Cholesky Decomposition</h1>
        <input
          type="number"
          value={dimension}
          onChange={(e) => {
            const newDimension = Number(e.target.value);
            if (newDimension <= 5) {
              setDimension(newDimension);
            }
          }}
          className="p-2 rounded border border-gray-300 mr-2"
        />

        <h2 className="text-2xl mb-4 font-bold">Matrix</h2>
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
                className="p-1 rounded border border-gray-300 mr-2"
              />
            ))}
          </div>
        ))}
        <button
          onClick={cal}
          className="btn btn-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculate
        </button>
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
    </Card>
    </>
  );
}
