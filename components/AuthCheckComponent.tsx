import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

interface Props {
    fallback?: any;
    children: any;
}

const AuthCheck = (props: Props) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <main>
                <h1>Loading</h1>
            </main>
        );
    }
    return user
        ? props.children
        : props.fallback || (
              <Grid container justifyContent={"center"} alignContent={"center"} minHeight={"80vh"}>
                  <Grid item>
                      <Link href="/auth" passHref>
                          <Button variant="contained">Login</Button>
                      </Link>
                  </Grid>
              </Grid>
          );
};

export default AuthCheck;
