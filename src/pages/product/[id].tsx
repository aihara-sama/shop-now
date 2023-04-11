import { Box, Button, Typography } from "@mui/material";
import { Layout } from "components/layouts/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import StarIcon from "components/icons/Star";
import LeaveReviewProductModal from "components/modals/LeaveReviewProductModal";
import {
  equalTo,
  get,
  getDatabase,
  limitToFirst,
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref as refDB,
} from "firebase/database";
import pickBy from "lodash.pickby";
import type { IProduct, IReview } from "types/product";
import { capitalize } from "utils/capitalize";

const Product = () => {
  const router = useRouter();
  const [product, setProduct] = useState<IProduct>();
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState<IReview[]>([]);

  const handleLeaveReviewClick = () => {
    setIsReviewModalOpen(true);
  };

  useEffect(() => {
    const id = router.query.id as string;
    if (router.isReady) {
      setIsLoading(true);
      get(
        query(
          refDB(getDatabase(), "products"),
          orderByChild("id"),
          equalTo(id),
          limitToFirst(4)
        )
      )
        .then((snapshot) => setProduct((snapshot.val() || {})[id]))
        .finally(() => setIsLoading(false));
      onValue(
        query(
          refDB(getDatabase(), "reviews"),
          orderByChild("productId"),
          equalTo(id),
          limitToLast(5)
        ),
        (snapshot) => setReviews(Object.values(snapshot.val() || {}))
      );
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (!isLoading && !product) {
      router.replace("/");
    }
  }, [isLoading, product]);

  if (isLoading) return null;

  return (
    <Layout>
      <Box mt={3}>
        <Box display="flex" gap={2} alignItems="start">
          <Box
            p={5}
            position="relative"
            flexBasis={500}
            bgcolor="secondary.light"
          >
            <Box
              sx={{ maxWidth: "100%" }}
              component="img"
              src={product.image || process.env.DEFAULT_PRODUCT_IMAGE_URL}
              alt={`${product.name}`}
            />
          </Box>
          <Box flex={1}>
            <Box display="flex">
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ cursor: "pointer" }}
                onClick={handleLeaveReviewClick}
              >
                <Box
                  display="flex"
                  gap={0.5}
                  sx={{
                    " *": { fill: (theme) => theme.palette.text.secondary },
                  }}
                >
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </Box>
                <Typography variant="body2" color="text.secondary" mb="-2px">
                  Leave a review
                </Typography>
              </Box>
              <LeaveReviewProductModal
                productId={product.id}
                handleClose={() => setIsReviewModalOpen(false)}
                open={isReviewModalOpen}
              />
            </Box>
            <Box>
              <Typography my={2} variant="h3" color="text.secondary">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Button
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
                color="primary"
              >
                Buy
              </Button>
            </Box>
          </Box>
        </Box>
        <Box display="flex" mt={3} gap={2}>
          <Box flexBasis={500}>
            {!!reviews.length && (
              <Box>
                <Typography variant="h3" color="text.secondary">
                  Reviews
                </Typography>
                <Box mt={2}>
                  {reviews.map((review, idx) => (
                    <Box key={idx} mb={3}>
                      <Box display="flex" gap={1} mb={2}>
                        {new Array(5).fill(0).map((_, i) => (
                          <StarIcon
                            key={i}
                            size="large"
                            filled={i + 1 <= review.starsCount}
                          />
                        ))}
                      </Box>
                      <Typography color="text.secondary">
                        {review.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          <Box flex={1}>
            {Object.entries(
              pickBy(
                product,
                (_, key) =>
                  ![
                    "id",
                    "image",
                    "category",
                    "price",
                    "name",
                    "description",
                  ].includes(key)
              )
            ).map(([key, value], idx) => (
              <Box
                key={idx}
                display="flex"
                justifyContent="space-between"
                p={1}
                {...(idx % 2 !== 0 && { bgcolor: "secondary.light" })}
              >
                <Typography color="text.secondary">
                  {capitalize(key)}
                </Typography>
                <Typography color="text.secondary">{value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Product;
