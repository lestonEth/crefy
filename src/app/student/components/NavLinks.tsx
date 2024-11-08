import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import DashboardIcon from '@mui/icons-material/Dashboard'; 
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; 
import RedeemIcon from '@mui/icons-material/Redeem';
import DocumentScanner from '@mui/icons-material/DocumentScanner';
import dcnLogo from '../../assets/dcnlogo.png';
import { useAppContext } from '../../context/AppProvider';
import Colors from '../../utils/Colors';
import Notification from '@mui/icons-material/Notifications';
import { Explore, ExploreOffOutlined, ExploreOutlined, PlusOne, PlusOneOutlined } from '@mui/icons-material';

// Define the nav links array for user roles
const navLinks = [
    { label: 'Dashboard', path: '/account/student/dashboard', icon: <DashboardIcon sx={{ marginRight: '10px' }} /> },
    { label: 'Docs', path: '/account/student/docs', icon: <DocumentScanner sx={{ marginRight: '10px' }} /> },
    { label: 'Reports', path: '/account/student/reports', icon: <BarChartIcon sx={{ marginRight: '10px' }} /> },
    
];

const walletLinks = [
    { label: 'Wallet Accounts', path: '/account/student/wallets', icon: <DashboardIcon sx={{ marginRight: '10px' }} /> },
    { label: 'NFT Market', path: '/account/student/nft-market', icon: <BarChartIcon sx={{ marginRight: '10px' }} /> },
    { label: 'Claim NFTs', path: '/account/student/claim-nfts', icon: <RedeemIcon sx={{ marginRight: '10px' }} /> },
    
];

const settingsLinks = [
    { label: 'Setting', path: '/account/student/setting', icon: <SettingsIcon sx={{ marginRight: '10px' }} /> },
    // { label: 'Notifications', path: '/account/student/notification', icon: <Notification sx={{ marginRight: '10px' }} /> },
    { label: 'Logout', path: '/account/student/logout', icon: <LogoutIcon sx={{ marginRight: '10px' }} />}
];

// Admin-specific links
const adminOverViewLinks = [
    { label: 'Dashboard', path: '/account/institution/dashboard', icon: <DashboardIcon sx={{ marginRight: '10px' }} /> },
    { label: 'Manage Staff', path: '/account/institution/manage-staff', icon: <ExploreOutlined sx={{ marginRight: '10px' }} /> },
    // { label: 'Reports', path: '/account/institution/reports', icon: <BarChartIcon sx={{ marginRight: '10px' }} /> },
];

const adminWalletLinks = [
    { label: 'Wallet Accounts', path: '/account/institution/wallets', icon: <DashboardIcon sx={{ marginRight: '10px' }} /> },
    // { label: 'NFT Market', path: '/account/institution/nft-market', icon: <BarChartIcon sx={{ marginRight: '10px' }} /> },
    { label: 'Collection', path: '/account/institution/collection', icon: <RedeemIcon sx={{ marginRight: '10px' }} /> },
    { label: 'Create', path: '/account/institution/create-nft', icon: <PlusOneOutlined sx={{ marginRight: '10px' }} /> },
];

// Component for Navigation Links
const NavLinks = ({ isCollapsed }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const { role, connectedWallet, } = useAppContext();  // Get user role from context

    return (
        <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            {/* Title at the top */}
            <Link to='/'>
                <Box sx={{paddingLeft: 1, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 2}}>
                    <img src={dcnLogo} alt="DCN Logo" style={{ width: '50px', height: '50px' }} />
                    {!isCollapsed && <Typography variant="h5" sx={{ color: Colors.primary, fontWeight: 'bold' }}>DCN</Typography> }
                </Box>
            </Link>

            {/* Overview Links */}
            {!isCollapsed && <Typography variant="h6" sx={{ color: Colors.primary, paddingLeft: 2, marginTop: 2 }}>OVERVIEW</Typography>}
            <List>
                {role === 'student' && navLinks.map((link) => (
                    <ListItem 
                        key={link.label} 
                        button 
                        component={Link} 
                        to={link.path}
                        sx={{
                            color: isActive(link.path) ? '#007bff' : '#6c757d',
                            fontWeight: 'bold',
                            backgroundColor: isActive(link.path) ? Colors.white : 'transparent',
                            borderLeft: isActive(link.path) ? `5px solid #007bff` : 'none',
                            borderRadius: '0px 10px 10px 0px',
                            '&:hover': {
                                backgroundColor: Colors.primary + '33',
                            },
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: isCollapsed ? 3 : 0,
                        }}
                    >
                        {React.cloneElement(link.icon, { fontSize: isCollapsed ? 'large' : 'medium', sx: { marginRight: isCollapsed ? 0 : '10px' } })}
                        {!isCollapsed && <ListItemText primary={link.label} />}
                    </ListItem>
                ))}

                {role === 'institution' && adminOverViewLinks.map((link) => (
                    <ListItem 
                        key={link.label} 
                        button 
                        component={Link} 
                        to={link.path}
                        sx={{
                            color: isActive(link.path) ? '#007bff' : '#6c757d',
                            fontWeight: 'bold',
                            backgroundColor: isActive(link.path) ? Colors.white : 'transparent',
                            borderLeft: isActive(link.path) ? `5px solid #007bff` : 'none',
                            borderRadius: '0px 10px 10px 0px',
                            '&:hover': {
                                backgroundColor: Colors.primary + '33',
                            },
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: isCollapsed ? 3 : 0,
                        }}
                    >
                        {React.cloneElement(link.icon, { fontSize: isCollapsed ? 'large' : 'medium', sx: { marginRight: isCollapsed ? 0 : '10px' } })}
                        {!isCollapsed && <ListItemText primary={link.label} />}
                    </ListItem>
                ))}
            </List>

            {/* Wallet Links */}
            {!isCollapsed && <Typography variant="h6" sx={{ color: Colors.primary, paddingLeft: 2, marginTop: 2 }}>WALLET</Typography>}
            <List>
                {role === 'student' && walletLinks.map((link) => (
                    <ListItem
                        component={Link} 
                        to={link.path}
                        sx={{
                            color: isActive(link.path) ? '#007bff' : '#6c757d',
                            fontWeight: 'bold',
                            backgroundColor: isActive(link.path) ? Colors.white : 'transparent',
                            borderLeft: isActive(link.path) ? `5px solid #007bff` : 'none',
                            borderRadius: '0px 10px 10px 0px',
                            '&:hover': {
                                backgroundColor: Colors.primary + '33',
                            },
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: isCollapsed ? 3 : 0,
                        }}
                    >
                        {React.cloneElement(link.icon, { fontSize: isCollapsed ? 'large' : 'medium', sx: { marginRight: isCollapsed ? 0 : '10px' } })}
                        {!isCollapsed && <ListItemText primary={link.label} />}
                    </ListItem>
                ))}
                {role === 'institution' && adminWalletLinks.map((link) => (
                    <ListItem 
                        key={link.label} 
                        button 
                        component={Link} 
                        to={link.path}
                        sx={{
                            color: isActive(link.path) ? '#007bff' : '#6c757d',
                            fontWeight: 'bold',
                            backgroundColor: isActive(link.path) ? Colors.white : 'transparent',
                            borderLeft: isActive(link.path) ? `5px solid #007bff` : 'none',
                            borderRadius: '0px 10px 10px 0px',
                            '&:hover': {
                                backgroundColor: Colors.primary + '33',
                            },
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: isCollapsed ? 3 : 0,
                        }}
                    >
                        {React.cloneElement(link.icon, { fontSize: isCollapsed ? 'large' : 'medium', sx: { marginRight: isCollapsed ? 0 : '10px' } })}
                        {!isCollapsed && <ListItemText primary={link.label} />}
                    </ListItem>
                ))}
            </List>

            {/* Settings Links */}
            {!isCollapsed && <Typography variant="h6" sx={{ color: Colors.primary, paddingLeft: 2, marginTop: 2 }}>SETTINGS</Typography>}
            <List>
                {settingsLinks.map((link) => (
                    <ListItem 
                        key={link.label} 
                        button 
                        component={Link} 
                        to={link.path}
                        sx={{
                            color: isActive(link.path) ? '#007bff' : '#6c757d',
                            fontWeight: 'bold',
                            backgroundColor: isActive(link.path) ? Colors.white : 'transparent',
                            borderLeft: isActive(link.path) ? `5px solid #007bff` : 'none',
                            borderRadius: '0px 10px 10px 0px',
                            '&:hover': {
                                backgroundColor: Colors.primary + '33',
                            },
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: isCollapsed ? 3 : 0,
                        }}
                    >
                        {React.cloneElement(link.icon, { fontSize: isCollapsed ? 'large' : 'medium', sx: { marginRight: isCollapsed ? 0 : '10px' } })}
                        {!isCollapsed && <ListItemText primary={link.label} />}
                    </ListItem>
                ))}
            </List>

            {/* Current User Section */}
            <Box sx={{ marginTop: 'auto', paddingTop: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
                {/* User Icon and Name */}
                <AccountCircleIcon sx={{ color: Colors.primary, fontSize: 52, marginRight: 1 }} />
                <Box sx={{ marginBottom: '10px', overflowX: 'scroll', maxWidth: 200 }}>
                    {!isCollapsed && 
                    <>
                        <Typography variant="body1" sx={{ color: Colors.primary, fontWeight: 'bold' }}>USERNAME</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#666' }}>ID: <span style={{ color: Colors.primary }}>
                            {connectedWallet ? connectedWallet : 'wallet not connected'}    
                            </span></Typography>
                            <IconButton sx={{ padding: 0 }}>
                                <ContentCopyIcon sx={{ fontSize: 14, marginLeft: '10px', color: Colors.primary }} />
                            </IconButton>
                        </Box>
                    </>
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default NavLinks;
