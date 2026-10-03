"use client";

import { App, ConfigProvider } from "antd";
import type { ConfigProviderProps } from "antd";
import type { ReactNode } from "react";
import { defaultTheme } from "../theme";

export type UIProviderProps = Omit<ConfigProviderProps, "children"> & {
  children: ReactNode;
};

export function UIProvider({ children, theme, ...config }: UIProviderProps) {
  return (
    <ConfigProvider
      {...config}
      theme={{
        ...defaultTheme,
        ...theme,
        token: { ...defaultTheme.token, ...theme?.token },
      }}
    >
      <App style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {children}
      </App>
    </ConfigProvider>
  );
}

// Call inside a component beneath UIProvider to access themed feedback APIs.
export const useUI = App.useApp;
