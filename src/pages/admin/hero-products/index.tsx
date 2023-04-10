import { Box, Grid, Typography } from "@mui/material";
import AddIcon from "components/icons/Add";
import AdminLayout from "components/layouts/AdminLayout";
import { get, getDatabase, ref as refDB, set } from "firebase/database";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";

const HeroProducts = () => {
  const imageRef1 = useRef<HTMLInputElement>();
  const imageRef2 = useRef<HTMLInputElement>();
  const imageRef3 = useRef<HTMLInputElement>();

  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");

  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    setImageUrl: Dispatch<SetStateAction<string>>,
    order: number
  ) => {
    const file = e.target.files[0];
    if (file) {
      if (!/^image\/(png|jpe?g)$/.test(file.type)) {
        toast.error("Please provide only PNG or JPG/JPEG files");
      } else if (file.size >= 5242880 /* more then 5 MB */) {
        toast.error("Maximum file size is 5 MB");
      } else {
        const id = uuid();
        const storage = getStorage();
        const storageRef = ref(storage, id);
        uploadBytes(storageRef, file).then(() => {
          getDownloadURL(storageRef).then((url) => {
            setImageUrl(url);
            set(refDB(getDatabase(), `hero-images/${order}`), url);
          });
        });
      }
    }
  };

  useEffect(() => {
    get(refDB(getDatabase(), `hero-images`)).then((r) => {
      const imageUrls = r.val() || {};
      if (imageUrls[1]) setImageUrl1(imageUrls[1]);
      if (imageUrls[2]) setImageUrl2(imageUrls[2]);
      if (imageUrls[3]) setImageUrl3(imageUrls[3]);
    });
  }, []);

  return (
    <AdminLayout>
      <Typography variant="h3">Hero Products</Typography>

      <Box pb={3} sx={{ overflow: "auto", height: "calc(100% - 185px)" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              onClick={() => imageRef1.current.click()}
              borderRadius={3}
              sx={{ cursor: "pointer" }}
              bgcolor="secondary.light"
              display="flex"
              justifyContent="center"
              alignItems="center"
              {...(!imageUrl1 ? { p: 10.5 } : { height: "250px" })}
            >
              {!imageUrl1 && <AddIcon size="large" />}
              {imageUrl1 && (
                <Box
                  sx={{
                    backgroundImage: `url(${imageUrl1})`,
                    height: "100%",
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: 3,
                  }}
                />
              )}
              <Box
                component="input"
                id="file"
                type="file"
                ref={imageRef1}
                sx={{ display: "none" }}
                onChange={(e) => onChange(e, setImageUrl1, 1)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              onClick={() => imageRef2.current.click()}
              borderRadius={3}
              sx={{ cursor: "pointer" }}
              bgcolor="secondary.light"
              {...(!imageUrl2 ? { p: 10.5 } : { height: "250px" })}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <AddIcon size="large" />
              {imageUrl2 && (
                <Box
                  sx={{
                    backgroundImage: `url(${imageUrl2})`,
                    height: "100%",
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: 3,
                  }}
                />
              )}
              <Box
                component="input"
                id="file"
                type="file"
                ref={imageRef2}
                sx={{ display: "none" }}
                onChange={(e) => onChange(e, setImageUrl2, 2)}
              />
            </Box>
          </Grid>
        </Grid>
        <Box
          onClick={() => imageRef3.current.click()}
          borderRadius={3}
          mt={3}
          mx="auto"
          width={{ xs: "100%", md: 500 }}
          sx={{ cursor: "pointer" }}
          bgcolor="secondary.light"
          {...(!imageUrl3 ? { p: 10.5 } : { height: "250px" })}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {!imageUrl3 && <AddIcon size="large" />}
          {imageUrl3 && (
            <Box
              sx={{
                backgroundImage: `url(${imageUrl3})`,
                height: "100%",
                width: "100%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                borderRadius: 3,
              }}
            />
          )}
          <Box
            component="input"
            id="file"
            type="file"
            ref={imageRef3}
            sx={{ display: "none" }}
            onChange={(e) => onChange(e, setImageUrl3, 3)}
          />
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default HeroProducts;
