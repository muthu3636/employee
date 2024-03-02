function redirectToNextPage() {
    // Get form data
    var formData = new FormData(document.getElementById("employeeForm"));
    
    // Redirect to the next page
    var nextPage = "next.html"; // Change to the desired page URL
    window.location.href = nextPage + "?fname=" + formData.get("fname") + "&lname=" + formData.get("lname");
}
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("employeeForm");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const empname = document.getElementById("fullName").value;
      const empId = document.getElementById("empId").value;
      const department = document.getElementById("department").value;
      const phonenumber = document.getElementById("phonenumber").value;
      const dob = document.getElementById("dob").value;
      const gender =
        document.querySelector('input[name="gender"]:checked').value || "Others";
      const salary = document.getElementById("salaryid").value;
      console.log(empname, empId, department, phonenumber, dob, gender, salary);
      console.log("empname element:", document.getElementById("empname"));
      if (
        !empname ||
        !empId ||
        !department ||
        !dob ||
        !gender ||
        !phonenumber ||
        !salary
      ) {
        alert("Please fill in all fields");
        return;
      }
      if (empname.length > 30) {
        alert("Name should be within 30 characters");
        return;
      }
      if (salary.length > 8) {
        alert("Salary should be within 8 digits");
        return;
      }
      fetch("http://localhost:5000/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      empname: empname,
      empId: empId,
      department: department,
      dob: dob,
      gender: gender,
      phonenumber: phonenumber,
      salary: salary,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      alert(data);
      document.getElementById("employeeForm").reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Form submission failed. Please try again.');
    });
    });
  });