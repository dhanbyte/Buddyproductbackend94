import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBox, FiShoppingBag, FiUsers, FiSettings, FiTag } from 'react-icons/fi';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  useTheme,
  useMediaQuery,
  Avatar,
  Container
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = React.useState(false);
    
    const drawerWidth = 240;
    
    const navItems = [
        { path: '/admin', icon: FiHome, label: 'Dashboard' },
        { path: '/admin/products', icon: FiBox, label: 'Products' },
        { path: '/admin/orders', icon: FiShoppingBag, label: 'Orders' },
        { path: '/admin/users', icon: FiUsers, label: 'Users' },
        { path: '/admin/coupons', icon: FiTag, label: 'Coupons' },
        { path: '/admin/settings', icon: FiSettings, label: 'Settings' },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>A</Avatar>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        Admin Panel
                    </Typography>
                </Box>
                
                <Divider />
                
                <List sx={{ flexGrow: 1, py: 2 }}>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <ListItem key={item.path} disablePadding>
                                <ListItemButton 
                                    component={Link} 
                                    to={item.path}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 1,
                                        mx: 1,
                                        mb: 0.5,
                                        bgcolor: isActive ? 'primary.light' : 'transparent',
                                        color: isActive ? 'primary.main' : 'text.primary',
                                        '&:hover': {
                                            bgcolor: isActive ? 'primary.light' : 'action.hover',
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ 
                                        color: isActive ? 'primary.main' : 'inherit',
                                        minWidth: 40
                                    }}>
                                        <item.icon size={20} />
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
                
                <Divider />
                
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Typography variant="body2" color="text.secondary">
                        © 2023 Bazaar Buddy
                    </Typography>
                </Box>
            </Box>
        </>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            
            {/* App Bar */}
            <AppBar 
                position="fixed" 
                sx={{ 
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    display: { xs: 'block', md: 'none' }
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Admin Panel
                    </Typography>
                </Toolbar>
            </AppBar>
            
            {/* Sidebar for mobile */}
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                {/* Mobile drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                
                {/* Desktop drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            
            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    mt: { xs: 7, md: 0 }
                }}
            >
                <Container maxWidth="lg" sx={{ py: 2 }}>
                    {children}
                </Container>
            </Box>
        </Box>
    );
};

export default AdminLayout;
