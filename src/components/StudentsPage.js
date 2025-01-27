import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc , getDoc, deleteDoc} from 'firebase/firestore';
import { db } from '../firebase'; 
import StudentModal from './StudentModal';
import './StudentsPage.css';


function StudentsPage() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewedStudent, setViewedStudent] = useState(null);

    useEffect(() => {
        const studentsCollection = collection(db, 'students');
        const unsubscribe = onSnapshot(studentsCollection, (snapshot) => {
            const studentData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setStudents(studentData);
        });

        return () => unsubscribe();
    }, []);

    const handleAddStudent = () => {
        setSelectedStudent(null);
        setIsModalOpen(true);
        
    };

    const handleEditStudent = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
        
    };
    const handleDeleteStudent = async (studentId) => {
        try {
            await deleteDoc(doc(db, 'students', studentId));
            setStudents((prevStudents) => prevStudents.filter(student => student.id !== studentId)); // Remove student locally
          } catch (error) {
            console.error('Error deleting student:', error);
          }
    };

    const handleViewStudent = async (studentId) => {
        const docRef = doc(db, 'students', studentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setViewedStudent({ id: studentId, ...docSnap.data() });
    } else {
      console.log('No such document!');
    }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setViewedStudent(null);
    };

    return (
        <div className="student-container">
            <h2> Students Page</h2>
            <table border="1" cellpadding="5" cellspacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Section</th>
                        <th>Roll Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.class}</td>
                            <td>{student.section}</td>
                            <td>{student.rollNumber}</td>
                            <td>
                                <button onClick={() => handleViewStudent(student.id)}>view</button>
                                <button onClick={() => handleEditStudent(student)}>Edit</button>
                                <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>


                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAddStudent}>Add Student</button>
            {isModalOpen && (
        <StudentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          student={selectedStudent}
        />
      )}
      {viewedStudent && (
        <div className="modal">
          <div className="modal-content">
            <h2>View Student</h2>
            <p>ID: {viewedStudent.id}</p>
            <p>Name: {viewedStudent.name}</p>
            <p>Class: {viewedStudent.class}</p>
            <p>Section: {viewedStudent.section}</p>
            <p>Roll Number: {viewedStudent.rollNumber}</p>
            <p>Age: {viewedStudent.age}</p>
            <p>Email: {viewedStudent.email}</p>
            <p>Mobile Number: {viewedStudent.phone}</p>
            <p>Address: {viewedStudent.address}</p>
            <p>City: {viewedStudent.city}</p>
            <p>State: {viewedStudent.state}</p>
            <p>Country: {viewedStudent.country}</p>
            <p>Pincode: {viewedStudent.pincode}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
        </div>
    );
}

export default StudentsPage;
