import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as XLSX from "xlsx";

function App() {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <table class="table">
        <thead>
          <tr>
            <th scope="col">sn</th>
            <th scope="col">AssetTag</th>
            <th scope="col">PersonResponsible</th>
            <th scope="col">Description</th>
            <th scope="col">Relatedtootherasset</th>
            <th scope="col">COLOUR</th>
            <th scope="col">MAKE</th>
            <th scope="col">SERIALNO</th>
            <th scope="col">MODELNO</th>
            <th scope="col">DEPARTMENT</th>
            
            <th scope="col">LOCATION</th>


          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.sn}>
              <th>{d.sn}</th> 
              <td>{d.AssetTag}</td>
              <td>{d.PersonResponsible}</td>
              <td>{d.Description}</td>
              <td>{d.Relatedtootherasset}</td>
              <td>{d.COLOUR}</td>
              <td>{d.MAKE}</td>
              <td>{d.SERIALNO}</td>
              <td>{d.MODELNO}</td>
              <td>{d.DEPARTMENT}</td>
             
              <td>{d.LOCATION}</td>  
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
