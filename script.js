console.log('js is working fine');

let students = [
    { id: 1, name: 'Rani', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAx4rfKoW0alLNzxik5f355kGX3VupIzgcMA&s' },
    { id: 2, name: 'Raju', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREhojZbruTFPZ6cKHtil2xoLq9tfFryl_kEQ&s' },
    { id: 3, name: 'Priya', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4YlCxqUS6gW6xlylEtAdBDMJLurWXT6GEHA&s' }
  ];
  
  let currentStudentId = null;
  
function renderStudents() {
    const studentContainer = document.getElementById('studentContainer');
    studentContainer.innerHTML = ''; 
  
    students.forEach((student) => {
      const studentCard = document.createElement('div');
      studentCard.className = 'student';
      studentCard.innerHTML = `
        <img src="${student.imageUrl}" alt="${student.name}">
        <p>${student.name}</p>
        <div class="icons">
          <span class="icon" onclick="editStudent(${student.id})">✏️</span>
          <span class="icon" onclick="deleteStudent(${student.id})">🗑️</span>
        </div>
      `;
      studentContainer.appendChild(studentCard); 
    });
  
    const addStudentButton = document.createElement('div');
    addStudentButton.className = 'student add-student';
    addStudentButton.innerHTML = `
      <button id="addStudentBtn">+ Add New Student</button>
    `;
    studentContainer.appendChild(addStudentButton);
  
    document.getElementById('addStudentBtn').addEventListener('click', addNewStudent);
  }
  
  function deleteStudent(id) {
    students = students.filter((student) => student.id !== id);
    renderStudents();
  }
  
  function editStudent(id) {
    const student = students.find((student) => student.id === id);
    document.getElementById('name').value = student.name;
    document.getElementById('imageUrl').value = student.imageUrl;
    document.getElementById('modalTitle').innerText = 'Edit Student';
    currentStudentId = id;
    showModal();
  }
  
  function addNewStudent() {
    document.getElementById('name').value = '';
    document.getElementById('imageUrl').value = '';
    document.getElementById('modalTitle').innerText = 'Add New Student';
    currentStudentId = null;
    showModal();
  }
  
  function showModal() {
    document.getElementById('studentModal').style.display = 'flex';
  }
  
  function closeModal() {
    document.getElementById('studentModal').style.display = 'none';
  }
  
  document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const imageUrl = document.getElementById('imageUrl').value;
  
    if (currentStudentId) {
      const student = students.find((student) => student.id === currentStudentId);
      student.name = name;
      student.imageUrl = imageUrl;
    } else {
      const newStudent = {
        id: students.length ? students[students.length - 1].id + 1 : 1,
        name: name,
        imageUrl: imageUrl
      };
      students.push(newStudent);
    }
  
    closeModal();
    renderStudents();
  });
  
  document.getElementById('addStudentBtn').addEventListener('click', addNewStudent);
  
  document.querySelector('.close').addEventListener('click', closeModal);
  
  renderStudents();
  