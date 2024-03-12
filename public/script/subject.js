
document.addEventListener("DOMContentLoaded", () => {
    const btns = document.querySelectorAll(".btn");
    const cancelbtns = document.querySelectorAll(".cancel-btn");
    const addCont = document.querySelector(".add-cont");
    fetchAndDisplayMarks(addCont.dataset.semester);

    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            const addCont = document.querySelector(".add-cont");
            addCont.style.visibility = "visible";
            addCont.dataset.semester = btn.parentElement.previousElementSibling.textContent.trim();
        });
    });

    cancelbtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const addCont = document.querySelector(".add-cont");
            addCont.style.visibility = "hidden";
        });
    });

    function fetchAndDisplayMarks(semester) {
        // Fetch data from the backend based on the clicked semester
        fetch(`http://localhost:5000/auth/getSubjects/${semester}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Clear existing table content
                const tbody = document.querySelector(".marks-tbody");
                tbody.innerHTML = "";

                // Populate the table with fetched data
                data.forEach((subject) => {
                    const newRow = document.createElement("tr");
                    newRow.innerHTML = `
                <td>${subject.subName}</td>
                <td>${subject.maxMark}</td>
                <td>${subject.subMark}</td>
                <td>${subject.grade}</td>
                 <td><button class="delete-btn">Delete</button></td>
            `;

                    const deleteBtn = newRow.querySelector(".delete-btn");
                    deleteBtn.addEventListener("click", () => {
                        // Handle delete operation here
                        deleteSubject(subject.subId); // Assuming subject.id is the unique identifier
                    });
                    tbody.appendChild(newRow);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // Add event listener to the semester buttons


    // Function to add marks to the table
    document.querySelectorAll(".add-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            addMarks();
            document.querySelector(".add-cont").style.visibility = "hidden";
        });
    });

    function addMarks() {
        const semester = addCont.dataset.semester;
        const subjectName = document.querySelector(".input-cont input[name='subjectName']").value;
        const maxMarks = document.querySelector(".input-cont input[name='maxMarks']").value;
        const subjectMarks = document.querySelector(".input-cont input[name='subjectMarks']").value;
        const subjectGrade = document.querySelector(".input-cont input[name='subjectGrade']").value;

        if (subjectName === "" || subjectMarks === "" || subjectGrade === "" || maxMarks === "") {
            return;
        }

        document.querySelectorAll(".input-cont input").forEach(input => input.value = "");
        fetch('http://localhost:5000/auth/addSubject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                semester,
                subjectName,
                maxMarks,
                subjectMarks,
                subjectGrade,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
           
                // After successfully adding marks, update the table
                fetchAndDisplayMarks(semester);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
function deleteSubject(subjectId) {
    fetch(`http://localhost:5000/auth/deleteSubject/${subjectId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // After successfully deleting the subject, update the table
            fetchAndDisplayMarks(addCont.dataset.semester);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
});