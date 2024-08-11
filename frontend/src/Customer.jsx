// import React, { useState } from "react";
// import pdfReader from "pdfreader";
// import { readFileSync } from "fs"; // This import is typically for Node.js; in a browser environment, you'll handle this differently

// const Customer = () => {
//   const [textContent, setTextContent] = useState("");

//   const _handleFile = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = (event) => {
//         const arrayBuffer = event.target.result;

//         // pdfReader expects a stream, so we'll use Blob and FileReader here
//         const pdfStream = new Uint8Array(arrayBuffer);

//         new pdfReader().parseBuffer(pdfStream, (err, item) => {
//           if (err) {
//             console.error(err);
//           } else if (item && item.text) {
//             setTextContent((prev) => prev + item.text + "\n");
//             console.log(item.text); // Log text items
//           }
//         });
//       };

//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".pdf" onChange={_handleFile} />
//       <pre>{textContent}</pre>
//     </div>
//   );
// };

// export default Customer;

import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";

const Customer = () => {
  const [textContent, setTextContent] = useState("");

  const _handleFile = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = async () => {
        const arrayBuffer = fileReader.result;
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });

        try {
          const pdf = await loadingTask.promise;
          let text = "";

          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            text += textContent.items.map((item) => item.str).join(" ") + "\n";
          }

          setTextContent(text);
          console.log(text);
        } catch (error) {
          console.error("Error processing PDF:", error);
        }
      };

      fileReader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      customer <input type="file" accept=".pdf" onChange={_handleFile} />
      <pre>{textContent}</pre>
    </div>
  );
};

export default Customer;
