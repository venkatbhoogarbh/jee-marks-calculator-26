function uploadPDF() {
    const fileInput = document.getElementById("pdfFile");
    const resultDiv = document.getElementById("result");

    if (!fileInput.files.length) {
        resultDiv.innerText = "Please upload a PDF file.";
        return;
    }

    const formData = new FormData();
    formData.append("response_pdf", fileInput.files[0]);

    resultDiv.innerText = "Processing...";

    fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        resultDiv.innerHTML = `
            <p>Total Marks: <b>${data.score}</b></p>
            <p>Correct: ${data.correct}</p>
            <p>Wrong: ${data.wrong}</p>
            <p>Unattempted: ${data.unattempted}</p>
        `;
    })
    .catch(err => {
        resultDiv.innerText = "Error connecting to server.";
        console.error(err);
    });
}
