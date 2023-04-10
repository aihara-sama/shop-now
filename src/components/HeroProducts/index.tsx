import { Box } from "@mui/material";
import { get, getDatabase, ref as refDB } from "firebase/database";
import { useEffect, useState } from "react";

const HeroProducts = () => {
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  useEffect(() => {
    get(refDB(getDatabase(), `hero-images`)).then((snapshot) => {
      const images = snapshot.val();
      setImageUrl1(images[1] || process.env.DEFAULT_PRODUCT_IMAGE_URL);
      setImageUrl2(images[2] || process.env.DEFAULT_PRODUCT_IMAGE_URL);
      setImageUrl3(images[3] || process.env.DEFAULT_PRODUCT_IMAGE_URL);
    });
  }, []);
  return (
    <Box display="flex" gap={2}>
      <Box
        sx={{
          backgroundImage: `url(${imageUrl1})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "400px",
          width: "100%",
          backgroundPosition: "center",
        }}
      />
      <Box display="flex" flexDirection="column" gap={2} width="100%">
        <Box
          sx={{
            backgroundImage: `url(${imageUrl2})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            backgroundPosition: "center",
            height: "192px",
          }}
        />
        <Box
          sx={{
            backgroundImage: `url(${imageUrl3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "192px",
          }}
        />
      </Box>
    </Box>
  );
};

export default HeroProducts;
