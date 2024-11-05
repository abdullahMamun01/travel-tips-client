"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import { Spinner } from "../ui/spinner";

interface InfiniteScrollProps {
  children: ReactNode;
  hasMore: boolean;
  fetchNext: () => void; // More accurate type
}

const InfiniteScroll = ({
  children,
  hasMore,
  fetchNext,
}: InfiniteScrollProps) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onIntersecting: IntersectionObserverCallback = (entries) => {
      const loaderItem = entries[0];
      if (loaderItem.isIntersecting && hasMore) {
        fetchNext();
      }
    };

    const observer = new IntersectionObserver(onIntersecting);

    if (hasMore && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, fetchNext]);

  return (
    <>
      {children}
      {hasMore && (
        <div className="text-primary " ref={loaderRef}>
          <Spinner size="large" />
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
