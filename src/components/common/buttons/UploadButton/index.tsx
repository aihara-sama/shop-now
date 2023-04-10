import { Box, Button, CircularProgress } from "@mui/material";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import type { ChangeEvent, FunctionComponent } from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";

interface IProps {
  onUpload: (url: string) => void;
  handleIsUploading: (isUploading: boolean) => void;
  defaultImageUrl?: string;
}

const UploadButton: FunctionComponent<IProps> = ({
  onUpload,
  handleIsUploading,
  defaultImageUrl = "",
}) => {
  const fileRef = useRef<HTMLInputElement>();
  const [imageUrl, setImageUrl] = useState<string>(defaultImageUrl);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    onUpload(imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    handleIsUploading(isUploading);
  }, [isUploading]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      if (!/^image\/(png|jpe?g)$/.test(file.type)) {
        toast.error("Please provide only PNG or JPG/JPEG files");
      } else if (file.size >= 5242880 /* more then 5 MB */) {
        toast.error("Maximum file size is 5 MB");
      } else {
        const storage = getStorage();
        const storageRef = ref(storage, uuid());
        setIsUploading(true);
        uploadBytes(storageRef, file).then(() => {
          getDownloadURL(storageRef).then((url) => {
            setImageUrl(url);
            setIsUploading(false);
          });
        });
      }
    }
  };

  return (
    <Box>
      <Button
        color={imageUrl ? "error" : "info"}
        fullWidth
        sx={{ mb: 1, cursor: "pointer" }}
        onClick={() => (imageUrl ? setImageUrl("") : fileRef.current.click())}
      >
        {isUploading && <CircularProgress size="24.5px" />}
        {!isUploading && `${imageUrl ? "Remove" : "Upload"} image`}
      </Button>
      <Box
        component="input"
        id="file"
        type="file"
        ref={fileRef}
        sx={{ display: "none" }}
        onChange={onChange}
      />
    </Box>
  );
};

export default UploadButton;
