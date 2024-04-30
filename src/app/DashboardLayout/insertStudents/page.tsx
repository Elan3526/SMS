"use client"
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import DashboardCard from "@/app/DashboardLayout/components/shared/DashboardCard";
import TableContainer from "@mui/material/TableContainer";
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://192.168.1.5:8080/getStudent');
        console.log('Response:', response.data); // Log the response data for debugging
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setError('Error fetching students. Please try again later.');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    // Add your logic for adding a new student here
    setSnackbarOpen(true); // For demonstration purposes, show a snackbar when the add button is clicked
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <DashboardCard title="Student Details">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <TextField
              variant="outlined"
              placeholder="Search students..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton disabled>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <IconButton color="primary" aria-label="add student" onClick={handleAddStudent}>
            <AddIcon />
          </IconButton>
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="subtitle2" color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle1"><b>ID</b></Typography></TableCell>
                  <TableCell><Typography variant="subtitle1"><b>Name</b></Typography></TableCell>
                  <TableCell><Typography variant="subtitle1"><b>Phone Number</b></Typography></TableCell>
                  <TableCell><Typography variant="subtitle1"><b>Email Address</b></Typography></TableCell>
                  <TableCell><Typography variant="subtitle1"><b>Address</b></Typography></TableCell>
                  <TableCell><Typography variant="subtitle1"><b>Emergency Contact Name</b></Typography></TableCell>
                  <TableCell><Typography variant="subtitle1"><b>Emergency Contact Relationship</b></Typography></TableCell>
                  <TableCell><Typography variant="subtitle1"><b>Emergency Contact Phone Number</b></Typography></TableCell>
                  <TableCell><Typography variant="subtitle1"><b>Medical Information</b></Typography></TableCell>
                  <TableCell><Typography variant="subtitle1"><b>Additional Notes</b></Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.phoneNumber}</TableCell>
                    <TableCell>{student.emailAddress}</TableCell>
                    <TableCell>{student.address}</TableCell>
                    <TableCell>{student.emergencyContactName}</TableCell>
                    <TableCell>{student.emergencyContactRelationship}</TableCell>
                    <TableCell>{student.emergencyContactPhoneNumber}</TableCell>
                    <TableCell>{student.medicalInformation}</TableCell>
                    <TableCell>{student.additionalNotes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message="New student added successfully!"
        />
      </DashboardCard>
    </div>
  );
};

export default Page;
