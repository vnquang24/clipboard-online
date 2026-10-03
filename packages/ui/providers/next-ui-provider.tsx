"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { UIProvider } from "./ui-provider";
import type { UIProviderProps } from "./ui-provider";

export function NextUIProvider(props: UIProviderProps) {
  return (
    <AntdRegistry>
      <UIProvider {...props} />
    </AntdRegistry>
  );
}
