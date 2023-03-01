import { waitFor } from "@testing-library/react";
import Index from "pages/index";
import { render } from "utils/test-utils";

describe("Index", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(<Index />, {
        router: {
          pathname: `/`,
        },
      });
    });
  });
});
