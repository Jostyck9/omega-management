import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Router from "next/router";
import { useAuth } from "../context/AuthContext";
import { Avatar, Box } from "@mui/material";
import { styled } from "@mui/material";

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
    cursor: "pointer",
}));

const TopAppBar = () => {
    const { user, logout } = useAuth();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onLogin = () => {
        Router.push("/auth");
    };

    const onHome = () => {
        Router.push("/");
    };

    const onProfile = () => {
        handleCloseUserMenu();
    };

    const onAccounts = () => {
        handleCloseUserMenu();
        Router.push("/account");
    };

    const onDashboard = () => {
        handleCloseUserMenu();
    };

    const onLogout = () => {
        handleCloseUserMenu();
        logout();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Title onClick={onHome}>Omega-Management</Title>
                <Box sx={{ flexGrow: 1 }}></Box>
                {!user && (
                    <Button color="inherit" onClick={onLogin}>
                        Login
                    </Button>
                )}
                {user && (
                    <>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {!user && <AccountCircle />}
                                {user && <Avatar alt={user.displayName} src={user.photoURL} />}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key={"Profile"} onClick={onProfile}>
                                <Typography textAlign="center">{"Profile"}</Typography>
                            </MenuItem>

                            <MenuItem key={"Accounts"} onClick={onAccounts}>
                                <Typography textAlign="center">{"Accounts"}</Typography>
                            </MenuItem>

                            <MenuItem key={"Dashboard"} onClick={onDashboard}>
                                <Typography textAlign="center">{"Dashboard"}</Typography>
                            </MenuItem>

                            <MenuItem key={"Logout"} onClick={onLogout}>
                                <Typography textAlign="center">{"Logout"}</Typography>
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default TopAppBar;
