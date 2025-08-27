import { useCallback, useEffect, useRef, useState } from "react";

interface Issue {
  id: number;
  author: string;
  author_url: string;
  author_avatar_url: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
} // 你可以根据需要替换为更具体的类型

const owner = "DvYinPo";
const repo = "doc-space";
const label = "github-page-notes";

type UseIssuesOptions = {
  token?: string; // 可选，若访问私有仓库或提高速率限制可以传入 GitHub token, 需要先解码base64
  perPage?: number;
  enabled?: boolean; // 是否启用自动请求
  initialPage?: number;
};

export function useIssuesByLabel({ token, perPage = 30, enabled = true, initialPage = 1 }: UseIssuesOptions) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const abortRef = useRef<AbortController | null>(null);
  const lastRequestKeyRef = useRef<string | null>(null);

  const buildUrl = (p: number) => {
    const base = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues`;
    const params = new URLSearchParams({
      state: "open",
      labels: label,
      per_page: String(perPage),
      page: String(p),
    });
    return `${base}?${params.toString()}`;
  };

  const parseHasNextFromLink = (linkHeader: string | null) => {
    if (!linkHeader) return false;
    // Link header example: <https://api.github.com/...&page=2>; rel="next", <...&page=4>; rel="last"
    // 判断是否存在 rel="next"
    return /rel="next"/.test(linkHeader);
  };

  const fetchPage = useCallback(
    async (p: number, append = false) => {
      if (!enabled) return;
      // 避 redundant same requests: use a key based on owner/repo/label/page
      const requestKey = `${owner}|${repo}|${label}|${p}|${perPage}`;
      // abort previous
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const ac = new AbortController();
      abortRef.current = ac;
      lastRequestKeyRef.current = requestKey;

      setLoading(true);
      setError(null);

      try {
        const url = buildUrl(p);
        const headers: Record<string, string> = {
          Accept: "application/vnd.github.v3+json",
        };
        if (token) headers.Authorization = `token ${window.atob(token)}`;

        const res = await fetch(url, { headers, signal: ac.signal });
        if (!res.ok) {
          // fetch succeeded but status not ok
          const text = await res.text().catch(() => "");
          throw new Error(`GitHub API error: ${res.status} ${res.statusText} ${text}`);
        }

        const data = await res.json();
        // 如果此请求不是最新的（被后来的请求覆盖），就忽略返回结果
        if (lastRequestKeyRef.current !== requestKey) return;

        const formatData: Issue[] = data.map((item) => ({
          id: item.id,
          title: item.title,
          content: item.body,
          author: item.user.login,
          author_url: item.user.html_url,
          author_avatar_url: item.user.avatar_url,
          created_at: item.created_at,
          updated_at: item.updated_at,
        }));

        setIssues((prev) => (append ? [...prev, ...formatData] : formatData));
        const link = res.headers.get("Link");
        setHasMore(parseHasNextFromLink(link));
        setLoading(false);
      } catch (err: any) {
        if (err.name === "AbortError") {
          // 请求被取消：忽略错误并退出（不设置 error）
          return;
        }
        setError(err);
        setLoading(false);
      } finally {
        // 清理 controller if it's the same
        if (abortRef.current === ac) {
          abortRef.current = null;
        }
      }
    },
    [owner, repo, label, perPage, token, enabled],
  );

  // 当 owner/repo/label/perPage/initialPage 变化时，重置并拉取第一页
  useEffect(() => {
    setPage(initialPage);
    // reset issues when key changes
    setIssues([]);
    setHasMore(false);
    if (enabled) {
      fetchPage(initialPage, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner, repo, label, perPage, initialPage, enabled]); // fetchPage 在依赖中，但我们要避免无限循环，fetchPage 已依赖 necessary props

  const loadMore = useCallback(() => {
    if (loading) return;
    const next = page + 1;
    setPage(next);
    fetchPage(next, true);
  }, [fetchPage, page, loading]);

  const refetch = useCallback(() => {
    setPage(initialPage);
    fetchPage(initialPage, false);
  }, [fetchPage, initialPage]);

  const reset = useCallback(() => {
    // 取消任何进行中的请求 并重置本地状态
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    lastRequestKeyRef.current = null;
    setIssues([]);
    setPage(initialPage);
    setLoading(false);
    setError(null);
    setHasMore(false);
  }, [initialPage]);

  // 在卸载时取消请求
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  return {
    issues,
    loading,
    error,
    hasMore,
    page,
    loadMore,
    refetch,
    reset,
  };
}
