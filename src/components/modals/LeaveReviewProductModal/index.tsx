import CloseIcon from "@mui/icons-material/Close";
import { Button, CircularProgress, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import StarIcon from "components/icons/Star";
import { getDatabase, ref, set } from "firebase/database";
import type { FunctionComponent } from "react";
import { useState } from "react";
import type { IReview } from "types/product";

interface IProps {
  open: boolean;
  handleClose: () => void;
  productId: string;
}

const LeaveReviewProductModal: FunctionComponent<IProps> = ({
  open,
  handleClose,
  productId,
}) => {
  const [reviewText, setReviewText] = useState("");
  const [starsCount, setStarsCount] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isHoveringStars, setIsHoveringStars] = useState(false);
  const [isSendingReview, setIsSendingReview] = useState(false);

  const onClose = () => {
    handleClose();
  };

  const sendReview = async () => {
    const db = getDatabase();
    const id = uuid();
    try {
      setIsSendingReview(true);
      await set(ref(db, `reviews/${id}`), {
        productId,
        text: reviewText,
        id,
        starsCount,
      } as IReview);
      toast.success("Successfully posted a review");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSendingReview(false);
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            color="text.secondary"
            id="modal-modal-title"
            variant="h3"
            ml="auto"
          >
            Leave a Review
          </Typography>
          <CloseIcon
            sx={{
              ml: "auto",
              cursor: "pointer",
              borderRadius: 1,
              ":hover": { bgcolor: "secondary.light" },
              transition: "0.1s",
            }}
            onClick={() => onClose()}
          />
        </Box>
        <Box>
          <Box display="flex">
            <Box
              onMouseLeave={() => {
                if (!starsCount) setHoveredStar(0);
                setIsHoveringStars(false);
              }}
              my={2}
              display="flex"
              onMouseEnter={() => setIsHoveringStars(true)}
            >
              {new Array(5).fill(0).map((_, idx) => (
                <Box
                  onClick={() => setStarsCount(idx + 1)}
                  p={0.6}
                  sx={{ cursor: "pointer" }}
                  key={idx}
                  onMouseEnter={() => setHoveredStar(idx + 1)}
                >
                  <StarIcon
                    size="large"
                    filled={
                      (isHoveringStars ? hoveredStar : starsCount) >= idx + 1
                    }
                  />
                </Box>
              ))}
            </Box>
          </Box>
          <TextField
            onChange={(e) => setReviewText(e.target.value)}
            rows={5}
            multiline
            fullWidth
            size="small"
            label="Product description"
          />
          <Button
            onClick={() => reviewText.length && starsCount && sendReview()}
            disabled={!(reviewText.length && starsCount)}
            fullWidth
            sx={{ mt: 2 }}
          >
            {isSendingReview && (
              <CircularProgress color="inherit" size="24.5px" />
            )}
            {!isSendingReview && "Send"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LeaveReviewProductModal;
