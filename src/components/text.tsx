import { css, cx } from "@linaria/core";
import React from "react";

import { type } from "@/styles/core";

const overline = css`
  ${type.overline}
`;

const caption = css`
  ${type.caption}
`;

const captionItalic = css`
  ${type.captionItalic}
`;

const headline3 = css`
  ${type.headline3}
`;

export default function Text({
  style,
  as: Tag = "div",
  children,
  className,
}: {
  style?: keyof typeof type;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Tag
      className={cx(
        className,
        style === "overline" && overline,
        style === "caption" && caption,
        style === "captionItalic" && captionItalic,
        style === "headline3" && headline3,
      )}
    >
      {children}{" "}
    </Tag>
  );
}