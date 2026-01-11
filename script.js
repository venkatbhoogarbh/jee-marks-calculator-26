function uploadPDF() {
    const fileInput = document.getElementById("pdfFile"); // keep your HTML ID
    const resultDiv = document.getElementById("result");

    if (!fileInput.files.length) {
        resultDiv.innerText = "Please upload a PDF file.";
        return;
    }

    const formData = new FormData();
    formData.append("response_sheet", fileInput.files[0]); // match backend key

    resultDiv.innerText = "Processing...";

    fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        resultDiv.innerHTML = `
            <h3>Marks Result</h3>
            <p>Score: <b>${data.score}</b></p>
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
