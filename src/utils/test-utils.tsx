import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { Toaster } from "components/common/Toaster";
import { ThemeProvider } from "contexts/theme";
import { RouterContext } from "next/dist/shared/lib/router-context";
import type { NextRouter } from "next/router";
import type { FunctionComponent, ReactElement } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import type { Store } from "store/index";
import { store } from "store/index";
import type { UrlObject } from "url";

declare global {
  interface Window {
    store: Store;
  }
}

interface IMockAppProps {
  children: JSX.Element;
  router?: Partial<NextRouter>;
}

export const createMockRouter = (
  router: Partial<NextRouter>
): Partial<NextRouter> => {
  return {
    query: {},
    isFallback: false,
    back: () => {},
    beforePopState: () => {},
    basePath: "",
    pathname: "/",
    asPath: "/",
    route: "/",
    prefetch: () => Promise.resolve(),
    push: (url: string | UrlObject) =>
      new Promise(() => {
        if (typeof url === "string") {
          window.history.pushState({}, "", url);
        } else {
          window.history.pushState({}, "", url.pathname);
        }
      }),
    reload: () => {},
    replace: (url: string | UrlObject) =>
      new Promise(() => {
        if (typeof url === "string") {
          window.history.replaceState({}, "", url);
        } else {
          window.history.replaceState({}, "", url.pathname);
        }
      }),
    events: {
      on: () => {},
      off: () => {},
      emit: () => {},
    },
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,

    ...router,
  };
};

const AllTheProviders: FunctionComponent<IMockAppProps> = ({ children }) => {
  window.store = store;
  const persistor = persistStore(store, {}, () => {
    persistor.persist();
  });

  return (
    <RouterContext.Provider value={createMockRouter({}) as NextRouter}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {() => (
            <ThemeProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                <Toaster />
                {children}
              </LocalizationProvider>
            </ThemeProvider>
          )}
        </PersistGate>
      </Provider>
    </RouterContext.Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { router: Partial<NextRouter> }
) => {
  const { router, ...renderOptions } = options || {};
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders router={router}>{children}</AllTheProviders>
    ),
    ...renderOptions,
  });
};

export * from "@testing-library/react";
export { customRender as render };
