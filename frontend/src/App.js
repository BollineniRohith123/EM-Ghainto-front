import React, { useState, useContext, createContext, useEffect } from 'react';
import './App.css';

// Auth Context
const AuthContext = createContext();

// Enhanced Sample Users for Demo
const SAMPLE_USERS = {
  admin: { 
    id: 'admin1', 
    email: 'admin@gharinto.com', 
    password: 'admin123', 
    role: 'admin', 
    name: 'Arjun Patel',
    title: 'System Administrator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    phone: '+91-9876543210',
    joinDate: '2023-01-15'
  },
  pm: { 
    id: 'pm1', 
    email: 'rajesh@gharinto.com', 
    password: 'pm123', 
    role: 'pm', 
    name: 'Rajesh Kumar',
    title: 'Senior Project Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    phone: '+91-9876543211',
    joinDate: '2023-02-20'
  },
  customer: { 
    id: 'cust1', 
    email: 'sharma@gmail.com', 
    password: 'cust123', 
    role: 'customer', 
    name: 'Sharma Family',
    title: 'Premium Customer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    phone: '+91-9876543212',
    joinDate: '2023-11-10'
  },
  designer: { 
    id: 'des1', 
    email: 'priya@designer.com', 
    password: 'des123', 
    role: 'designer', 
    name: 'Priya Mehta',
    title: 'Senior Interior Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2a90000?w=100&h=100&fit=crop&crop=face',
    phone: '+91-9876543213',
    joinDate: '2023-03-15'
  },
  procurement: { 
    id: 'proc1', 
    email: 'inventory@gharinto.com', 
    password: 'proc123', 
    role: 'procurement', 
    name: 'Vikash Singh',
    title: 'Procurement Manager',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    phone: '+91-9876543214',
    joinDate: '2023-04-01'
  }
};

// Comprehensive Sample Data
const SAMPLE_DATA = {
  customers: [
    { id: 'CUST001', name: 'Sharma Family', email: 'sharma.family@gmail.com', phone: '+91-9999999999', location: 'Mumbai, Maharashtra', projects: 2, totalSpent: 850000, status: 'Active', registrationDate: '2023-12-01', propertyType: '3BHK Apartment', budget: '5-8L' },
    { id: 'CUST002', name: 'Gupta Residence', email: 'gupta@gmail.com', phone: '+91-8888888888', location: 'Delhi, NCR', projects: 1, totalSpent: 420000, status: 'Active', registrationDate: '2024-01-15', propertyType: '2BHK Flat', budget: '3-5L' },
    { id: 'CUST003', name: 'Patel Villa', email: 'patel@gmail.com', phone: '+91-7777777777', location: 'Pune, Maharashtra', projects: 3, totalSpent: 1200000, status: 'VIP', registrationDate: '2023-10-20', propertyType: '4BHK Villa', budget: '10-15L' },
    { id: 'CUST004', name: 'Singh Mansion', email: 'singh@gmail.com', phone: '+91-6666666666', location: 'Bangalore, Karnataka', projects: 1, totalSpent: 680000, status: 'Active', registrationDate: '2024-02-10', propertyType: '3BHK Duplex', budget: '6-9L' },
    { id: 'CUST005', name: 'Agarwal Heights', email: 'agarwal@gmail.com', phone: '+91-5555555555', location: 'Chennai, Tamil Nadu', projects: 2, totalSpent: 950000, status: 'Active', registrationDate: '2023-11-30', propertyType: '3BHK Penthouse', budget: '8-12L' },
    { id: 'CUST006', name: 'Verma Residency', email: 'verma@gmail.com', phone: '+91-4444444444', location: 'Hyderabad, Telangana', projects: 1, totalSpent: 320000, status: 'Active', registrationDate: '2024-01-20', propertyType: '2BHK Apartment', budget: '2-4L' },
    { id: 'CUST007', name: 'Khan Palace', email: 'khan@gmail.com', phone: '+91-3333333333', location: 'Lucknow, UP', projects: 4, totalSpent: 1800000, status: 'VIP', registrationDate: '2023-09-15', propertyType: '5BHK Villa', budget: '15-20L' },
    { id: 'CUST008', name: 'Joshi Apartments', email: 'joshi@gmail.com', phone: '+91-2222222222', location: 'Ahmedabad, Gujarat', projects: 1, totalSpent: 480000, status: 'Active', registrationDate: '2024-03-05', propertyType: '2BHK Flat', budget: '4-6L' },
    { id: 'CUST009', name: 'Reddy Homes', email: 'reddy@gmail.com', phone: '+91-1111111111', location: 'Visakhapatnam, AP', projects: 2, totalSpent: 720000, status: 'Active', registrationDate: '2023-12-20', propertyType: '3BHK House', budget: '6-8L' },
    { id: 'CUST010', name: 'Bhattacharya Estate', email: 'bhatta@gmail.com', phone: '+91-9898989898', location: 'Kolkata, WB', projects: 1, totalSpent: 550000, status: 'Active', registrationDate: '2024-02-28', propertyType: '3BHK Apartment', budget: '5-7L' }
  ],
  
  projects: [
    { id: 'PR001', customerName: 'Sharma Family', designerName: 'Priya Mehta', pmName: 'Rajesh Kumar', status: 'In Progress', progress: 65, budget: 520000, spent: 338000, location: 'Mumbai, Maharashtra', startDate: '2024-01-01', expectedEnd: '2024-03-15', nextMilestone: 'Material Procurement', propertyType: '3BHK Apartment', area: '1200 sq ft', phase: 'Civil Work' },
    { id: 'PR002', customerName: 'Gupta Residence', designerName: 'Anita Sharma', pmName: 'Rajesh Kumar', status: 'Design Phase', progress: 25, budget: 420000, spent: 105000, location: 'Delhi, NCR', startDate: '2024-02-01', expectedEnd: '2024-04-30', nextMilestone: 'Design Approval', propertyType: '2BHK Flat', area: '900 sq ft', phase: 'Design' },
    { id: 'PR003', customerName: 'Patel Villa', designerName: 'Priya Mehta', pmName: 'Suresh Gupta', status: 'Completed', progress: 100, budget: 1200000, spent: 1180000, location: 'Pune, Maharashtra', startDate: '2023-10-01', expectedEnd: '2024-01-15', nextMilestone: 'Handover', propertyType: '4BHK Villa', area: '2500 sq ft', phase: 'Completed' },
    { id: 'PR004', customerName: 'Singh Mansion', designerName: 'Rohit Desai', pmName: 'Rajesh Kumar', status: 'Procurement', progress: 45, budget: 680000, spent: 306000, location: 'Bangalore, Karnataka', startDate: '2024-02-10', expectedEnd: '2024-05-20', nextMilestone: 'Material Delivery', propertyType: '3BHK Duplex', area: '1800 sq ft', phase: 'Procurement' },
    { id: 'PR005', customerName: 'Agarwal Heights', designerName: 'Kavya Nair', pmName: 'Suresh Gupta', status: 'Installation', progress: 80, budget: 950000, spent: 760000, location: 'Chennai, Tamil Nadu', startDate: '2023-12-01', expectedEnd: '2024-03-30', nextMilestone: 'Final Setup', propertyType: '3BHK Penthouse', area: '1600 sq ft', phase: 'Installation' },
    { id: 'PR006', customerName: 'Verma Residency', designerName: 'Anita Sharma', pmName: 'Rajesh Kumar', status: 'Design Phase', progress: 15, budget: 320000, spent: 48000, location: 'Hyderabad, Telangana', startDate: '2024-03-01', expectedEnd: '2024-05-15', nextMilestone: 'Initial Design', propertyType: '2BHK Apartment', area: '800 sq ft', phase: 'Design' },
    { id: 'PR007', customerName: 'Khan Palace', designerName: 'Priya Mehta', pmName: 'Suresh Gupta', status: 'In Progress', progress: 55, budget: 1800000, spent: 990000, location: 'Lucknow, UP', startDate: '2023-11-15', expectedEnd: '2024-04-30', nextMilestone: 'Kitchen Installation', propertyType: '5BHK Villa', area: '3500 sq ft', phase: 'Civil Work' },
    { id: 'PR008', customerName: 'Joshi Apartments', designerName: 'Rohit Desai', pmName: 'Rajesh Kumar', status: 'Procurement', progress: 35, budget: 480000, spent: 168000, location: 'Ahmedabad, Gujarat', startDate: '2024-03-05', expectedEnd: '2024-06-10', nextMilestone: 'Material Order', propertyType: '2BHK Flat', area: '1000 sq ft', phase: 'Procurement' },
    { id: 'PR009', customerName: 'Reddy Homes', designerName: 'Kavya Nair', pmName: 'Suresh Gupta', status: 'Installation', progress: 90, budget: 720000, spent: 648000, location: 'Visakhapatnam, AP', startDate: '2023-12-20', expectedEnd: '2024-03-25', nextMilestone: 'Final Touches', propertyType: '3BHK House', area: '1400 sq ft', phase: 'Installation' },
    { id: 'PR010', customerName: 'Bhattacharya Estate', designerName: 'Anita Sharma', pmName: 'Rajesh Kumar', status: 'Design Phase', progress: 20, budget: 550000, spent: 110000, location: 'Kolkata, WB', startDate: '2024-02-28', expectedEnd: '2024-06-15', nextMilestone: 'Design Review', propertyType: '3BHK Apartment', area: '1100 sq ft', phase: 'Design' }
  ],
  
  leads: [
    { id: 'LD001', customer: 'Verma Family', budget: '5-8L', location: 'Bangalore', status: 'New', assignedTo: null, requirements: '3BHK Modern Interior', propertyType: '3BHK Apartment', area: '1300 sq ft', phone: '+91-9876543215', priority: 'High', source: 'Website' },
    { id: 'LD002', customer: 'Singh Residence', budget: '3-5L', location: 'Chennai', status: 'Assigned', assignedTo: 'Priya Mehta', requirements: '2BHK Minimalist Design', propertyType: '2BHK Flat', area: '850 sq ft', phone: '+91-9876543216', priority: 'Medium', source: 'Referral' },
    { id: 'LD003', customer: 'Kapoor Villa', budget: '10-15L', location: 'Mumbai', status: 'New', assignedTo: null, requirements: '4BHK Luxury Interior', propertyType: '4BHK Villa', area: '2800 sq ft', phone: '+91-9876543217', priority: 'High', source: 'Social Media' },
    { id: 'LD004', customer: 'Mishra Apartments', budget: '2-4L', location: 'Delhi', status: 'In Discussion', assignedTo: 'Anita Sharma', requirements: '1BHK Compact Design', propertyType: '1BHK Studio', area: '600 sq ft', phone: '+91-9876543218', priority: 'Low', source: 'Google Ads' },
    { id: 'LD005', customer: 'Rao Penthouse', budget: '8-12L', location: 'Hyderabad', status: 'New', assignedTo: null, requirements: '3BHK Contemporary Style', propertyType: '3BHK Penthouse', area: '1800 sq ft', phone: '+91-9876543219', priority: 'High', source: 'Website' },
    { id: 'LD006', customer: 'Malhotra Residency', budget: '4-6L', location: 'Pune', status: 'Assigned', assignedTo: 'Rohit Desai', requirements: '2BHK Traditional Design', propertyType: '2BHK House', area: '1000 sq ft', phone: '+91-9876543220', priority: 'Medium', source: 'Referral' }
  ],
  
  designers: [
    { id: 'DES001', name: 'Priya Mehta', rating: 4.8, projects: 28, walletBalance: 65000, status: 'Active', specialization: 'Modern, Minimalist, Contemporary', experience: 8, location: 'Mumbai', completedProjects: 45, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2a90000?w=100&h=100&fit=crop&crop=face', phone: '+91-9876543213', joinDate: '2023-03-15' },
    { id: 'DES002', name: 'Anita Sharma', rating: 4.6, projects: 22, walletBalance: 52000, status: 'Active', specialization: 'Traditional, Ethnic, Vintage', experience: 6, location: 'Delhi', completedProjects: 38, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', phone: '+91-9876543221', joinDate: '2023-04-20' },
    { id: 'DES003', name: 'Rohit Desai', rating: 4.5, projects: 19, walletBalance: 48000, status: 'Active', specialization: 'Contemporary, Industrial, Luxury', experience: 7, location: 'Bangalore', completedProjects: 32, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', phone: '+91-9876543222', joinDate: '2023-05-10' },
    { id: 'DES004', name: 'Kavya Nair', rating: 4.7, projects: 25, walletBalance: 58000, status: 'Active', specialization: 'Minimalist, Scandinavian, Eco-friendly', experience: 5, location: 'Chennai', completedProjects: 41, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2a90000?w=100&h=100&fit=crop&crop=face', phone: '+91-9876543223', joinDate: '2023-06-01' },
    { id: 'DES005', name: 'Suresh Gupta', rating: 4.4, projects: 16, walletBalance: 42000, status: 'Active', specialization: 'Classic, Royal, Heritage', experience: 9, location: 'Pune', completedProjects: 29, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', phone: '+91-9876543224', joinDate: '2023-07-15' }
  ],
  
  materials: [
    { id: 'MAT001', name: 'Premium Marble Tiles', category: 'Flooring', price: 850, unit: 'sq ft', stock: 500, vendor: 'Classic Stones', image: 'https://images.pexels.com/photos/279648/pexels-photo-279648.jpeg', description: 'High-quality Italian marble tiles', rating: 4.8 },
    { id: 'MAT002', name: 'Modular Kitchen Set', category: 'Furniture', price: 150000, unit: 'set', stock: 25, vendor: 'Kitchen Masters', image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg', description: 'Complete modular kitchen with appliances', rating: 4.6 },
    { id: 'MAT003', name: 'LED Ceiling Lights', category: 'Lighting', price: 3500, unit: 'piece', stock: 150, vendor: 'Bright Lights Co', image: 'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg', description: 'Energy-efficient LED ceiling fixtures', rating: 4.7 },
    { id: 'MAT004', name: 'Luxury Sofa Set', category: 'Furniture', price: 85000, unit: 'set', stock: 18, vendor: 'Comfort Furniture', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', description: '7-seater luxury fabric sofa set', rating: 4.9 },
    { id: 'MAT005', name: 'Wooden Flooring', category: 'Flooring', price: 450, unit: 'sq ft', stock: 800, vendor: 'Wood Works', image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg', description: 'Premium engineered wood flooring', rating: 4.5 },
    { id: 'MAT006', name: 'Designer Wallpaper', category: 'Wall Decor', price: 1200, unit: 'sq ft', stock: 300, vendor: 'Wall Art Studio', image: 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg', description: 'Premium textured wallpaper', rating: 4.4 },
    { id: 'MAT007', name: 'Bathroom Fixtures', category: 'Sanitary', price: 25000, unit: 'set', stock: 40, vendor: 'Bath Essentials', image: 'https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg', description: 'Complete bathroom fixture set', rating: 4.6 },
    { id: 'MAT008', name: 'Window Blinds', category: 'Window Treatment', price: 2500, unit: 'piece', stock: 120, vendor: 'Shade Solutions', image: 'https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg', description: 'Motorized window blinds', rating: 4.3 },
    { id: 'MAT009', name: 'Dining Table Set', category: 'Furniture', price: 45000, unit: 'set', stock: 30, vendor: 'Dining Delights', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914', description: '6-seater solid wood dining set', rating: 4.7 },
    { id: 'MAT010', name: 'Smart Home System', category: 'Technology', price: 75000, unit: 'set', stock: 15, vendor: 'Tech Home Solutions', image: 'https://images.unsplash.com/photo-1696987007764-7f8b85dd3033', description: 'Complete smart home automation', rating: 4.8 }
  ],

  teamMembers: [
    { name: 'Arjun Patel', role: 'CEO & Founder', image: 'https://images.pexels.com/photos/5922204/pexels-photo-5922204.jpeg', bio: 'Visionary leader with 15+ years in interior design industry' },
    { name: 'Priya Mehta', role: 'Lead Designer', image: 'https://images.pexels.com/photos/2678468/pexels-photo-2678468.jpeg', bio: 'Award-winning designer specializing in modern interiors' },
    { name: 'Rajesh Kumar', role: 'Project Manager', image: 'https://images.unsplash.com/photo-1716703373020-17ff360924ee', bio: 'Expert in managing complex interior projects' },
    { name: 'Vikash Singh', role: 'Operations Head', image: 'https://images.unsplash.com/photo-1716703742354-c3c45ecc3b27', bio: 'Streamlining operations for seamless execution' }
  ],

  services: [
    { 
      name: 'Residential Interior Design', 
      description: 'Complete home makeover with personalized design solutions',
      features: ['3D Visualization', 'Space Planning', 'Furniture Selection', 'Color Consultation'],
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      price: 'Starting from ₹50,000'
    },
    { 
      name: 'Commercial Space Design', 
      description: 'Professional workspace design for optimal productivity',
      features: ['Office Planning', 'Brand Integration', 'Ergonomic Design', 'Lighting Solutions'],
      image: 'https://images.unsplash.com/photo-1715593949345-50d3304cff4b',
      price: 'Starting from ₹1,00,000'
    },
    { 
      name: 'Kitchen & Bathroom Design', 
      description: 'Specialized design for kitchens and bathrooms',
      features: ['Modular Kitchen', 'Storage Solutions', 'Premium Fixtures', 'Water Management'],
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
      price: 'Starting from ₹75,000'
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

// Enhanced Landing Page Component
function LandingPage() {
  const { login } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch(currentPage) {
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage setShowLogin={setShowLogin} />;
    }
  };

  return (
    <div className="landing-page">
      {/* Enhanced Header */}
      <header className="header">
        <div className="container">
          <div className="nav">
            <div className="logo">
              <h2>Gharinto</h2>
              <span className="tagline">Interior Excellence</span>
            </div>
            
            <nav className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <button 
                className={currentPage === 'home' ? 'active' : ''}
                onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
              >
                Home
              </button>
              <button 
                className={currentPage === 'about' ? 'active' : ''}
                onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }}
              >
                About
              </button>
              <button 
                className={currentPage === 'services' ? 'active' : ''}
                onClick={() => { setCurrentPage('services'); setMobileMenuOpen(false); }}
              >
                Services
              </button>
              <button 
                className={currentPage === 'portfolio' ? 'active' : ''}
                onClick={() => { setCurrentPage('portfolio'); setMobileMenuOpen(false); }}
              >
                Portfolio
              </button>
              <button 
                className={currentPage === 'contact' ? 'active' : ''}
                onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}
              >
                Contact
              </button>
            </nav>

            <div className="header-actions">
              <button 
                className="login-btn"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
              <button 
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      {renderPage()}

      {/* Enhanced Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Gharinto</h3>
              <p>Transforming spaces with innovative interior design solutions. Your dream home is just a click away.</p>
              <div className="social-links">
                <button className="social-btn">📘</button>
                <button className="social-btn">📸</button>
                <button className="social-btn">🐦</button>
                <button className="social-btn">💼</button>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <button onClick={() => setCurrentPage('home')}>Home</button>
              <button onClick={() => setCurrentPage('about')}>About Us</button>
              <button onClick={() => setCurrentPage('services')}>Services</button>
              <button onClick={() => setCurrentPage('portfolio')}>Portfolio</button>
            </div>
            
            <div className="footer-section">
              <h4>Services</h4>
              <p>Residential Design</p>
              <p>Commercial Spaces</p>
              <p>Kitchen & Bathroom</p>
              <p>Project Management</p>
            </div>
            
            <div className="footer-section">
              <h4>Contact Info</h4>
              <p>📧 info@gharinto.com</p>
              <p>📞 +91-9876543210</p>
              <p>📍 Mumbai, Maharashtra</p>
              <p>🕒 Mon-Sat: 9AM-7PM</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 Gharinto. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}

// Home Page Component
function HomePage({ setShowLogin }) {
  return (
    <>
      {/* Enhanced Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="animate-fadeInUp">Transform Your Space with <span>Gharinto</span></h1>
              <p className="animate-fadeInUp delay-1">The complete interior design platform connecting builders, designers, customers, and suppliers for seamless project execution.</p>
              <div className="hero-stats animate-fadeInUp delay-2">
                <div className="stat-item">
                  <h3>500+</h3>
                  <p>Projects Completed</p>
                </div>
                <div className="stat-item">
                  <h3>1000+</h3>
                  <p>Happy Customers</p>
                </div>
                <div className="stat-item">
                  <h3>50+</h3>
                  <p>Expert Designers</p>
                </div>
              </div>
              <div className="hero-buttons animate-fadeInUp delay-3">
                <button 
                  className="cta-primary"
                  onClick={() => setShowLogin(true)}
                >
                  Get Started Today
                </button>
                <button className="cta-secondary">Watch Demo</button>
              </div>
            </div>
            <div className="hero-image animate-fadeInRight">
              <img 
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" 
                alt="Modern Interior Design"
              />
              <div className="floating-card">
                <div className="card-icon">🎨</div>
                <div>
                  <h4>Professional Design</h4>
                  <p>Expert interior solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header animate-fadeInUp">
            <h2>Complete Interior Design Ecosystem</h2>
            <p>Everything you need for your dream interior in one platform</p>
          </div>
          <div className="features-grid">
            <div className="feature-card animate-fadeInUp delay-1">
              <div className="feature-icon">👥</div>
              <h3>For Customers</h3>
              <p>Track your project progress, view designs, make payments, and communicate with your team seamlessly.</p>
              <ul>
                <li>✓ Real-time project tracking</li>
                <li>✓ 3D design visualization</li>
                <li>✓ Secure payment gateway</li>
                <li>✓ Direct team communication</li>
              </ul>
              <button className="feature-btn">Learn More</button>
            </div>
            <div className="feature-card animate-fadeInUp delay-2">
              <div className="feature-icon">🎨</div>
              <h3>For Designers</h3>
              <p>Manage leads, create BOQs, track projects, and grow your business with our designer portal.</p>
              <ul>
                <li>✓ Lead management system</li>
                <li>✓ Digital wallet & payments</li>
                <li>✓ BOQ builder tools</li>
                <li>✓ Portfolio showcase</li>
              </ul>
              <button className="feature-btn">Join Network</button>
            </div>
            <div className="feature-card animate-fadeInUp delay-3">
              <div className="feature-icon">📊</div>
              <h3>For Managers</h3>
              <p>Monitor projects, manage teams, track progress, and ensure timely delivery with powerful tools.</p>
              <ul>
                <li>✓ Project management dashboard</li>
                <li>✓ Team coordination tools</li>
                <li>✓ Progress monitoring</li>
                <li>✓ Resource allocation</li>
              </ul>
              <button className="feature-btn">Explore Tools</button>
            </div>
            <div className="feature-card animate-fadeInUp delay-4">
              <div className="feature-icon">📦</div>
              <h3>For Procurement</h3>
              <p>Manage inventory, track vendors, handle logistics, and streamline material procurement.</p>
              <ul>
                <li>✓ Inventory management</li>
                <li>✓ Vendor network</li>
                <li>✓ Order tracking</li>
                <li>✓ Quality assurance</li>
              </ul>
              <button className="feature-btn">Get Started</button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Portfolio Preview */}
      <section className="portfolio-preview">
        <div className="container">
          <div className="section-header animate-fadeInUp">
            <h2>Our Recent Works</h2>
            <p>Discover stunning transformations by our expert designers</p>
          </div>
          <div className="portfolio-grid">
            <div className="portfolio-item animate-fadeInUp delay-1">
              <img src="https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg" alt="Modern Kitchen" />
              <div className="portfolio-overlay">
                <h4>Modern Kitchen Design</h4>
                <p>Contemporary style • Mumbai</p>
                <button className="view-btn">View Details</button>
              </div>
            </div>
            <div className="portfolio-item animate-fadeInUp delay-2">
              <img src="https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg" alt="Luxury Bathroom" />
              <div className="portfolio-overlay">
                <h4>Luxury Bathroom</h4>
                <p>Premium style • Delhi</p>
                <button className="view-btn">View Details</button>
              </div>
            </div>
            <div className="portfolio-item animate-fadeInUp delay-3">
              <img src="https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg" alt="Dining Area" />
              <div className="portfolio-overlay">
                <h4>Elegant Dining Area</h4>
                <p>Classic style • Pune</p>
                <button className="view-btn">View Details</button>
              </div>
            </div>
          </div>
          <div className="text-center animate-fadeInUp delay-4">
            <button className="cta-secondary">View Full Portfolio</button>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header animate-fadeInUp">
            <h2>What Our Clients Say</h2>
            <p>Real stories from satisfied customers</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial animate-fadeInUp delay-1">
              <div className="testimonial-content">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p>"Gharinto transformed our home beyond our expectations. The process was smooth, transparent, and the final result was absolutely stunning!"</p>
                <div className="testimonial-author">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face" alt="Customer" />
                  <div>
                    <h4>Priya Sharma</h4>
                    <p>Mumbai • 3BHK Apartment</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial animate-fadeInUp delay-2">
              <div className="testimonial-content">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p>"The designer portal helped me grow my business by 300%. The lead management and digital wallet features are game-changers!"</p>
                <div className="testimonial-author">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b2a90000?w=60&h=60&fit=crop&crop=face" alt="Designer" />
                  <div>
                    <h4>Meera Patel</h4>
                    <p>Interior Designer • 5 Years</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial animate-fadeInUp delay-3">
              <div className="testimonial-content">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p>"As a project manager, Gharinto's tools have made my job so much easier. Everything is organized and client communication is seamless."</p>
                <div className="testimonial-author">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" alt="PM" />
                  <div>
                    <h4>Amit Kumar</h4>
                    <p>Project Manager • 15+ Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content animate-fadeInUp">
            <h2>Ready to Transform Your Space?</h2>
            <p>Join thousands of satisfied customers who chose Gharinto for their interior design needs</p>
            <div className="cta-buttons">
              <button 
                className="cta-primary"
                onClick={() => setShowLogin(true)}
              >
                Start Your Project
              </button>
              <button className="cta-secondary">Schedule Consultation</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// About Page Component
function AboutPage() {
  return (
    <div className="page-content">
      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fadeInUp">About Gharinto</h1>
          <p className="animate-fadeInUp delay-1">Revolutionizing interior design with technology and expertise</p>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text animate-fadeInLeft">
              <h2>Our Story</h2>
              <p>Founded in 2023, Gharinto emerged from a simple observation: the interior design industry needed a comprehensive platform that could seamlessly connect all stakeholders - from customers with dreams to designers with vision, from project managers ensuring execution to procurement teams sourcing materials.</p>
              <p>Today, we've transformed over 500 spaces and built a network of 50+ expert designers, all working together on our integrated platform to deliver exceptional interior design experiences.</p>
              <div className="achievements">
                <div className="achievement">
                  <h3>500+</h3>
                  <p>Projects Completed</p>
                </div>
                <div className="achievement">
                  <h3>50+</h3>
                  <p>Expert Designers</p>
                </div>
                <div className="achievement">
                  <h3>1000+</h3>
                  <p>Happy Customers</p>
                </div>
              </div>
            </div>
            <div className="story-image animate-fadeInRight">
              <img src="https://images.pexels.com/photos/5922204/pexels-photo-5922204.jpeg" alt="Our Team" />
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2 className="text-center animate-fadeInUp">Meet Our Team</h2>
          <div className="team-grid">
            {SAMPLE_DATA.teamMembers.map((member, index) => (
              <div key={index} className={`team-card animate-fadeInUp delay-${index + 1}`}>
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Services Page Component
function ServicesPage() {
  return (
    <div className="page-content">
      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fadeInUp">Our Services</h1>
          <p className="animate-fadeInUp delay-1">Comprehensive interior design solutions for every need</p>
        </div>
      </section>

      <section className="services-detailed">
        <div className="container">
          {SAMPLE_DATA.services.map((service, index) => (
            <div key={index} className={`service-detail ${index % 2 === 1 ? 'reverse' : ''} animate-fadeInUp delay-${index + 1}`}>
              <div className="service-image">
                <img src={service.image} alt={service.name} />
              </div>
              <div className="service-content">
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                <ul className="features-list">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
                <div className="service-price">{service.price}</div>
                <button className="service-btn">Get Quote</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Portfolio Page Component
function PortfolioPage() {
  const categories = ['All', 'Residential', 'Commercial', 'Kitchen', 'Bathroom'];
  const [activeCategory, setActiveCategory] = useState('All');

  const portfolioItems = [
    { category: 'Residential', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', title: 'Modern Living Room', location: 'Mumbai' },
    { category: 'Kitchen', image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg', title: 'Contemporary Kitchen', location: 'Delhi' },
    { category: 'Bathroom', image: 'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg', title: 'Luxury Bathroom', location: 'Pune' },
    { category: 'Residential', image: 'https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg', title: 'Dining Area', location: 'Bangalore' },
    { category: 'Commercial', image: 'https://images.unsplash.com/photo-1715593949345-50d3304cff4b', title: 'Office Space', location: 'Chennai' },
    { category: 'Kitchen', image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg', title: 'Modern Kitchen', location: 'Hyderabad' }
  ];

  const filteredItems = activeCategory === 'All' ? portfolioItems : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="page-content">
      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fadeInUp">Our Portfolio</h1>
          <p className="animate-fadeInUp delay-1">Explore our stunning interior design transformations</p>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="container">
          <div className="portfolio-filters animate-fadeInUp">
            {categories.map(category => (
              <button
                key={category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {filteredItems.map((item, index) => (
              <div key={index} className={`portfolio-item animate-fadeInUp delay-${index + 1}`}>
                <img src={item.image} alt={item.title} />
                <div className="portfolio-overlay">
                  <h4>{item.title}</h4>
                  <p>{item.location}</p>
                  <button className="view-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Contact Page Component
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="page-content">
      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fadeInUp">Contact Us</h1>
          <p className="animate-fadeInUp delay-1">Get in touch with our interior design experts</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info animate-fadeInLeft">
              <h2>Get In Touch</h2>
              <p>Ready to transform your space? Contact our team of experts today.</p>
              
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <p>info@gharinto.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>+91-9876543210</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h4>Office</h4>
                  <p>Mumbai, Maharashtra, India</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">🕒</div>
                <div>
                  <h4>Hours</h4>
                  <p>Mon-Sat: 9AM-7PM</p>
                </div>
              </div>
            </div>

            <form className="contact-form animate-fadeInRight" onSubmit={handleSubmit}>
              <h3>Send us a Message</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

// Enhanced Login Modal Component
function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      if (login(email, password)) {
        onClose();
      } else {
        setError('Invalid credentials. Please try demo accounts below.');
      }
      setLoading(false);
    }, 1000);
  };

  const quickLogin = (userType) => {
    const user = SAMPLE_USERS[userType];
    setEmail(user.email);
    setPassword(user.password);
    setError('');
  };

  return (
    <div className="modal-overlay animate-fadeIn" onClick={onClose}>
      <div className="modal animate-slideInUp" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Welcome to Gharinto</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && <div className="error animate-shake">{error}</div>}
          
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-accounts">
          <h4>Try Demo Accounts:</h4>
          <div className="demo-grid">
            <button onClick={() => quickLogin('admin')} className="demo-card">
              <span className="demo-icon">👨‍💼</span>
              <div>
                <h5>Admin Dashboard</h5>
                <p>Full system control</p>
              </div>
            </button>
            <button onClick={() => quickLogin('pm')} className="demo-card">
              <span className="demo-icon">📊</span>
              <div>
                <h5>Project Manager</h5>
                <p>Project oversight</p>
              </div>
            </button>
            <button onClick={() => quickLogin('customer')} className="demo-card">
              <span className="demo-icon">🏠</span>
              <div>
                <h5>Customer Portal</h5>
                <p>Track your project</p>
              </div>
            </button>
            <button onClick={() => quickLogin('designer')} className="demo-card">
              <span className="demo-icon">🎨</span>
              <div>
                <h5>Designer Portal</h5>
                <p>Manage designs</p>
              </div>
            </button>
            <button onClick={() => quickLogin('procurement')} className="demo-card">
              <span className="demo-icon">📦</span>
              <div>
                <h5>Procurement</h5>
                <p>Inventory management</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Rest of the components remain the same but will be enhanced in the CSS...
// [Previous dashboard components continue here - AdminDashboard, PMDashboard, CustomerPortal, DesignerPortal, ProcurementPortal]
// I'll continue with the enhanced dashboard components...

// Enhanced Admin Dashboard Component
function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications] = useState([
    { id: 1, message: 'New lead from Mumbai - High Priority', time: '2 min ago', type: 'lead' },
    { id: 2, message: 'Project PR001 reached 70% completion', time: '1 hour ago', type: 'project' },
    { id: 3, message: 'Payment received from Sharma Family', time: '3 hours ago', type: 'payment' }
  ]);

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
      case 'reports':
        return <ReportsManagement />;
      default:
        return <AdminDashboardContent />;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h2>Admin Dashboard</h2>
          <p>Welcome back, {user.name}</p>
        </div>
        <div className="header-right">
          <div className="notifications-dropdown">
            <button className="notification-btn">
              🔔 <span className="notification-count">{notifications.length}</span>
            </button>
            <div className="notifications-panel">
              {notifications.map(notif => (
                <div key={notif.id} className="notification-item">
                  <p>{notif.message}</p>
                  <span>{notif.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="user-info">
            <img src={user.avatar} alt={user.name} className="avatar" />
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.title}</span>
            </div>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
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
            <button 
              className={activeTab === 'reports' ? 'active' : ''}
              onClick={() => setActiveTab('reports')}
            >
              📋 Reports
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

// Enhanced Admin Dashboard Content
function AdminDashboardContent() {
  return (
    <div className="dashboard-content">
      <div className="kpi-cards">
        <div className="kpi-card animate-slideInUp">
          <div className="kpi-icon">🏠</div>
          <div className="kpi-details">
            <h3>156</h3>
            <p>Total Projects</p>
            <span className="trend up">+12% from last month</span>
          </div>
        </div>
        <div className="kpi-card animate-slideInUp delay-1">
          <div className="kpi-icon">👥</div>
          <div className="kpi-details">
            <h3>89</h3>
            <p>Active Customers</p>
            <span className="trend up">+8% from last month</span>
          </div>
        </div>
        <div className="kpi-card animate-slideInUp delay-2">
          <div className="kpi-icon">💰</div>
          <div className="kpi-details">
            <h3>₹12.5L</h3>
            <p>Revenue This Month</p>
            <span className="trend up">+15% from last month</span>
          </div>
        </div>
        <div className="kpi-card animate-slideInUp delay-3">
          <div className="kpi-icon">⭐</div>
          <div className="kpi-details">
            <h3>4.2</h3>
            <p>Avg Partner Rating</p>
            <span className="trend down">-0.1 from last month</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="chart-section">
          <div className="chart-container animate-fadeInUp">
            <div className="chart-header">
              <h4>Monthly Revenue Trend</h4>
              <div className="chart-controls">
                <button className="active">6M</button>
                <button>1Y</button>
                <button>All</button>
              </div>
            </div>
            <div className="enhanced-chart">
              <div className="chart-bars">
                <div className="bar" style={{height: '60%'}} data-value="₹8.2L">
                  <span className="bar-label">Jan</span>
                </div>
                <div className="bar" style={{height: '80%'}} data-value="₹10.5L">
                  <span className="bar-label">Feb</span>
                </div>
                <div className="bar" style={{height: '45%'}} data-value="₹6.8L">
                  <span className="bar-label">Mar</span>
                </div>
                <div className="bar" style={{height: '90%'}} data-value="₹11.2L">
                  <span className="bar-label">Apr</span>
                </div>
                <div className="bar" style={{height: '70%'}} data-value="₹9.1L">
                  <span className="bar-label">May</span>
                </div>
                <div className="bar active" style={{height: '95%'}} data-value="₹12.5L">
                  <span className="bar-label">Jun</span>
                </div>
              </div>
            </div>
          </div>

          <div className="quick-stats animate-fadeInUp delay-1">
            <h4>Quick Statistics</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">25</span>
                <span className="stat-label">New Leads Today</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">8</span>
                <span className="stat-label">Projects Started</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">₹2.3L</span>
                <span className="stat-label">Today's Revenue</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Customer Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        <div className="side-panels">
          <div className="panel animate-fadeInRight">
            <h4>Project Status Distribution</h4>
            <div className="status-chart">
              <div className="status-item">
                <div className="status-bar">
                  <div className="bar-fill in-progress" style={{width: '45%'}}></div>
                </div>
                <span>In Progress (45%)</span>
              </div>
              <div className="status-item">
                <div className="status-bar">
                  <div className="bar-fill completed" style={{width: '30%'}}></div>
                </div>
                <span>Completed (30%)</span>
              </div>
              <div className="status-item">
                <div className="status-bar">
                  <div className="bar-fill design" style={{width: '15%'}}></div>
                </div>
                <span>Design Phase (15%)</span>
              </div>
              <div className="status-item">
                <div className="status-bar">
                  <div className="bar-fill hold" style={{width: '10%'}}></div>
                </div>
                <span>On Hold (10%)</span>
              </div>
            </div>
          </div>

          <div className="panel animate-fadeInRight delay-1">
            <h4>Top Performing Designers</h4>
            <div className="designer-rankings">
              {SAMPLE_DATA.designers.slice(0, 5).map((designer, index) => (
                <div key={designer.id} className="designer-rank-item">
                  <div className="rank-number">#{index + 1}</div>
                  <img src={designer.avatar} alt={designer.name} className="designer-avatar" />
                  <div className="designer-info">
                    <h5>{designer.name}</h5>
                    <div className="designer-stats">
                      <span>{designer.rating}⭐</span>
                      <span>{designer.projects} projects</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="recent-activity animate-fadeInUp delay-2">
        <div className="activity-header">
          <h4>Recent Activity</h4>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="activity-timeline">
          <div className="activity-item">
            <div className="activity-icon lead">📈</div>
            <div className="activity-content">
              <p><strong>New high-priority lead</strong> assigned to Priya Mehta</p>
              <span className="activity-time">2 minutes ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon project">🏗️</div>
            <div className="activity-content">
              <p><strong>Project #PR001</strong> moved to Installation phase</p>
              <span className="activity-time">1 hour ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon payment">💳</div>
            <div className="activity-content">
              <p><strong>Payment received</strong> from Sharma Family - ₹3.5L</p>
              <span className="activity-time">3 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon designer">🎨</div>
            <div className="activity-content">
              <p><strong>New designer</strong> Kavya Nair joined the platform</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Customers Management
function CustomersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const filteredCustomers = SAMPLE_DATA.customers
    .filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === 'All' || customer.status === filterStatus)
    )
    .sort((a, b) => {
      if (sortBy === 'totalSpent') return b.totalSpent - a.totalSpent;
      return a[sortBy].localeCompare(b[sortBy]);
    });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="management-section animate-fadeInUp">
      <div className="section-header">
        <div>
          <h3>Customer Management</h3>
          <p>Manage all customer accounts and relationships</p>
        </div>
        <button className="add-btn">+ Add Customer</button>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="VIP">VIP</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Sort by Name</option>
            <option value="totalSpent">Sort by Spending</option>
            <option value="registrationDate">Sort by Date</option>
          </select>
          <button className="export-btn">📊 Export</button>
        </div>
      </div>

      <div className="enhanced-table">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Projects</th>
              <th>Total Spent</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map(customer => (
              <tr key={customer.id} className="animate-fadeInUp">
                <td>
                  <div className="customer-info">
                    <div className="customer-avatar">{customer.name.charAt(0)}</div>
                    <div>
                      <h5>{customer.name}</h5>
                      <p>{customer.id}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <p>{customer.email}</p>
                    <p>{customer.phone}</p>
                  </div>
                </td>
                <td>{customer.location}</td>
                <td>
                  <span className="project-count">{customer.projects}</span>
                </td>
                <td>
                  <span className="spending-amount">₹{(customer.totalSpent / 100000).toFixed(1)}L</span>
                </td>
                <td>
                  <span className={`status ${customer.status.toLowerCase()}`}>
                    {customer.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view" title="View Details">👁️</button>
                    <button className="action-btn edit" title="Edit">✏️</button>
                    <button className="action-btn message" title="Message">💬</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// Projects Management Page
function ProjectsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const filteredProjects = SAMPLE_DATA.projects.filter(project => 
    project.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'All' || project.status === filterStatus)
  );

  return (
    <div className="dashboard-content">
      <div className="section-header">
        <div>
          <h2>Projects Management</h2>
          <p>Monitor and manage all interior design projects</p>
        </div>
        <button className="add-btn">+ New Project</button>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Design Phase">Design Phase</option>
            <option value="Completed">Completed</option>
            <option value="Procurement">Procurement</option>
            <option value="Installation">Installation</option>
          </select>
        </div>
      </div>

      <div className="enhanced-table">
        <table>
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Customer</th>
              <th>Designer</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Budget</th>
              <th>Spent</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map(project => (
              <tr key={project.id} className="animate-fadeInUp">
                <td><strong>{project.id}</strong></td>
                <td>{project.customerName}</td>
                <td>{project.designerName}</td>
                <td>
                  <span className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                </td>
                <td>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${project.progress}%`}}></div>
                    <span>{project.progress}%</span>
                  </div>
                </td>
                <td>₹{(project.budget / 100000).toFixed(1)}L</td>
                <td>₹{(project.spent / 100000).toFixed(1)}L</td>
                <td>{project.location}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view" title="View Details">👁️</button>
                    <button className="action-btn edit" title="Edit">✏️</button>
                    <button className="action-btn message" title="Message">💬</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Leads Management Page
function LeadsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  
  const filteredLeads = SAMPLE_DATA.leads.filter(lead => 
    lead.customer.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'All' || lead.status === filterStatus) &&
    (filterPriority === 'All' || lead.priority === filterPriority)
  );

  return (
    <div className="dashboard-content">
      <div className="section-header">
        <div>
          <h2>Leads Management</h2>
          <p>Track and manage potential customer leads</p>
        </div>
        <button className="add-btn">+ New Lead</button>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Assigned">Assigned</option>
            <option value="In Discussion">In Discussion</option>
          </select>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="enhanced-table">
        <table>
          <thead>
            <tr>
              <th>Lead ID</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Budget</th>
              <th>Location</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map(lead => (
              <tr key={lead.id} className="animate-fadeInUp">
                <td><strong>{lead.id}</strong></td>
                <td>{lead.customer}</td>
                <td>{lead.phone}</td>
                <td>₹{lead.budget}</td>
                <td>{lead.location}</td>
                <td>
                  <span className={`priority ${lead.priority.toLowerCase()}`}>
                    {lead.priority}
                  </span>
                </td>
                <td>
                  <span className={`status ${lead.status.toLowerCase().replace(' ', '-')}`}>
                    {lead.status}
                  </span>
                </td>
                <td>{lead.assignedTo || 'Unassigned'}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn assign" title="Assign">👨‍💼</button>
                    <button className="action-btn call" title="Call">📞</button>
                    <button className="action-btn convert" title="Convert">💼</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Designers Management Page
function DesignersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const filteredDesigners = SAMPLE_DATA.designers.filter(designer => 
    designer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'All' || designer.status === filterStatus)
  );

  return (
    <div className="dashboard-content">
      <div className="section-header">
        <div>
          <h2>Designers Management</h2>
          <p>Manage interior designers and their performance</p>
        </div>
        <button className="add-btn">+ Add Designer</button>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search designers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="enhanced-table">
        <table>
          <thead>
            <tr>
              <th>Designer</th>
              <th>Contact</th>
              <th>Experience</th>
              <th>Specialization</th>
              <th>Rating</th>
              <th>Projects</th>
              <th>Wallet Balance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDesigners.map(designer => (
              <tr key={designer.id} className="animate-fadeInUp">
                <td>
                  <div className="designer-info">
                    <img src={designer.avatar} alt={designer.name} className="designer-avatar" />
                    <div>
                      <h5>{designer.name}</h5>
                      <p>{designer.id}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <p>{designer.phone}</p>
                    <p>{designer.location}</p>
                  </div>
                </td>
                <td>{designer.experience} years</td>
                <td>{designer.specialization}</td>
                <td>
                  <div className="rating">
                    <span>{designer.rating}⭐</span>
                  </div>
                </td>
                <td>
                  <div className="project-stats">
                    <span className="active-projects">{designer.projects} active</span>
                    <span className="completed-projects">{designer.completedProjects} completed</span>
                  </div>
                </td>
                <td>₹{(designer.walletBalance / 1000).toFixed(0)}K</td>
                <td>
                  <span className={`status ${designer.status.toLowerCase()}`}>
                    {designer.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view" title="View Portfolio">👁️</button>
                    <button className="action-btn edit" title="Edit">✏️</button>
                    <button className="action-btn wallet" title="Wallet">💰</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Reports Management Page
function ReportsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Sample reports data based on the projects and customers data
  const reportsData = [
    {
      id: 'RPT001',
      name: 'Monthly Revenue Report',
      type: 'Financial',
      generatedDate: '2024-01-15',
      status: 'Ready',
      size: '2.3 MB',
      requestedBy: 'Admin',
      description: 'Comprehensive monthly revenue analysis'
    },
    {
      id: 'RPT002',
      name: 'Project Progress Summary',
      type: 'Project',
      generatedDate: '2024-01-14',
      status: 'Ready',
      size: '1.8 MB',
      requestedBy: 'PM Manager',
      description: 'All active projects status and progress'
    },
    {
      id: 'RPT003',
      name: 'Customer Satisfaction Survey',
      type: 'Customer',
      generatedDate: '2024-01-12',
      status: 'Generating',
      size: '-',
      requestedBy: 'Admin',
      description: 'Customer feedback and satisfaction metrics'
    },
    {
      id: 'RPT004',
      name: 'Designer Performance Analytics',
      type: 'HR',
      generatedDate: '2024-01-10',
      status: 'Ready',
      size: '3.1 MB',
      requestedBy: 'HR Manager',
      description: 'Designer productivity and performance metrics'
    },
    {
      id: 'RPT005',
      name: 'Material Cost Analysis',
      type: 'Procurement',
      generatedDate: '2024-01-08',
      status: 'Ready',
      size: '1.5 MB',
      requestedBy: 'Procurement',
      description: 'Material costs and supplier analysis'
    },
    {
      id: 'RPT006',
      name: 'Lead Conversion Report',
      type: 'Sales',
      generatedDate: '2024-01-05',
      status: 'Failed',
      size: '-',
      requestedBy: 'Sales Manager',
      description: 'Lead generation and conversion statistics'
    }
  ];

  const filteredReports = reportsData.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'All' || report.type === filterType) &&
    (filterStatus === 'All' || report.status === filterStatus)
  );

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Ready': 'status-completed',
      'Generating': 'status-progress',
      'Failed': 'status-cancelled'
    };
    return statusStyles[status] || 'status-pending';
  };

  return (
    <div className="dashboard-content">
      <div className="section-header">
        <div>
          <h2>Reports Management</h2>
          <p>Generate, view and download business reports</p>
        </div>
        <button className="add-btn">+ Generate Report</button>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="All">All Types</option>
            <option value="Financial">Financial</option>
            <option value="Project">Project</option>
            <option value="Customer">Customer</option>
            <option value="HR">HR</option>
            <option value="Procurement">Procurement</option>
            <option value="Sales">Sales</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Ready">Ready</option>
            <option value="Generating">Generating</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="enhanced-table">
        <table>
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Report Name</th>
              <th>Type</th>
              <th>Generated Date</th>
              <th>Status</th>
              <th>Size</th>
              <th>Requested By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map(report => (
              <tr key={report.id}>
                <td className="font-mono">{report.id}</td>
                <td>
                  <div>
                    <strong>{report.name}</strong>
                    <div className="text-gray">{report.description}</div>
                  </div>
                </td>
                <td>
                  <span className="type-badge">{report.type}</span>
                </td>
                <td>{report.generatedDate}</td>
                <td>
                  <span className={`status-badge ${getStatusBadge(report.status)}`}>
                    {report.status}
                  </span>
                </td>
                <td>{report.size}</td>
                <td>{report.requestedBy}</td>
                <td>
                  <div className="action-buttons">
                    {report.status === 'Ready' && (
                      <>
                        <button className="btn-view" title="View Report">👁️</button>
                        <button className="btn-download" title="Download">⬇️</button>
                      </>
                    )}
                    {report.status === 'Generating' && (
                      <button className="btn-cancel" title="Cancel">❌</button>
                    )}
                    {report.status === 'Failed' && (
                      <button className="btn-retry" title="Retry">🔄</button>
                    )}
                    <button className="btn-delete" title="Delete">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="results-info">
          Showing {filteredReports.length} of {reportsData.length} reports
        </div>
        <div className="pagination">
          <button disabled>Previous</button>
          <span>Page 1 of 1</span>
          <button disabled>Next</button>
        </div>
      </div>
    </div>
  );
}

// Project Manager Dashboard Component
function PMDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <PMDashboardContent />;
      case 'projects':
        return <ProjectsManagement />;
      case 'timeline':
        return <ProjectTimeline />;
      case 'resources':
        return <ResourceManagement />;
      case 'reports':
        return <PMReports />;
      default:
        return <PMDashboardContent />;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h2>Project Manager Dashboard</h2>
          <p>Welcome back, {user.name}</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <img src={user.avatar} alt={user.name} className="avatar" />
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.title}</span>
            </div>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
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
              className={activeTab === 'projects' ? 'active' : ''}
              onClick={() => setActiveTab('projects')}
            >
              🏗️ Projects
            </button>
            <button 
              className={activeTab === 'timeline' ? 'active' : ''}
              onClick={() => setActiveTab('timeline')}
            >
              📅 Timeline
            </button>
            <button 
              className={activeTab === 'resources' ? 'active' : ''}
              onClick={() => setActiveTab('resources')}
            >
              👥 Resources
            </button>
            <button 
              className={activeTab === 'reports' ? 'active' : ''}
              onClick={() => setActiveTab('reports')}
            >
              📋 Reports
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

function PMDashboardContent() {
  return (
    <div className="dashboard-content">
      <div className="kpi-cards">
        <div className="kpi-card animate-slideInUp">
          <div className="kpi-icon">🏗️</div>
          <div className="kpi-details">
            <h3>12</h3>
            <p>Active Projects</p>
            <span className="trend up">+2 this week</span>
          </div>
        </div>
        <div className="kpi-card animate-slideInUp delay-1">
          <div className="kpi-icon">✅</div>
          <div className="kpi-details">
            <h3>8</h3>
            <p>Completed This Month</p>
            <span className="trend up">+15% from last month</span>
          </div>
        </div>
        <div className="kpi-card animate-slideInUp delay-2">
          <div className="kpi-icon">👥</div>
          <div className="kpi-details">
            <h3>25</h3>
            <p>Team Members</p>
            <span className="trend neutral">Stable</span>
          </div>
        </div>
        <div className="kpi-card animate-slideInUp delay-3">
          <div className="kpi-icon">⏰</div>
          <div className="kpi-details">
            <h3>92%</h3>
            <p>On-Time Delivery</p>
            <span className="trend up">+5% this quarter</span>
          </div>
        </div>
      </div>

      <div className="pm-main-content">
        <h3>My Projects Overview</h3>
        <div className="projects-overview">
          {SAMPLE_DATA.projects.slice(0, 6).map(project => (
            <div key={project.id} className="project-card animate-fadeInUp">
              <div className="project-header">
                <h4>{project.id}</h4>
                <span className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              </div>
              <p><strong>Customer:</strong> {project.customerName}</p>
              <p><strong>Designer:</strong> {project.designerName}</p>
              <p><strong>Location:</strong> {project.location}</p>
              <div className="progress-section">
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: `${project.progress}%`}}></div>
                </div>
                <span>{project.progress}% Complete</span>
              </div>
              <div className="project-budget">
                <span>Budget: ₹{(project.budget / 100000).toFixed(1)}L</span>
                <span>Spent: ₹{(project.spent / 100000).toFixed(1)}L</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectTimeline() {
  return (
    <div className="dashboard-content">
      <h2>Project Timeline</h2>
      <p>Track project milestones and deadlines</p>
      <div className="timeline-placeholder">
        <p>Timeline view will be implemented here</p>
      </div>
    </div>
  );
}

function ResourceManagement() {
  return (
    <div className="dashboard-content">
      <h2>Resource Management</h2>
      <p>Manage team resources and allocations</p>
      <div className="resource-placeholder">
        <p>Resource management tools will be implemented here</p>
      </div>
    </div>
  );
}

function PMReports() {
  return (
    <div className="dashboard-content">
      <h2>PM Reports</h2>
      <p>Project manager specific reports and analytics</p>
      <div className="reports-placeholder">
        <p>PM reports will be implemented here</p>
      </div>
    </div>
  );
}

// Customer Portal Component
function CustomerPortal() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <CustomerDashboardContent />;
      case 'projects':
        return <CustomerProjects />;
      case 'payments':
        return <CustomerPayments />;
      case 'support':
        return <CustomerSupport />;
      default:
        return <CustomerDashboardContent />;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h2>Customer Portal</h2>
          <p>Welcome back, {user.name}</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <img src={user.avatar} alt={user.name} className="avatar" />
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.title}</span>
            </div>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
      </div>

      <div className="dashboard-layout">
        <div className="sidebar">
          <nav className="nav-menu">
            <button 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              🏠 Dashboard
            </button>
            <button 
              className={activeTab === 'projects' ? 'active' : ''}
              onClick={() => setActiveTab('projects')}
            >
              🏗️ My Projects
            </button>
            <button 
              className={activeTab === 'payments' ? 'active' : ''}
              onClick={() => setActiveTab('payments')}
            >
              💳 Payments
            </button>
            <button 
              className={activeTab === 'support' ? 'active' : ''}
              onClick={() => setActiveTab('support')}
            >
              🎧 Support
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

function CustomerDashboardContent() {
  return (
    <div className="dashboard-content">
      <h2>My Project Overview</h2>
      <div className="customer-projects">
        {SAMPLE_DATA.projects.filter(p => p.customerName === 'Sharma Family').map(project => (
          <div key={project.id} className="customer-project-card">
            <h3>{project.id} - Interior Design</h3>
            <p><strong>Designer:</strong> {project.designerName}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${project.progress}%`}}></div>
              <span>{project.progress}% Complete</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomerProjects() {
  return (
    <div className="dashboard-content">
      <h2>My Projects</h2>
      <p>View detailed information about your interior design projects</p>
    </div>
  );
}

function CustomerPayments() {
  return (
    <div className="dashboard-content">
      <h2>Payment History</h2>
      <p>View your payment history and make new payments</p>
    </div>
  );
}

function CustomerSupport() {
  return (
    <div className="dashboard-content">
      <h2>Customer Support</h2>
      <p>Get help and support for your projects</p>
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
        return <DesignerDashboardContent />;
      case 'leads':
        return <DesignerLeads />;
      case 'projects':
        return <DesignerProjects />;
      case 'portfolio':
        return <DesignerPortfolio />;
      case 'wallet':
        return <DesignerWallet />;
      default:
        return <DesignerDashboardContent />;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h2>Designer Portal</h2>
          <p>Welcome back, {user.name}</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <img src={user.avatar} alt={user.name} className="avatar" />
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.title}</span>
            </div>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
      </div>

      <div className="dashboard-layout">
        <div className="sidebar">
          <nav className="nav-menu">
            <button 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              🎨 Dashboard
            </button>
            <button 
              className={activeTab === 'leads' ? 'active' : ''}
              onClick={() => setActiveTab('leads')}
            >
              📈 Leads
            </button>
            <button 
              className={activeTab === 'projects' ? 'active' : ''}
              onClick={() => setActiveTab('projects')}
            >
              🏗️ Projects
            </button>
            <button 
              className={activeTab === 'portfolio' ? 'active' : ''}
              onClick={() => setActiveTab('portfolio')}
            >
              📂 Portfolio
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

function DesignerDashboardContent() {
  return (
    <div className="dashboard-content">
      <h2>Designer Dashboard</h2>
      <div className="designer-stats">
        <div className="stat-card">
          <h3>5</h3>
          <p>Active Projects</p>
        </div>
        <div className="stat-card">
          <h3>12</h3>
          <p>New Leads</p>
        </div>
        <div className="stat-card">
          <h3>₹85K</h3>
          <p>This Month Earnings</p>
        </div>
        <div className="stat-card">
          <h3>4.8⭐</h3>
          <p>Rating</p>
        </div>
      </div>
    </div>
  );
}

function DesignerLeads() {
  return (
    <div className="dashboard-content">
      <h2>My Leads</h2>
      <p>Manage your leads and convert them to projects</p>
    </div>
  );
}

function DesignerProjects() {
  return (
    <div className="dashboard-content">
      <h2>My Projects</h2>
      <p>Track your current design projects</p>
    </div>
  );
}

function DesignerPortfolio() {
  return (
    <div className="dashboard-content">
      <h2>My Portfolio</h2>
      <p>Showcase your design work and achievements</p>
    </div>
  );
}

function DesignerWallet() {
  return (
    <div className="dashboard-content">
      <h2>Digital Wallet</h2>
      <p>Manage your earnings and payments</p>
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
        return <ProcurementDashboardContent />;
      case 'inventory':
        return <InventoryManagement />;
      case 'vendors':
        return <VendorManagement />;
      case 'orders':
        return <OrderManagement />;
      default:
        return <ProcurementDashboardContent />;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h2>Procurement Portal</h2>
          <p>Welcome back, {user.name}</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <img src={user.avatar} alt={user.name} className="avatar" />
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.title}</span>
            </div>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
      </div>

      <div className="dashboard-layout">
        <div className="sidebar">
          <nav className="nav-menu">
            <button 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              📦 Dashboard
            </button>
            <button 
              className={activeTab === 'inventory' ? 'active' : ''}
              onClick={() => setActiveTab('inventory')}
            >
              📋 Inventory
            </button>
            <button 
              className={activeTab === 'vendors' ? 'active' : ''}
              onClick={() => setActiveTab('vendors')}
            >
              🏢 Vendors
            </button>
            <button 
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              🛒 Orders
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

function ProcurementDashboardContent() {
  return (
    <div className="dashboard-content">
      <h2>Procurement Overview</h2>
      <div className="procurement-stats">
        <div className="stat-card">
          <h3>150</h3>
          <p>Active Items</p>
        </div>
        <div className="stat-card">
          <h3>25</h3>
          <p>Pending Orders</p>
        </div>
        <div className="stat-card">
          <h3>12</h3>
          <p>Vendors</p>
        </div>
        <div className="stat-card">
          <h3>₹2.5L</h3>
          <p>Monthly Spend</p>
        </div>
      </div>
    </div>
  );
}

function InventoryManagement() {
  return (
    <div className="dashboard-content">
      <h2>Inventory Management</h2>
      <p>Manage materials and inventory levels</p>
    </div>
  );
}

function VendorManagement() {
  return (
    <div className="dashboard-content">
      <h2>Vendor Management</h2>
      <p>Manage suppliers and vendor relationships</p>
    </div>
  );
}

function OrderManagement() {
  return (
    <div className="dashboard-content">
      <h2>Order Management</h2>
      <p>Track and manage material orders</p>
    </div>
  );
}

// Main App Component (Enhanced)
function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-animation">
          <div className="loading-spinner"></div>
          <h2>Loading Gharinto...</h2>
          <p>Preparing your interior design experience</p>
        </div>
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

// Include all the other dashboard components with similar enhancements...
// PMDashboard, CustomerPortal, DesignerPortal, ProcurementPortal components...

// Root App with Auth Provider
function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithAuth;