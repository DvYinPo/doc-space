import { useEffect, useLayoutEffect, useRef, useState, useCallback, RefObject } from "react";

type OverflowState = {
  horizontal: boolean;
  vertical: boolean;
  any: boolean;
};

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function (
  ref: RefObject<HTMLElement | null>,
  options?: {
    observe?: boolean; // 是否启用 MutationObserver/ResizeObserver 监听（默认 true）
    checkOnMount?: boolean; // 是否在挂载时立即检查（默认 true）
  },
): OverflowState {
  const { observe = true, checkOnMount = true } = options || {};
  const [overflow, setOverflow] = useState<OverflowState>({
    horizontal: false,
    vertical: false,
    any: false,
  });

  // 用于 rAF 去抖
  const rafRef = useRef<number | null>(null);

  const measure = useCallback(() => {
    const el = ref.current;

    if (!el) {
      setOverflow({ horizontal: false, vertical: false, any: false });
      return;
    }

    // 使用 scrollWidth/scrollHeight vs clientWidth/clientHeight 来判断溢出
    const horizontal = el.scrollWidth > el.clientWidth;
    const vertical = el.scrollHeight > el.clientHeight;
    const any = horizontal || vertical;

    setOverflow((prev) => {
      if (prev.horizontal === horizontal && prev.vertical === vertical && prev.any === any) {
        return prev;
      }
      return { horizontal, vertical, any };
    });
  }, [ref]);

  // 包一层 rAF，防止频繁触发导致多次测量
  const scheduleMeasure = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      measure();
    });
  }, [measure]);

  useIsomorphicLayoutEffect(() => {
    if (checkOnMount) {
      // 立即测量一次
      scheduleMeasure();
    }

    const el = ref.current;
    if (!observe || !el || typeof window === "undefined") {
      return () => {
        if (rafRef.current != null) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }

    let ro: ResizeObserver | null = null;
    let mo: MutationObserver | null = null;

    // ResizeObserver（大多数现代浏览器支持）
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        scheduleMeasure();
      });
      try {
        ro.observe(el);
      } catch (e) {
        // 某些浏览器/情形下可能失败，忽略
      }
    }

    // MutationObserver 监听子节点或文本变化
    if (typeof MutationObserver !== "undefined") {
      mo = new MutationObserver(() => {
        scheduleMeasure();
      });
      try {
        mo.observe(el, { childList: true, subtree: true, characterData: true, attributes: true });
      } catch (e) {
        // 忽略
      }
    }

    // 窗口变化也可能导致溢出状态改变
    const onWindowResize = () => scheduleMeasure();
    window.addEventListener("resize", onWindowResize);

    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (ro) {
        try {
          ro.disconnect();
        } catch (_) {}
        ro = null;
      }
      if (mo) {
        try {
          mo.disconnect();
        } catch (_) {}
        mo = null;
      }
      window.removeEventListener("resize", onWindowResize);
    };
  }, [ref, observe, checkOnMount, scheduleMeasure, useIsomorphicLayoutEffect]);

  // 清理 rAF 在卸载时（再保一层）
  useEffect(() => {
    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [rafRef.current]);

  return overflow;
}
