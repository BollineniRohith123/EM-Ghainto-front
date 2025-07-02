import React, { useState, useContext, createContext, useEffect } from 'react';
import './App.css';

// Auth Context
const AuthContext = createContext();

// Sample Users for Demo
const SAMPLE_USERS = {
  admin: { 
    id: 'admin1', 
    email: 'admin@gharinto.com', 
    password: 'admin123', 
    role: 'admin', 
    name: 'System Administrator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  pm: { 
    id: 'pm1', 
    email: 'rajesh@gharinto.com', 
    password: 'pm123', 
    role: 'pm', 
    name: 'Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  customer: { 
    id: 'cust1', 
    email: 'sharma@gmail.com', 
    password: 'cust123', 
    role: 'customer', 
    name: 'Sharma Family',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  },
  designer: { 
    id: 'des1', 
    email: 'priya@designer.com', 
    password: 'des123', 
    role: 'designer', 
    name: 'Priya Designs',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2a90000?w=100&h=100&fit=crop&crop=face'
  },
  procurement: { 
    id: 'proc1', 
    email: 'inventory@gharinto.com', 
    password: 'proc123', 
    role: 'procurement', 
    name: 'Procurement Team',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face'
  }
};

// Sample Data
const SAMPLE_DATA = {
  customers: [
    {
      id: 'CUST001',
      name: 'Sharma Family',
      email: 'sharma.family@gmail.com',
      phone: '+91-9999999999',
      location: 'Mumbai, Maharashtra',
      projects: 2,
      totalSpent: 850000,
      status: 'Active',
      registrationDate: '2023-12-01'
    },
    {
      id: 'CUST002',
      name: 'Gupta Residence',
      email: 'gupta@gmail.com',
      phone: '+91-8888888888',
      location: 'Delhi, NCR',
      projects: 1,
      totalSpent: 420000,
      status: 'Active',
      registrationDate: '2024-01-15'
    },
    {
      id: 'CUST003',
      name: 'Patel Villa',
      email: 'patel@gmail.com',
      phone: '+91-7777777777',
      location: 'Pune, Maharashtra',
      projects: 3,
      totalSpent: 1200000,
      status: 'VIP',
      registrationDate: '2023-10-20'
    }
  ],
  projects: [
    {
      id: 'PR001',
      customerName: 'Sharma Family',
      designerName: 'Priya Designs',
      pmName: 'Rajesh Kumar',
      status: 'In Progress',
      progress: 65,
      budget: 520000,
      spent: 338000,
      location: 'Mumbai, Maharashtra',
      startDate: '2024-01-01',
      expectedEnd: '2024-03-15',
      nextMilestone: 'Material Procurement'
    },
    {
      id: 'PR002',
      customerName: 'Gupta Residence',
      designerName: 'Modern Interiors',
      pmName: 'Rajesh Kumar',
      status: 'Design Phase',
      progress: 25,
      budget: 420000,
      spent: 105000,
      location: 'Delhi, NCR',
      startDate: '2024-02-01',
      expectedEnd: '2024-04-30',
      nextMilestone: 'Design Approval'
    }
  ],
  leads: [
    {
      id: 'LD001',
      customer: 'Verma Family',
      budget: '5-8L',
      location: 'Bangalore',
      status: 'New',
      assignedTo: null,
      requirements: '3BHK Modern Interior'
    },
    {
      id: 'LD002',
      customer: 'Singh Residence',
      budget: '3-5L',
      location: 'Chennai',
      status: 'Assigned',
      assignedTo: 'Priya Designs',
      requirements: '2BHK Minimalist Design'
    }
  ],
  designers: [
    {
      id: 'DES001',
      name: 'Priya Designs',
      rating: 4.5,
      projects: 23,
      walletBalance: 45000,
      status: 'Active',
      specialization: 'Modern, Minimalist'
    },
    {
      id: 'DES002',
      name: 'Modern Interiors',
      rating: 4.2,
      projects: 18,
      walletBalance: 32000,
      status: 'Active',
      specialization: 'Contemporary, Luxury'
    }
  ],
  materials: [
    {
      id: 'MAT001',
      name: 'Premium Marble Tiles',
      category: 'Flooring',
      price: 850,
      unit: 'sq ft',
      stock: 500,
      vendor: 'Classic Stones'
    },
    {
      id: 'MAT002',
      name: 'Modular Kitchen Set',
      category: 'Furniture',
      price: 150000,
      unit: 'set',
      stock: 25,
      vendor: 'Kitchen Masters'
    }
  ]
};

// Auth Provider Component
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('gharinto_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const foundUser = Object.values(SAMPLE_USERS).find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('gharinto_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gharinto_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth
function useAuth() {
  return useContext(AuthContext);
}

// Landing Page Component
function LandingPage() {
  const { login } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav">
            <div className="logo">
              <h2>Gharinto</h2>
            </div>
            <button 
              className="login-btn"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Transform Your Space with <span>Gharinto</span></h1>
              <p>The complete interior design platform connecting builders, designers, customers, and suppliers for seamless project execution.</p>
              <div className="hero-buttons">
                <button 
                  className="cta-primary"
                  onClick={() => setShowLogin(true)}
                >
                  Get Started
                </button>
                <button className="cta-secondary">Learn More</button>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" 
                alt="Modern Interior Design"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Complete Interior Design Ecosystem</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>For Customers</h3>
              <p>Track your project progress, view designs, make payments, and communicate with your team seamlessly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>For Designers</h3>
              <p>Manage leads, create BOQs, track projects, and grow your business with our designer portal.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>For Managers</h3>
              <p>Monitor projects, manage teams, track progress, and ensure timely delivery with powerful tools.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>For Procurement</h3>
              <p>Manage inventory, track vendors, handle logistics, and streamline material procurement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <img 
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914" 
                alt="Modern Home"
              />
              <div className="testimonial-content">
                <p>"Gharinto transformed our project management. Everything is so organized and transparent."</p>
                <h4>- Sharma Family</h4>
              </div>
            </div>
            <div className="testimonial">
              <img 
                src="https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg" 
                alt="Luxury Interior"
              />
              <div className="testimonial-content">
                <p>"The designer portal helped me grow my business by 300%. Amazing platform!"</p>
                <h4>- Priya Designs</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}

// Login Modal Component
function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      onClose();
    } else {
      setError('Invalid credentials');
    }
  };

  const quickLogin = (userType) => {
    const user = SAMPLE_USERS[userType];
    setEmail(user.email);
    setPassword(user.password);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Login to Gharinto</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <div className="error">{error}</div>}
          
          <button type="submit" className="login-submit">Login</button>
        </form>

        <div className="demo-accounts">
          <h4>Demo Accounts:</h4>
          <div className="demo-buttons">
            <button onClick={() => quickLogin('admin')}>Admin</button>
            <button onClick={() => quickLogin('pm')}>PM</button>
            <button onClick={() => quickLogin('customer')}>Customer</button>
            <button onClick={() => quickLogin('designer')}>Designer</button>
            <button onClick={() => quickLogin('procurement')}>Procurement</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Admin Dashboard Component
function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <AdminDashboardContent />;
      case 'customers':
        return <CustomersManagement />;
      case 'projects':
        return <ProjectsManagement />;
      case 'leads':
        return <LeadsManagement />;
      case 'designers':
        return <DesignersManagement />;
      default:
        return <AdminDashboardContent />;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <div className="user-info">
          <img src={user.avatar} alt={user.name} className="avatar" />
          <span>{user.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="dashboard-layout">
        <div className="sidebar">
          <nav className="nav-menu">
            <button 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={activeTab === 'customers' ? 'active' : ''}
              onClick={() => setActiveTab('customers')}
            >
              👥 Customers
            </button>
            <button 
              className={activeTab === 'projects' ? 'active' : ''}
              onClick={() => setActiveTab('projects')}
            >
              🏗️ Projects
            </button>
            <button 
              className={activeTab === 'leads' ? 'active' : ''}
              onClick={() => setActiveTab('leads')}
            >
              📈 Leads
            </button>
            <button 
              className={activeTab === 'designers' ? 'active' : ''}
              onClick={() => setActiveTab('designers')}
            >
              🎨 Designers
            </button>
          </nav>
        </div>

        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// Admin Dashboard Content
function AdminDashboardContent() {
  return (
    <div className="dashboard-content">
      <div className="kpi-cards">
        <div className="kpi-card">
          <h3>156</h3>
          <p>Total Projects</p>
          <span className="trend up">+12%</span>
        </div>
        <div className="kpi-card">
          <h3>89</h3>
          <p>Active Customers</p>
          <span className="trend up">+8%</span>
        </div>
        <div className="kpi-card">
          <h3>₹12.5L</h3>
          <p>Revenue This Month</p>
          <span className="trend up">+15%</span>
        </div>
        <div className="kpi-card">
          <h3>4.2★</h3>
          <p>Avg Partner Rating</p>
          <span className="trend down">-0.1</span>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h4>Monthly Revenue Trend</h4>
          <div className="chart-placeholder">
            <div className="chart-bars">
              <div className="bar" style={{height: '60%'}}></div>
              <div className="bar" style={{height: '80%'}}></div>
              <div className="bar" style={{height: '45%'}}></div>
              <div className="bar" style={{height: '90%'}}></div>
              <div className="bar" style={{height: '70%'}}></div>
              <div className="bar" style={{height: '95%'}}></div>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h4>Project Status Distribution</h4>
          <div className="pie-chart">
            <div className="pie-slice slice-1"></div>
            <div className="pie-slice slice-2"></div>
            <div className="pie-slice slice-3"></div>
            <div className="pie-slice slice-4"></div>
          </div>
          <div className="pie-legend">
            <div><span className="legend-color color-1"></span> In Progress (45%)</div>
            <div><span className="legend-color color-2"></span> Completed (30%)</div>
            <div><span className="legend-color color-3"></span> Design Phase (15%)</div>
            <div><span className="legend-color color-4"></span> On Hold (10%)</div>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h4>Recent Activity</h4>
        <div className="activity-feed">
          <div className="activity-item">
            <span className="time">2 hours ago</span>
            <p>New lead assigned to Priya Designs - Budget: ₹5-8L</p>
          </div>
          <div className="activity-item">
            <span className="time">4 hours ago</span>
            <p>Project #PR001 moved to Procurement phase</p>
          </div>
          <div className="activity-item">
            <span className="time">1 day ago</span>
            <p>Payment received from Sharma Family - ₹3.5L</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Customers Management Component
function CustomersManagement() {
  return (
    <div className="management-section">
      <div className="section-header">
        <h3>Customer Management</h3>
        <button className="add-btn">+ Add Customer</button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Projects</th>
              <th>Total Spent</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_DATA.customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.projects}</td>
                <td>₹{(customer.totalSpent / 100000).toFixed(1)}L</td>
                <td>
                  <span className={`status ${customer.status.toLowerCase()}`}>
                    {customer.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn view">View</button>
                  <button className="action-btn edit">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Projects Management Component
function ProjectsManagement() {
  return (
    <div className="management-section">
      <div className="section-header">
        <h3>Project Management</h3>
        <button className="add-btn">+ New Project</button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Customer</th>
              <th>Designer</th>
              <th>PM</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Budget</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_DATA.projects.map(project => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.customerName}</td>
                <td>{project.designerName}</td>
                <td>{project.pmName}</td>
                <td>
                  <span className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                </td>
                <td>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${project.progress}%`}}
                    ></div>
                    <span>{project.progress}%</span>
                  </div>
                </td>
                <td>₹{(project.budget / 100000).toFixed(1)}L</td>
                <td>
                  <button className="action-btn view">View</button>
                  <button className="action-btn edit">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Leads Management Component
function LeadsManagement() {
  return (
    <div className="management-section">
      <div className="section-header">
        <h3>Lead Management</h3>
        <button className="add-btn">+ Generate Lead</button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Lead ID</th>
              <th>Customer</th>
              <th>Budget</th>
              <th>Location</th>
              <th>Requirements</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_DATA.leads.map(lead => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.customer}</td>
                <td>{lead.budget}</td>
                <td>{lead.location}</td>
                <td>{lead.requirements}</td>
                <td>
                  <span className={`status ${lead.status.toLowerCase()}`}>
                    {lead.status}
                  </span>
                </td>
                <td>{lead.assignedTo || 'Unassigned'}</td>
                <td>
                  <button className="action-btn assign">Assign</button>
                  <button className="action-btn view">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Designers Management Component
function DesignersManagement() {
  return (
    <div className="management-section">
      <div className="section-header">
        <h3>Interior Partners</h3>
        <button className="add-btn">+ Add Partner</button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Partner ID</th>
              <th>Name</th>
              <th>Rating</th>
              <th>Projects</th>
              <th>Wallet Balance</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_DATA.designers.map(designer => (
              <tr key={designer.id}>
                <td>{designer.id}</td>
                <td>{designer.name}</td>
                <td>{designer.rating}★</td>
                <td>{designer.projects}</td>
                <td>₹{designer.walletBalance.toLocaleString()}</td>
                <td>{designer.specialization}</td>
                <td>
                  <span className={`status ${designer.status.toLowerCase()}`}>
                    {designer.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn view">View</button>
                  <button className="action-btn edit">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// PM Dashboard Component
function PMDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard pm-dashboard">
      <div className="dashboard-header">
        <h2>Project Manager Dashboard</h2>
        <div className="user-info">
          <img src={user.avatar} alt={user.name} className="avatar" />
          <span>{user.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="pm-content">
        <div className="projects-overview">
          <h3>My Projects</h3>
          <div className="project-cards">
            {SAMPLE_DATA.projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h4>{project.id}</h4>
                  <span className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                </div>
                <div className="project-details">
                  <p><strong>Customer:</strong> {project.customerName}</p>
                  <p><strong>Designer:</strong> {project.designerName}</p>
                  <p><strong>Budget:</strong> ₹{(project.budget / 100000).toFixed(1)}L</p>
                  <p><strong>Next Milestone:</strong> {project.nextMilestone}</p>
                </div>
                <div className="project-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${project.progress}%`}}
                    ></div>
                  </div>
                  <span>{project.progress}% Complete</span>
                </div>
                <div className="project-actions">
                  <button className="btn-primary">View Details</button>
                  <button className="btn-secondary">Update Status</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="timeline-section">
          <h3>Project Timeline</h3>
          <div className="gantt-chart">
            <div className="gantt-header">
              <div className="task-names">
                <div>Design Phase</div>
                <div>Procurement</div>
                <div>Civil Work</div>
                <div>Installation</div>
              </div>
              <div className="timeline-bars">
                <div className="timeline-bar completed" style={{width: '100%'}}></div>
                <div className="timeline-bar active" style={{width: '80%'}}></div>
                <div className="timeline-bar pending" style={{width: '0%'}}></div>
                <div className="timeline-bar pending" style={{width: '0%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Customer Portal Component
function CustomerPortal() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return <CustomerOverview />;
      case 'timeline':
        return <ProjectTimeline />;
      case 'designs':
        return <DesignsDocuments />;
      case 'payments':
        return <PaymentInterface />;
      default:
        return <CustomerOverview />;
    }
  };

  return (
    <div className="dashboard customer-portal">
      <div className="dashboard-header">
        <h2>Customer Portal</h2>
        <div className="user-info">
          <img src={user.avatar} alt={user.name} className="avatar" />
          <span>{user.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="dashboard-layout">
        <div className="sidebar">
          <nav className="nav-menu">
            <button 
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              🏠 Overview
            </button>
            <button 
              className={activeTab === 'timeline' ? 'active' : ''}
              onClick={() => setActiveTab('timeline')}
            >
              📅 Timeline
            </button>
            <button 
              className={activeTab === 'designs' ? 'active' : ''}
              onClick={() => setActiveTab('designs')}
            >
              🎨 Designs
            </button>
            <button 
              className={activeTab === 'payments' ? 'active' : ''}
              onClick={() => setActiveTab('payments')}
            >
              💳 Payments
            </button>
          </nav>
        </div>

        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function CustomerOverview() {
  const project = SAMPLE_DATA.projects[0];
  
  return (
    <div className="customer-overview">
      <div className="project-welcome">
        <h3>Welcome to Your Project</h3>
        <div className="project-info">
          <p><strong>Project ID:</strong> {project.id}</p>
          <p><strong>Designer:</strong> {project.designerName}</p>
          <p><strong>Project Manager:</strong> {project.pmName}</p>
          <p><strong>Expected Completion:</strong> {project.expectedEnd}</p>
        </div>
      </div>

      <div className="progress-circle">
        <div className="circle">
          <div className="circle-fill" style={{'--progress': `${project.progress}%`}}>
            <span>{project.progress}%</span>
          </div>
        </div>
        <p>Project Progress</p>
      </div>

      <div className="quick-actions">
        <h4>Quick Actions</h4>
        <div className="action-buttons">
          <button className="action-card">
            <span>🎨</span>
            <div>
              <h5>View Designs</h5>
              <p>Check latest designs and 3D models</p>
            </div>
          </button>
          <button className="action-card">
            <span>💳</span>
            <div>
              <h5>Make Payment</h5>
              <p>Pay pending invoices</p>
            </div>
          </button>
          <button className="action-card">
            <span>💬</span>
            <div>
              <h5>Contact Team</h5>
              <p>Message your designer or PM</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectTimeline() {
  return (
    <div className="project-timeline">
      <h3>Project Timeline</h3>
      <div className="timeline">
        <div className="timeline-item completed">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h4>Design Phase</h4>
            <p>Design approved by client</p>
            <span className="date">Completed: Jan 15, 2024</span>
          </div>
        </div>
        <div className="timeline-item active">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h4>Material Procurement</h4>
            <p>80% materials procured</p>
            <span className="date">In Progress</span>
          </div>
        </div>
        <div className="timeline-item pending">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h4>Civil Work</h4>
            <p>Structural work and installations</p>
            <span className="date">Starts: Feb 1, 2024</span>
          </div>
        </div>
        <div className="timeline-item pending">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h4>Final Installation</h4>
            <p>Furniture and decor installation</p>
            <span className="date">Starts: Mar 1, 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesignsDocuments() {
  return (
    <div className="designs-documents">
      <h3>Designs & Documents</h3>
      
      <div className="design-gallery">
        <h4>3D Designs</h4>
        <div className="design-grid">
          <div className="design-item">
            <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" alt="Living Room Design" />
            <p>Living Room - Modern Design</p>
          </div>
          <div className="design-item">
            <img src="https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg" alt="Dining Area Design" />
            <p>Dining Area - Luxury Style</p>
          </div>
        </div>
      </div>

      <div className="documents-section">
        <h4>Project Documents</h4>
        <div className="document-list">
          <div className="document-item">
            <span>📄</span>
            <div>
              <h5>Bill of Quantities (BOQ)</h5>
              <p>Detailed material and cost breakdown</p>
            </div>
            <button className="btn-secondary">Download</button>
          </div>
          <div className="document-item">
            <span>📋</span>
            <div>
              <h5>Project Contract</h5>
              <p>Terms and conditions</p>
            </div>
            <button className="btn-secondary">View</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentInterface() {
  const invoices = [
    { id: 'INV001', description: 'Design Phase', amount: 120000, dueDate: '15 Jan', status: 'Paid' },
    { id: 'INV002', description: 'Materials', amount: 350000, dueDate: '30 Jan', status: 'Pending' },
    { id: 'INV003', description: 'Civil Work', amount: 150000, dueDate: '15 Feb', status: 'Upcoming' }
  ];

  return (
    <div className="payment-interface">
      <h3>Payments</h3>
      
      <div className="payment-summary">
        <div className="summary-card">
          <h4>Total Project Cost</h4>
          <p className="amount">₹5.2L</p>
        </div>
        <div className="summary-card">
          <h4>Amount Paid</h4>
          <p className="amount paid">₹1.2L</p>
        </div>
        <div className="summary-card">
          <h4>Pending Amount</h4>
          <p className="amount pending">₹4.0L</p>
        </div>
      </div>

      <div className="invoices-table">
        <h4>Payment History</h4>
        <table>
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.description}</td>
                <td>₹{(invoice.amount / 100000).toFixed(1)}L</td>
                <td>{invoice.dueDate}</td>
                <td>
                  <span className={`status ${invoice.status.toLowerCase()}`}>
                    {invoice.status}
                  </span>
                </td>
                <td>
                  {invoice.status === 'Pending' ? (
                    <button className="btn-primary">Pay Now</button>
                  ) : invoice.status === 'Paid' ? (
                    <button className="btn-secondary">Receipt</button>
                  ) : (
                    <button className="btn-secondary" disabled>Upcoming</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Designer Portal Component
function DesignerPortal() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DesignerDashboard />;
      case 'leads':
        return <LeadManagement />;
      case 'boq':
        return <BOQBuilder />;
      case 'projects':
        return <DesignerProjects />;
      case 'wallet':
        return <WalletManagement />;
      default:
        return <DesignerDashboard />;
    }
  };

  return (
    <div className="dashboard designer-portal">
      <div className="dashboard-header">
        <h2>Interior Partner Portal</h2>
        <div className="user-info">
          <img src={user.avatar} alt={user.name} className="avatar" />
          <span>{user.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="dashboard-layout">
        <div className="sidebar">
          <nav className="nav-menu">
            <button 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={activeTab === 'leads' ? 'active' : ''}
              onClick={() => setActiveTab('leads')}
            >
              📈 Leads
            </button>
            <button 
              className={activeTab === 'boq' ? 'active' : ''}
              onClick={() => setActiveTab('boq')}
            >
              📋 BOQ Builder
            </button>
            <button 
              className={activeTab === 'projects' ? 'active' : ''}
              onClick={() => setActiveTab('projects')}
            >
              🏗️ Projects
            </button>
            <button 
              className={activeTab === 'wallet' ? 'active' : ''}
              onClick={() => setActiveTab('wallet')}
            >
              💰 Wallet
            </button>
          </nav>
        </div>

        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function DesignerDashboard() {
  return (
    <div className="designer-dashboard-content">
      <div className="wallet-display">
        <div className="wallet-card">
          <h3>Gharinto Wallet</h3>
          <div className="balance">₹45,000</div>
          <button className="recharge-btn">Recharge Wallet</button>
        </div>
      </div>

      <div className="lead-notifications">
        <h4>New Lead Notifications</h4>
        <div className="lead-cards">
          <div className="lead-card">
            <div className="lead-info">
              <h5>3BHK Modern Interior</h5>
              <p><strong>Budget:</strong> ₹5-8L</p>
              <p><strong>Location:</strong> Bangalore</p>
              <p><strong>Requirements:</strong> Modern, Minimalist</p>
            </div>
            <div className="lead-actions">
              <button className="btn-primary">Accept (₹500)</button>
              <button className="btn-secondary">Reject</button>
            </div>
          </div>
        </div>
      </div>

      <div className="project-pipeline">
        <h4>Active Projects</h4>
        <div className="project-status-cards">
          {SAMPLE_DATA.projects.filter(p => p.designerName.includes('Priya')).map(project => (
            <div key={project.id} className="status-card">
              <h5>{project.id}</h5>
              <p>{project.customerName}</p>
              <div className="progress-ring">
                <span>{project.progress}%</span>
              </div>
              <p className="status">{project.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeadManagement() {
  return (
    <div className="lead-management">
      <h3>Lead Management</h3>
      
      <div className="lead-stats">
        <div className="stat-card">
          <h4>5</h4>
          <p>Available Leads</p>
        </div>
        <div className="stat-card">
          <h4>12</h4>
          <p>Leads Purchased</p>
        </div>
        <div className="stat-card">
          <h4>75%</h4>
          <p>Conversion Rate</p>
        </div>
      </div>

      <div className="available-leads">
        <h4>Available Leads</h4>
        <div className="leads-grid">
          {SAMPLE_DATA.leads.map(lead => (
            <div key={lead.id} className="lead-detail-card">
              <div className="lead-header">
                <h5>{lead.customer}</h5>
                <span className="budget">{lead.budget}</span>
              </div>
              <div className="lead-details">
                <p><strong>Location:</strong> {lead.location}</p>
                <p><strong>Requirements:</strong> {lead.requirements}</p>
                <p><strong>Lead Cost:</strong> ₹500</p>
              </div>
              <button className="purchase-btn">Purchase Lead</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BOQBuilder() {
  const [cart, setCart] = useState([]);

  const addToCart = (material) => {
    setCart([...cart, { ...material, quantity: 1 }]);
  };

  return (
    <div className="boq-builder">
      <h3>BOQ Builder</h3>
      
      <div className="boq-interface">
        <div className="material-catalog">
          <h4>Material Catalog</h4>
          <div className="materials-grid">
            {SAMPLE_DATA.materials.map(material => (
              <div key={material.id} className="material-card">
                <h5>{material.name}</h5>
                <p className="category">{material.category}</p>
                <p className="price">₹{material.price.toLocaleString()}/{material.unit}</p>
                <p className="vendor">By: {material.vendor}</p>
                <p className="stock">Stock: {material.stock} {material.unit}</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart(material)}
                >
                  Add to BOQ
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="boq-cart">
          <h4>BOQ Cart</h4>
          {cart.length === 0 ? (
            <p>No items in BOQ</p>
          ) : (
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <h6>{item.name}</h6>
                  <div className="quantity-controls">
                    <input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => {
                        const newCart = [...cart];
                        newCart[index].quantity = parseInt(e.target.value);
                        setCart(newCart);
                      }}
                    />
                    <span>{item.unit}</span>
                  </div>
                  <p className="item-total">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
              <div className="cart-total">
                <h5>Total: ₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</h5>
              </div>
              <button className="generate-boq">Generate BOQ PDF</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DesignerProjects() {
  return (
    <div className="designer-projects">
      <h3>My Projects</h3>
      <div className="projects-list">
        {SAMPLE_DATA.projects.filter(p => p.designerName.includes('Priya')).map(project => (
          <div key={project.id} className="project-detail-card">
            <div className="project-info">
              <h4>{project.id} - {project.customerName}</h4>
              <p><strong>Budget:</strong> ₹{(project.budget / 100000).toFixed(1)}L</p>
              <p><strong>Status:</strong> {project.status}</p>
              <p><strong>Progress:</strong> {project.progress}%</p>
            </div>
            <div className="project-actions">
              <button className="btn-primary">Upload Designs</button>
              <button className="btn-secondary">Message Customer</button>
              <button className="btn-secondary">Update Progress</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WalletManagement() {
  const transactions = [
    { id: 'TXN001', type: 'credit', amount: 15000, description: 'Project PR001 - Final Payment', date: '2024-01-15' },
    { id: 'TXN002', type: 'debit', amount: 500, description: 'Lead Purchase - LD001', date: '2024-01-10' },
    { id: 'TXN003', type: 'credit', amount: 8000, description: 'Project PR002 - Milestone Payment', date: '2024-01-05' }
  ];

  return (
    <div className="wallet-management">
      <div className="wallet-overview">
        <div className="wallet-balance">
          <h3>Current Balance</h3>
          <div className="balance-amount">₹45,000</div>
        </div>
        <button className="recharge-wallet-btn">Recharge Wallet</button>
      </div>

      <div className="transaction-history">
        <h4>Transaction History</h4>
        <div className="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(txn => (
                <tr key={txn.id}>
                  <td>{txn.id}</td>
                  <td>
                    <span className={`txn-type ${txn.type}`}>
                      {txn.type === 'credit' ? '↗️ Credit' : '↘️ Debit'}
                    </span>
                  </td>
                  <td className={txn.type}>
                    {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                  </td>
                  <td>{txn.description}</td>
                  <td>{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Procurement Portal Component
function ProcurementPortal() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <ProcurementDashboard />;
      case 'inventory':
        return <InventoryManagement />;
      case 'vendors':
        return <VendorManagement />;
      case 'orders':
        return <OrderManagement />;
      default:
        return <ProcurementDashboard />;
    }
  };

  return (
    <div className="dashboard procurement-portal">
      <div className="dashboard-header">
        <h2>Procurement & Inventory Portal</h2>
        <div className="user-info">
          <img src={user.avatar} alt={user.name} className="avatar" />
          <span>{user.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="dashboard-layout">
        <div className="sidebar">
          <nav className="nav-menu">
            <button 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={activeTab === 'inventory' ? 'active' : ''}
              onClick={() => setActiveTab('inventory')}
            >
              📦 Inventory
            </button>
            <button 
              className={activeTab === 'vendors' ? 'active' : ''}
              onClick={() => setActiveTab('vendors')}
            >
              🏪 Vendors
            </button>
            <button 
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              📋 Orders
            </button>
          </nav>
        </div>

        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function ProcurementDashboard() {
  return (
    <div className="procurement-dashboard-content">
      <div className="inventory-summary">
        <div className="summary-card">
          <h3>2,456</h3>
          <p>Total SKUs</p>
          <span className="trend up">+5%</span>
        </div>
        <div className="summary-card alert">
          <h3>23</h3>
          <p>Low Stock Alerts</p>
          <span className="trend down">+3</span>
        </div>
        <div className="summary-card">
          <h3>145</h3>
          <p>Pending Orders</p>
          <span className="trend neutral">-2</span>
        </div>
        <div className="summary-card">
          <h3>4.1★</h3>
          <p>Avg Vendor Rating</p>
          <span className="trend up">+0.2</span>
        </div>
      </div>

      <div className="vendor-performance">
        <h4>Top Vendor Performance</h4>
        <div className="vendor-cards">
          <div className="vendor-card">
            <h5>Classic Stones</h5>
            <p>On-time Delivery: 95%</p>
            <p>Quality Score: 4.5★</p>
            <p>Open Orders: 12</p>
          </div>
          <div className="vendor-card">
            <h5>Kitchen Masters</h5>
            <p>On-time Delivery: 88%</p>
            <p>Quality Score: 4.2★</p>
            <p>Open Orders: 8</p>
          </div>
        </div>
      </div>

      <div className="low-stock-alerts">
        <h4>Low Stock Alerts</h4>
        <div className="alert-list">
          <div className="alert-item">
            <span className="material">Premium Marble Tiles</span>
            <span className="current-stock">45 sq ft</span>
            <span className="reorder-level">100 sq ft</span>
            <button className="reorder-btn">Reorder</button>
          </div>
          <div className="alert-item">
            <span className="material">Designer Light Fixtures</span>
            <span className="current-stock">8 units</span>
            <span className="reorder-level">20 units</span>
            <button className="reorder-btn">Reorder</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InventoryManagement() {
  return (
    <div className="inventory-management">
      <div className="section-header">
        <h3>Master Catalog</h3>
        <button className="add-btn">+ Add Product</button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Reorder Level</th>
              <th>Price</th>
              <th>Vendor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_DATA.materials.map(material => (
              <tr key={material.id}>
                <td>{material.id}</td>
                <td>{material.name}</td>
                <td>{material.category}</td>
                <td>{material.stock} {material.unit}</td>
                <td>100 {material.unit}</td>
                <td>₹{material.price.toLocaleString()}/{material.unit}</td>
                <td>{material.vendor}</td>
                <td>
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn reorder">Reorder</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function VendorManagement() {
  const vendors = [
    {
      id: 'VEN001',
      name: 'Classic Stones',
      category: 'Flooring',
      rating: 4.5,
      onTimeDelivery: 95,
      openOrders: 12,
      totalBusiness: '₹12.5L'
    },
    {
      id: 'VEN002',
      name: 'Kitchen Masters',
      category: 'Furniture',
      rating: 4.2,
      onTimeDelivery: 88,
      openOrders: 8,
      totalBusiness: '₹8.2L'
    }
  ];

  return (
    <div className="vendor-management">
      <div className="section-header">
        <h3>Vendor Management</h3>
        <button className="add-btn">+ Add Vendor</button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Vendor ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Rating</th>
              <th>On-Time Delivery</th>
              <th>Open Orders</th>
              <th>Total Business</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map(vendor => (
              <tr key={vendor.id}>
                <td>{vendor.id}</td>
                <td>{vendor.name}</td>
                <td>{vendor.category}</td>
                <td>{vendor.rating}★</td>
                <td>{vendor.onTimeDelivery}%</td>
                <td>{vendor.openOrders}</td>
                <td>{vendor.totalBusiness}</td>
                <td>
                  <button className="action-btn view">View</button>
                  <button className="action-btn edit">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrderManagement() {
  const orders = [
    { id: 'PO001', vendor: 'Classic Stones', items: 5, total: '₹4.2L', status: 'Shipped', expectedDelivery: '2024-01-25' },
    { id: 'PO002', vendor: 'Kitchen Masters', items: 2, total: '₹3.0L', status: 'Processing', expectedDelivery: '2024-02-05' }
  ];

  return (
    <div className="order-management">
      <div className="section-header">
        <h3>Purchase Orders</h3>
        <button className="add-btn">+ Create PO</button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Vendor</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Expected Delivery</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.vendor}</td>
                <td>{order.items}</td>
                <td>{order.total}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.expectedDelivery}</td>
                <td>
                  <button className="action-btn view">Track</button>
                  <button className="action-btn edit">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading Gharinto...</h2>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  // Route based on user role
  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'pm':
      return <PMDashboard />;
    case 'customer':
      return <CustomerPortal />;
    case 'designer':
      return <DesignerPortal />;
    case 'procurement':
      return <ProcurementPortal />;
    default:
      return <LandingPage />;
  }
}

// Root App with Auth Provider
function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithAuth;