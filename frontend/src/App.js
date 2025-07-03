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

// Enhanced Sample Data with Premium Images
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
  ],

  // New high-quality portfolio items with our curated images
  portfolioItems: [
    { 
      id: 'PORT001', 
      title: 'Luxury Living Room', 
      category: 'Living Room', 
      image: 'https://images.unsplash.com/photo-1572525621554-9013384b1d36',
      description: 'Modern luxury living room with blue accents and contemporary furniture',
      location: 'Mumbai',
      area: '450 sq ft',
      budget: '₹3.5L',
      designer: 'Priya Mehta'
    },
    { 
      id: 'PORT002', 
      title: 'Sophisticated City View Living', 
      category: 'Living Room', 
      image: 'https://images.unsplash.com/photo-1721301856929-1f983c06bae7',
      description: 'Elegant living space with panoramic city views and minimalist design',
      location: 'Delhi',
      area: '600 sq ft',
      budget: '₹4.2L',
      designer: 'Anita Sharma'
    },
    { 
      id: 'PORT003', 
      title: 'Contemporary Kitchen Design', 
      category: 'Kitchen', 
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
      description: 'Spacious white kitchen with modern appliances and functional island',
      location: 'Bangalore',
      area: '200 sq ft',
      budget: '₹2.8L',
      designer: 'Rohit Desai'
    },
    { 
      id: 'PORT004', 
      title: 'Minimalist Bedroom Retreat', 
      category: 'Bedroom', 
      image: 'https://images.unsplash.com/photo-1633944095397-878622ebc01c',
      description: 'Serene bedroom with clean lines and neutral color palette',
      location: 'Chennai',
      area: '300 sq ft',
      budget: '₹2.2L',
      designer: 'Kavya Nair'
    },
    { 
      id: 'PORT005', 
      title: 'Elegant Bedroom Suite', 
      category: 'Bedroom', 
      image: 'https://images.unsplash.com/photo-1631048501851-4aa85ffc3be8',
      description: 'Luxurious bedroom with sophisticated neutral tones and premium finishes',
      location: 'Pune',
      area: '350 sq ft',
      budget: '₹3.1L',
      designer: 'Suresh Gupta'
    },
    { 
      id: 'PORT006', 
      title: 'Modern Home Interior', 
      category: 'Living Room', 
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      description: 'Bright and airy living space with stylish furniture and natural light',
      location: 'Hyderabad',
      area: '500 sq ft',
      budget: '₹3.8L',
      designer: 'Priya Mehta'
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
      {/* Enhanced Header with Glass Effect */}
      <header className="header glass-morphism">
        <div className="container">
          <div className="nav">
            <div className="logo">
              <div className="logo-icon">🏠</div>
              <div className="logo-text">
                <h2>Gharinto</h2>
                <span className="tagline">Interior Excellence</span>
              </div>
            </div>
            
            <nav className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <button 
                className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
              >
                Home
              </button>
              <button 
                className={`nav-item ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }}
              >
                About
              </button>
              <button 
                className={`nav-item ${currentPage === 'services' ? 'active' : ''}`}
                onClick={() => { setCurrentPage('services'); setMobileMenuOpen(false); }}
              >
                Services
              </button>
              <button 
                className={`nav-item ${currentPage === 'portfolio' ? 'active' : ''}`}
                onClick={() => { setCurrentPage('portfolio'); setMobileMenuOpen(false); }}
              >
                Portfolio
              </button>
              <button 
                className={`nav-item ${currentPage === 'contact' ? 'active' : ''}`}
                onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}
              >
                Contact
              </button>
            </nav>

            <div className="header-actions">
              <button 
                className="login-btn gradient-btn"
                onClick={() => setShowLogin(true)}
              >
                <span>Login</span>
                <div className="btn-glow"></div>
              </button>
              <button 
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span></span>
                <span></span>
                <span></span>
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
              <div className="footer-logo">
                <div className="logo-icon">🏠</div>
                <h3>Gharinto</h3>
              </div>
              <p>Transforming spaces with innovative interior design solutions. Your dream home is just a click away.</p>
              <div className="social-links">
                <a href="#" className="social-btn facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-btn instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-btn twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-btn linkedin">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><button onClick={() => setCurrentPage('home')}>Home</button></li>
                <li><button onClick={() => setCurrentPage('about')}>About Us</button></li>
                <li><button onClick={() => setCurrentPage('services')}>Services</button></li>
                <li><button onClick={() => setCurrentPage('portfolio')}>Portfolio</button></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li>Residential Design</li>
                <li>Commercial Spaces</li>
                <li>Kitchen & Bathroom</li>
                <li>Project Management</li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact Info</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>info@gharinto.com</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>+91-9876543210</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Mumbai, Maharashtra</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-clock"></i>
                  <span>Mon-Sat: 9AM-7PM</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; 2024 Gharinto. All rights reserved.</p>
              <div className="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}

// Enhanced Home Page Component
function HomePage({ setShowLogin }) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Homeowner",
      location: "Mumbai",
      rating: 5,
      text: "Gharinto transformed our home beyond our expectations. The process was smooth, transparent, and the final result was absolutely stunning!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Meera Patel",
      role: "Interior Designer",
      location: "Delhi",
      rating: 5,
      text: "The designer portal helped me grow my business by 300%. The lead management and digital wallet features are game-changers!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b2a90000?w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Amit Kumar",
      role: "Project Manager",
      location: "Bangalore",
      rating: 5,
      text: "As a project manager, Gharinto's tools have made my job so much easier. Everything is organized and client communication is seamless.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Enhanced Hero Section */}
      <section className="hero" id="hero" data-animate>
        <div className="hero-background">
          <div className="hero-bg-image">
            <img src="https://images.unsplash.com/photo-1572525621554-9013384b1d36" alt="Luxury Interior" />
            <div className="hero-overlay"></div>
          </div>
          <div className="floating-elements">
            <div className="floating-element element-1"></div>
            <div className="floating-element element-2"></div>
            <div className="floating-element element-3"></div>
          </div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <div className={`hero-text ${isVisible.hero ? 'animate-in' : ''}`}>
              <h1 className="hero-title">
                Transform Your Space with 
                <span className="gradient-text"> Gharinto</span>
              </h1>
              <p className="hero-subtitle">
                The complete interior design platform connecting builders, designers, customers, and suppliers for seamless project execution.
              </p>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Projects Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Happy Customers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Expert Designers</div>
                </div>
              </div>
              
              <div className="hero-actions">
                <button 
                  className="cta-primary gradient-btn"
                  onClick={() => setShowLogin(true)}
                >
                  <span>Get Started Today</span>
                  <div className="btn-glow"></div>
                </button>
                <button className="cta-secondary">
                  <span>Watch Demo</span>
                  <i className="fas fa-play"></i>
                </button>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="hero-cards">
                <div className="floating-card card-1">
                  <div className="card-icon">🎨</div>
                  <div className="card-content">
                    <h4>Professional Design</h4>
                    <p>Expert interior solutions</p>
                  </div>
                </div>
                <div className="floating-card card-2">
                  <div className="card-icon">📊</div>
                  <div className="card-content">
                    <h4>Project Management</h4>
                    <p>Seamless execution</p>
                  </div>
                </div>
                <div className="floating-card card-3">
                  <div className="card-icon">⚡</div>
                  <div className="card-content">
                    <h4>Fast Delivery</h4>
                    <p>On-time completion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="features modern-section" id="features" data-animate>
        <div className="container">
          <div className={`section-header ${isVisible.features ? 'animate-in' : ''}`}>
            <h2 className="section-title">Complete Interior Design Ecosystem</h2>
            <p className="section-subtitle">Everything you need for your dream interior in one platform</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card premium-card">
              <div className="card-header">
                <div className="feature-icon customers">
                  <i className="fas fa-users"></i>
                </div>
                <h3>For Customers</h3>
              </div>
              <p className="card-description">
                Track your project progress, view designs, make payments, and communicate with your team seamlessly.
              </p>
              <ul className="feature-list">
                <li><i className="fas fa-check"></i> Real-time project tracking</li>
                <li><i className="fas fa-check"></i> 3D design visualization</li>
                <li><i className="fas fa-check"></i> Secure payment gateway</li>
                <li><i className="fas fa-check"></i> Direct team communication</li>
              </ul>
              <button className="feature-btn">
                <span>Learn More</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            
            <div className="feature-card premium-card">
              <div className="card-header">
                <div className="feature-icon designers">
                  <i className="fas fa-paint-brush"></i>
                </div>
                <h3>For Designers</h3>
              </div>
              <p className="card-description">
                Manage leads, create BOQs, track projects, and grow your business with our designer portal.
              </p>
              <ul className="feature-list">
                <li><i className="fas fa-check"></i> Lead management system</li>
                <li><i className="fas fa-check"></i> Digital wallet & payments</li>
                <li><i className="fas fa-check"></i> BOQ builder tools</li>
                <li><i className="fas fa-check"></i> Portfolio showcase</li>
              </ul>
              <button className="feature-btn">
                <span>Join Network</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            
            <div className="feature-card premium-card">
              <div className="card-header">
                <div className="feature-icon managers">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>For Managers</h3>
              </div>
              <p className="card-description">
                Monitor projects, manage teams, track progress, and ensure timely delivery with powerful tools.
              </p>
              <ul className="feature-list">
                <li><i className="fas fa-check"></i> Project management dashboard</li>
                <li><i className="fas fa-check"></i> Team coordination tools</li>
                <li><i className="fas fa-check"></i> Progress monitoring</li>
                <li><i className="fas fa-check"></i> Resource allocation</li>
              </ul>
              <button className="feature-btn">
                <span>Explore Tools</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            
            <div className="feature-card premium-card">
              <div className="card-header">
                <div className="feature-icon procurement">
                  <i className="fas fa-boxes"></i>
                </div>
                <h3>For Procurement</h3>
              </div>
              <p className="card-description">
                Manage inventory, track vendors, handle logistics, and streamline material procurement.
              </p>
              <ul className="feature-list">
                <li><i className="fas fa-check"></i> Inventory management</li>
                <li><i className="fas fa-check"></i> Vendor network</li>
                <li><i className="fas fa-check"></i> Order tracking</li>
                <li><i className="fas fa-check"></i> Quality assurance</li>
              </ul>
              <button className="feature-btn">
                <span>Get Started</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Portfolio Preview */}
      <section className="portfolio-preview modern-section" id="portfolio" data-animate>
        <div className="container">
          <div className={`section-header ${isVisible.portfolio ? 'animate-in' : ''}`}>
            <h2 className="section-title">Our Recent Works</h2>
            <p className="section-subtitle">Discover stunning transformations by our expert designers</p>
          </div>
          
          <div className="portfolio-grid">
            {SAMPLE_DATA.portfolioItems.slice(0, 6).map((item, index) => (
              <div key={item.id} className="portfolio-item premium-card">
                <div className="portfolio-image">
                  <img src={item.image} alt={item.title} />
                  <div className="portfolio-overlay">
                    <div className="portfolio-info">
                      <h4>{item.title}</h4>
                      <p className="portfolio-category">{item.category}</p>
                      <p className="portfolio-location">{item.location}</p>
                      <div className="portfolio-details">
                        <span className="portfolio-area">{item.area}</span>
                        <span className="portfolio-budget">{item.budget}</span>
                      </div>
                    </div>
                    <button className="view-btn">
                      <i className="fas fa-eye"></i>
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
                <div className="portfolio-content">
                  <div className="portfolio-designer">
                    <i className="fas fa-user-tie"></i>
                    <span>by {item.designer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button className="cta-secondary">
              <span>View Full Portfolio</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="testimonials modern-section" id="testimonials" data-animate>
        <div className="container">
          <div className={`section-header ${isVisible.testimonials ? 'animate-in' : ''}`}>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">Real stories from satisfied customers</p>
          </div>
          
          <div className="testimonial-carousel">
            <div className="testimonial-container">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`testimonial-slide ${index === currentTestimonial ? 'active' : ''}`}
                >
                  <div className="testimonial-content">
                    <div className="testimonial-header">
                      <div className="testimonial-avatar">
                        <img src={testimonial.image} alt={testimonial.name} />
                      </div>
                      <div className="testimonial-info">
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.role}</p>
                        <span className="testimonial-location">{testimonial.location}</span>
                      </div>
                    </div>
                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <p className="testimonial-text">"{testimonial.text}"</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="testimonial-controls">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process modern-section" id="process" data-animate>
        <div className="container">
          <div className={`section-header ${isVisible.process ? 'animate-in' : ''}`}>
            <h2 className="section-title">Our Design Process</h2>
            <p className="section-subtitle">From concept to completion, we ensure every detail is perfect</p>
          </div>
          
          <div className="process-timeline">
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Consultation</h3>
                <p>We start with understanding your vision, requirements, and budget to create a personalized design plan.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Design & Planning</h3>
                <p>Our expert designers create detailed 3D visualizations and comprehensive project plans.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Material Selection</h3>
                <p>Choose from our curated collection of premium materials and furnishings that match your style.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3>Execution</h3>
                <p>Our skilled craftsmen bring your design to life with precision and attention to detail.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">05</div>
              <div className="step-content">
                <h3>Handover</h3>
                <p>Final quality checks and walkthrough to ensure your complete satisfaction with the transformation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section modern-section" id="cta" data-animate>
        <div className="cta-background">
          <div className="cta-pattern"></div>
        </div>
        <div className="container">
          <div className={`cta-content ${isVisible.cta ? 'animate-in' : ''}`}>
            <h2>Ready to Transform Your Space?</h2>
            <p>Join thousands of satisfied customers who chose Gharinto for their interior design needs</p>
            <div className="cta-buttons">
              <button 
                className="cta-primary gradient-btn"
                onClick={() => setShowLogin(true)}
              >
                <span>Start Your Project</span>
                <div className="btn-glow"></div>
              </button>
              <button className="cta-secondary">
                <span>Schedule Consultation</span>
                <i className="fas fa-calendar-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Enhanced About Page Component
function AboutPage() {
  return (
    <div className="page-content">
      <section className="page-hero about-hero">
        <div className="hero-background">
          <img src="https://images.pexels.com/photos/5922204/pexels-photo-5922204.jpeg" alt="About Us" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="animate-fadeInUp">About Gharinto</h1>
            <p className="animate-fadeInUp delay-1">Revolutionizing interior design with technology and expertise</p>
          </div>
        </div>
      </section>

      <section className="about-story modern-section">
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
                <div className="achievement">
                  <h3>98%</h3>
                  <p>Satisfaction Rate</p>
                </div>
              </div>
            </div>
            <div className="story-image animate-fadeInRight">
              <img src="https://images.unsplash.com/photo-1716703373020-17ff360924ee" alt="Our Team" />
            </div>
          </div>
        </div>
      </section>

      <section className="team-section modern-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">The creative minds behind Gharinto's success</p>
          </div>
          <div className="team-grid">
            {SAMPLE_DATA.teamMembers.map((member, index) => (
              <div key={index} className={`team-card premium-card animate-fadeInUp delay-${index + 1}`}>
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                  <div className="team-overlay">
                    <div className="social-links">
                      <a href="#" className="social-link">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="#" className="social-link">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="team-content">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="values-section modern-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">What drives us to deliver excellence</p>
          </div>
          <div className="values-grid">
            <div className="value-card premium-card">
              <div className="value-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovation</h3>
              <p>We continuously innovate to provide cutting-edge design solutions and seamless user experiences.</p>
            </div>
            <div className="value-card premium-card">
              <div className="value-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3>Quality</h3>
              <p>We maintain the highest standards in design, materials, and execution to exceed client expectations.</p>
            </div>
            <div className="value-card premium-card">
              <div className="value-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Trust</h3>
              <p>Building long-term relationships through transparency, reliability, and honest communication.</p>
            </div>
            <div className="value-card premium-card">
              <div className="value-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Collaboration</h3>
              <p>Working together with clients, designers, and partners to create extraordinary spaces.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Enhanced Services Page Component
function ServicesPage() {
  return (
    <div className="page-content">
      <section className="page-hero services-hero">
        <div className="hero-background">
          <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" alt="Our Services" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="animate-fadeInUp">Our Services</h1>
            <p className="animate-fadeInUp delay-1">Comprehensive interior design solutions for every need</p>
          </div>
        </div>
      </section>

      <section className="services-detailed modern-section">
        <div className="container">
          {SAMPLE_DATA.services.map((service, index) => (
            <div key={index} className={`service-detail ${index % 2 === 1 ? 'reverse' : ''} animate-fadeInUp delay-${index + 1}`}>
              <div className="service-image">
                <img src={service.image} alt={service.name} />
                <div className="service-overlay">
                  <div className="service-badge">
                    <i className="fas fa-star"></i>
                    <span>Premium</span>
                  </div>
                </div>
              </div>
              <div className="service-content">
                <h2>{service.name}</h2>
                <p className="service-description">{service.description}</p>
                <ul className="features-list">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <i className="fas fa-check"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="service-footer">
                  <div className="service-price">{service.price}</div>
                  <button className="service-btn gradient-btn">
                    <span>Get Quote</span>
                    <div className="btn-glow"></div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="process-section modern-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Service Process</h2>
            <p className="section-subtitle">How we deliver exceptional results</p>
          </div>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-icon">
                <i className="fas fa-comments"></i>
              </div>
              <h3>Initial Consultation</h3>
              <p>We discuss your vision, requirements, and budget to understand your needs completely.</p>
            </div>
            
            <div className="process-step">
              <div className="step-icon">
                <i className="fas fa-pencil-ruler"></i>
              </div>
              <h3>Design Development</h3>
              <p>Our designers create detailed plans and 3D visualizations of your space.</p>
            </div>
            
            <div className="process-step">
              <div className="step-icon">
                <i className="fas fa-clipboard-check"></i>
              </div>
              <h3>Approval & Planning</h3>
              <p>Review and approve designs, then we create detailed project timelines and budgets.</p>
            </div>
            
            <div className="process-step">
              <div className="step-icon">
                <i className="fas fa-tools"></i>
              </div>
              <h3>Implementation</h3>
              <p>Our skilled craftsmen execute the design with precision and attention to detail.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Enhanced Portfolio Page Component
function PortfolioPage() {
  const categories = ['All', 'Living Room', 'Kitchen', 'Bedroom', 'Bathroom', 'Office'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = activeCategory === 'All' 
    ? SAMPLE_DATA.portfolioItems 
    : SAMPLE_DATA.portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="page-content">
      <section className="page-hero portfolio-hero">
        <div className="hero-background">
          <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7" alt="Our Portfolio" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="animate-fadeInUp">Our Portfolio</h1>
            <p className="animate-fadeInUp delay-1">Explore our stunning interior design transformations</p>
          </div>
        </div>
      </section>

      <section className="portfolio-section modern-section">
        <div className="container">
          <div className="portfolio-filters animate-fadeInUp">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`portfolio-item premium-card animate-fadeInUp delay-${index + 1}`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="portfolio-image">
                  <img src={item.image} alt={item.title} />
                  <div className="portfolio-overlay">
                    <div className="portfolio-info">
                      <h4>{item.title}</h4>
                      <p className="portfolio-category">{item.category}</p>
                      <p className="portfolio-location">{item.location}</p>
                    </div>
                    <button className="view-btn">
                      <i className="fas fa-expand"></i>
                    </button>
                  </div>
                </div>
                <div className="portfolio-content">
                  <div className="portfolio-details">
                    <div className="portfolio-info">
                      <h4>{item.title}</h4>
                      <p className="portfolio-meta">{item.area} • {item.budget}</p>
                    </div>
                    <div className="portfolio-designer">
                      <i className="fas fa-user-tie"></i>
                      <span>{item.designer}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="portfolio-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-content">
              <div className="modal-image">
                <img src={selectedItem.image} alt={selectedItem.title} />
              </div>
              <div className="modal-info">
                <h3>{selectedItem.title}</h3>
                <p className="modal-category">{selectedItem.category}</p>
                <p className="modal-description">{selectedItem.description}</p>
                <div className="modal-details">
                  <div className="detail-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{selectedItem.location}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-ruler"></i>
                    <span>{selectedItem.area}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-dollar-sign"></i>
                    <span>{selectedItem.budget}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-user-tie"></i>
                    <span>{selectedItem.designer}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Contact Page Component
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="page-content">
      <section className="page-hero contact-hero">
        <div className="hero-background">
          <img src="https://images.unsplash.com/photo-1637665728218-9d7ed64ae6c6" alt="Contact Us" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="animate-fadeInUp">Contact Us</h1>
            <p className="animate-fadeInUp delay-1">Get in touch with our interior design experts</p>
          </div>
        </div>
      </section>

      <section className="contact-section modern-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info animate-fadeInLeft">
              <h2>Get In Touch</h2>
              <p>Ready to transform your space? Contact our team of experts today.</p>
              
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Email</h4>
                    <p>info@gharinto.com</p>
                    <p>support@gharinto.com</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Phone</h4>
                    <p>+91-9876543210</p>
                    <p>+91-9876543211</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Office</h4>
                    <p>123 Design Street</p>
                    <p>Mumbai, Maharashtra 400001</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Hours</h4>
                    <p>Monday - Saturday: 9AM - 7PM</p>
                    <p>Sunday: 10AM - 5PM</p>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <a href="#" className="social-link">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
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
              
              <div className="form-row">
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
                  <label>Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="consultation">Free Consultation</option>
                    <option value="project">New Project</option>
                    <option value="support">Support</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
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
              
              <button type="submit" className="submit-btn gradient-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <i className="fas fa-paper-plane"></i>
                  </>
                )}
                <div className="btn-glow"></div>
              </button>
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
      <div className="login-modal animate-slideInUp" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <div className="logo-icon">🏠</div>
            <div>
              <h3>Welcome to Gharinto</h3>
              <p>Sign in to your account</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          
          {error && <div className="error animate-shake">{error}</div>}
          
          <button type="submit" className="login-submit gradient-btn" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <i className="fas fa-sign-in-alt"></i>
              </>
            )}
            <div className="btn-glow"></div>
          </button>
        </form>

        <div className="demo-accounts">
          <h4>Try Demo Accounts:</h4>
          <div className="demo-grid">
            <button onClick={() => quickLogin('admin')} className="demo-card">
              <div className="demo-icon">
                <i className="fas fa-user-shield"></i>
              </div>
              <div className="demo-info">
                <h5>Admin Dashboard</h5>
                <p>Full system control</p>
              </div>
            </button>
            <button onClick={() => quickLogin('pm')} className="demo-card">
              <div className="demo-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <div className="demo-info">
                <h5>Project Manager</h5>
                <p>Project oversight</p>
              </div>
            </button>
            <button onClick={() => quickLogin('customer')} className="demo-card">
              <div className="demo-icon">
                <i className="fas fa-home"></i>
              </div>
              <div className="demo-info">
                <h5>Customer Portal</h5>
                <p>Track your project</p>
              </div>
            </button>
            <button onClick={() => quickLogin('designer')} className="demo-card">
              <div className="demo-icon">
                <i className="fas fa-paint-brush"></i>
              </div>
              <div className="demo-info">
                <h5>Designer Portal</h5>
                <p>Manage designs</p>
              </div>
            </button>
            <button onClick={() => quickLogin('procurement')} className="demo-card">
              <div className="demo-icon">
                <i className="fas fa-boxes"></i>
              </div>
              <div className="demo-info">
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

// Main App Component
function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Gharinto...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  // Return appropriate dashboard based on user role
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

// Dashboard Components (Placeholder for now - will be enhanced in next file)
function AdminDashboard() {
  const { user, logout } = useAuth();
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>
      <div className="dashboard-content">
        <p>Admin Dashboard - Coming Soon with Enhanced Features</p>
      </div>
    </div>
  );
}

function PMDashboard() {
  const { user, logout } = useAuth();
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Project Manager Dashboard</h2>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>
      <div className="dashboard-content">
        <p>PM Dashboard - Coming Soon with Enhanced Features</p>
      </div>
    </div>
  );
}

function CustomerPortal() {
  const { user, logout } = useAuth();
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Customer Portal</h2>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>
      <div className="dashboard-content">
        <p>Customer Portal - Coming Soon with Enhanced Features</p>
      </div>
    </div>
  );
}

function DesignerPortal() {
  const { user, logout } = useAuth();
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Designer Portal</h2>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>
      <div className="dashboard-content">
        <p>Designer Portal - Coming Soon with Enhanced Features</p>
      </div>
    </div>
  );
}

function ProcurementPortal() {
  const { user, logout } = useAuth();
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Procurement Portal</h2>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>
      <div className="dashboard-content">
        <p>Procurement Portal - Coming Soon with Enhanced Features</p>
      </div>
    </div>
  );
}

// Wrap App with AuthProvider
function AppRoot() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppRoot;