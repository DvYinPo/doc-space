import React, { forwardRef, CSSProperties } from "react";

type SizeKeyword = "small" | "medium" | "large";
export interface LoadingProps {
  size?: SizeKeyword | number; // 关键字或像素值
  color?: string;
  thickness?: number; // 边框厚度（像素）
  speed?: number; // 一次旋转所需秒数
  className?: string;
  style?: CSSProperties;
  overlay?: boolean; // 是否在遮罩层中显示
  fullscreen?: boolean; // 遮罩是否覆盖整个屏幕（仅当 overlay 为 true 时有效）
  label?: string; // 可见文本标签（可选）
  ariaLabel?: string; // aria-label 覆盖
  children?: React.ReactNode;
}

let __rl_css_injected = false;

const css = `
.rl-loading {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: inherit;
}
.rl-spinner {
  box-sizing: border-box;
  border-radius: 50%;
  border-style: solid;
  border-color: rgba(0,0,0,0.08);
  border-top-color: currentColor;
  animation-name: rl-rotate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  flex: 0 0 auto;
}
@keyframes rl-rotate {
  to { transform: rotate(360deg); }
}
.rl-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.6);
  z-index: 999;
}
.rl-overlay.fullscreen {
  position: fixed;
}
.rl-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0 0 0 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
`;

export const Loading = forwardRef<HTMLDivElement, LoadingProps>((props, ref) => {
  const {
    size = "medium",
    color = "currentColor",
    thickness = 3,
    speed = 0.9,
    className,
    style,
    overlay = false,
    fullscreen = true,
    label,
    ariaLabel,
    children,
    ...rest
  } = props;

  if (typeof document !== "undefined" && !__rl_css_injected) {
    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-rl-loading", "true");
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
    __rl_css_injected = true;
  }

  const sizePx = typeof size === "number" ? size : size === "small" ? 14 : size === "large" ? 36 : 22; // medium default

  const spinnerStyle: CSSProperties = {
    width: sizePx,
    height: sizePx,
    borderWidth: thickness,
    color,
    animationDuration: `${speed}s`,
  };

  const container = (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel ?? label ?? "Loading"}
      className={["rl-loading", className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      <div className="rl-spinner" style={spinnerStyle} aria-hidden="true" />
      {label ? <span>{label}</span> : null}
      {children}
    </div>
  );

  if (!overlay) return container;

  // overlay 包裹
  const overlayClass = ["rl-overlay", fullscreen ? "fullscreen" : null].filter(Boolean).join(" ");

  return (
    <div className={overlayClass} aria-hidden={false}>
      {container}
    </div>
  );
});

export default Loading;
