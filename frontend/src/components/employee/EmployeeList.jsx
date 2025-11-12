
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, TextField, InputAdornment, Select, MenuItem, 
  FormControl, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Avatar, 
  Chip, IconButton, Typography
} from "@mui/material";
import {
  Search, FilterList, FileDownload, PersonAdd, Visibility
} from "@mui/icons-material";
import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("all");

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      empId: "EMP001",
      department: "Engineering",
      position: "Senior Developer",
      email: "john.doe@company.com",
      phone: "+91 98765 43210",
      joiningDate: "2022-01-15",
      status: "Active",
      address: "123 Tech Street, Bangalore, Karnataka",
      salary: "₹80,000",
      dateOfBirth: "1990-05-15"
    },
    {
      id: 2,
      name: "Priya Sharma",
      empId: "EMP002",
      department: "HR",
      position: "HR Manager",
      email: "priya.sharma@company.com",
      phone: "+91 98765 43211",
      joiningDate: "2021-06-20",
      status: "Active",
      address: "456 HR Colony, Mumbai, Maharashtra",
      salary: "₹70,000",
      dateOfBirth: "1988-08-22"
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      empId: "EMP003",
      department: "Sales",
      position: "Sales Executive",
      email: "rajesh.kumar@company.com",
      phone: "+91 98765 43212",
      joiningDate: "2023-03-10",
      status: "Active",
      address: "789 Sales Avenue, Delhi",
      salary: "₹60,000",
      dateOfBirth: "1992-12-10"
    },
    {
      id: 4,
      name: "Sarah Johnson",
      empId: "EMP004",
      department: "Marketing",
      position: "Marketing Lead",
      email: "sarah.johnson@company.com",
      phone: "+91 98765 43213",
      joiningDate: "2022-08-05",
      status: "Active",
      address: "321 Marketing Road, Pune, Maharashtra",
      salary: "₹75,000",
      dateOfBirth: "1991-03-18"
    }
  ]);

  const departments = ["Engineering", "HR", "Sales", "Marketing", "Finance"];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === "all" || emp.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="dashboard-wrapper">
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="main-wrapper">
        <Navbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          pageTitle="Employee Management"
          pageSubtitle="Manage your workforce"
        />

        <main className="content-area">
          {/* Search and Filter Bar */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                size="small"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ minWidth: 300 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl size="small" sx={{ minWidth: 200 }}>
                <Select
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                  displayEmpty
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterList />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="all">All Departments</MenuItem>
                  {departments.map(dept => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" startIcon={<FileDownload />}>
                Export
              </Button>
              <Button
                variant="contained"
                startIcon={<PersonAdd />}
                onClick={() => navigate('/employees/add')}
              >
                Add Employee
              </Button>
            </Box>
          </Box>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                fontWeight: '500',
                textTransform: 'uppercase',
                margin: 0
              }}>Total Employees</p>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1f2937',
                margin: '0.5rem 0 0 0'
              }}>{employees.length}</h3>
            </div>

            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                fontWeight: '500',
                textTransform: 'uppercase',
                margin: 0
              }}>Active</p>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#059669',
                margin: '0.5rem 0 0 0'
              }}>{employees.filter(e => e.status === "Active").length}</h3>
            </div>

            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                fontWeight: '500',
                textTransform: 'uppercase',
                margin: 0
              }}>Departments</p>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1f2937',
                margin: '0.5rem 0 0 0'
              }}>{departments.length}</h3>
            </div>
          </div>

          {/* Employee Table - Only View button */}
          <TableContainer component={Paper} sx={{ boxShadow: 1, mt: 3 }}>
            <Table>
              <TableHead sx={{ bgcolor: '#f8fafc' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, px: 4 }}>Employee</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Employee ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Position</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Joining Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} hover>
                    <TableCell sx={{ px: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                            fontWeight: 600
                          }}
                        >
                          {getInitials(employee.name)}
                        </Avatar>
                        <Typography sx={{ fontWeight: 600 }}>
                          {employee.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{employee.empId}</TableCell>
                    <TableCell>
                      <Chip
                        label={employee.department}
                        size="small"
                        sx={{ bgcolor: '#f1f5f9', color: '#475569' }}
                      />
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{employee.email}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {employee.phone}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{employee.joiningDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={employee.status}
                        size="small"
                        color="success"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => navigate(`/employees/profile/${employee.id}`, { state: { employee } })}
                          title="View Profile"
                        >
                          <Visibility />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredEmployees.length === 0 && (
              <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography color="text.secondary">
                  No employees found
                </Typography>
              </Box>
            )}
          </TableContainer>
        </main>
      </div>
    </div>
  );
};

export default EmployeeList;
