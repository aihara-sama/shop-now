import {
  Box,
  Button,
  Container,
  Link as MuiLink,
  TextField,
} from "@mui/material";
import AdminGuard from "components/auth/AdminGuard";
import { Logo } from "components/common/Logo";
import AddIcon from "components/icons/Add";
import LogOutIcon from "components/icons/LogOut";
import NewProductModal from "components/modals/NewProductModal";
import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import type { FC, PropsWithChildren } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { menuList } from "./sidebar-menu";

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const { route } = useRouter();
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  const logOut = async () => {
    try {
      await signOut(getAuth());
      Router.push("/admin/login");
    } catch (error: unknown) {
      toast.error("Something went wrong");
    }
  };

  return (
    <AdminGuard>
      <Box component="main" height="100%">
        <Container
          component="section"
          sx={{ height: "100%", display: "flex", gap: 3, pt: 8 }}
        >
          <Box flexBasis={200}>
            <Logo />
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              mt={5}
              height="calc(100% - 84px)"
              pb={8}
            >
              {menuList.map(({ Icon, href, title }, idx) => (
                <MuiLink
                  key={idx}
                  href={href}
                  component={Link}
                  underline="none"
                  color="text.secondary"
                  display="flex"
                  gap={1}
                  alignItems="center"
                  p={1}
                  sx={{
                    ":hover": {
                      bgcolor: "secondary.light",
                    },
                    borderRadius: 2,
                  }}
                  {...(route === href && {
                    bgcolor: "secondary.light",
                    borderRadius: 2,
                    fontWeight: 500,
                  })}
                >
                  <Icon />

                  {title}
                </MuiLink>
              ))}

              <Box
                onClick={() => logOut()}
                sx={{
                  ":hover": {
                    bgcolor: "secondary.light",
                  },
                  borderRadius: 2,
                  cursor: "pointer",
                }}
                mt="auto"
                display="flex"
                gap={1}
                alignItems="center"
                p={1}
              >
                <LogOutIcon />
                Log Out
              </Box>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap={3} flex={1}>
            <Box display="flex" gap={2} alignItems="center">
              <TextField fullWidth size="small" label="Search" />
              <Button
                onClick={() => setIsNewProductModalOpen(true)}
                sx={{ whiteSpace: "nowrap", py: 0.9, px: 2.4 }}
                endIcon={<AddIcon />}
              >
                New product
              </Button>
              <NewProductModal
                open={isNewProductModalOpen}
                handleClose={() => setIsNewProductModalOpen(false)}
              />
            </Box>
            {children}
          </Box>
        </Container>
      </Box>
    </AdminGuard>
  );
};

export default AdminLayout;
