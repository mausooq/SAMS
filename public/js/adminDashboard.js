let originalStudents = [];

// Make a simple GET request using fetch
fetch('/adminAuth/student')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        originalStudents = data;
        renderStudents(originalStudents);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

function renderStudents(students) {
    // Clear existing table content
    const tbody = document.querySelector(".marks-tbody");
    tbody.innerHTML = "";

    // Populate the table with fetched data
    students.forEach((student) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
        <td class="student-detail">${student.name}
            <br>
            ${student.usn}
            <br>
            <span> ${student.email}<span/>
           <br
        </td>
         <td id="${student.id}"><button class="Go-btn" onclick="redirectToStudent('/Admin/studentDashboard/?id=${student.id}')">Go</td>
    `;
        tbody.appendChild(newRow);
    });
}

function searchStudents(searchTerm) {
    const filteredStudents = originalStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.usn.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderStudents(filteredStudents);
}
function redirectToStudent(url) {
    window.location.href = url; // Redirect to the student's URL
}