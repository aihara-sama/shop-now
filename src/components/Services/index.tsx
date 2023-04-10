import { Box, Grid, Typography } from "@mui/material";
import { services } from "./services";

const Services = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        {services.map((service, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
            <Box
              display="flex"
              gap={1}
              alignItems="center"
              justifyContent="center"
            >
              <service.Icon />
              <Box display="flex" flexDirection="column">
                <Typography variant="button">{service.title}</Typography>
                <Typography variant="caption">{service.body}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
