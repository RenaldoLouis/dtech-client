import React from "react";

export interface MenuClickHandlerProps {
  key: string;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}
